# Moteur Diagnostic RGIE

> Vérification de conformité électrique — RGIE 2020 / 2023 / 2025
> Next.js 16 · App Router · TypeScript strict · Tailwind CSS v4
> Architecture DDD Hexagonale · Stateless · Vercel-ready

---

## Présentation

Application de **diagnostic électrique intelligent** basée sur le Règlement Général sur les Installations Électriques (RGIE) belge.

Le moteur évalue les règles réglementaires versionnées selon la date de réalisation de l'installation, identifie les non-conformités, calcule un score de conformité, active des hypothèses de diagnostic probabiliste et génère un plan de correction priorisé.

---

## Démarrage rapide

```bash
pnpm install
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

L'API est disponible à `POST http://localhost:3000/api/rgie/diagnostic`.

---

## Architecture

Le projet suit un pattern **DDD léger + Hexagonal (Ports & Adapters)**. Le domaine métier ne dépend ni de Next.js ni du système de fichiers.

```
/
├── app/
│   ├── api/rgie/diagnostic/route.ts   ← POST /api/rgie/diagnostic
│   ├── components/
│   │   ├── DiagnosticForm.tsx          ← Formulaire + résultats (client)
│   │   └── ThemeToggle.tsx             ← Bouton ☀️/🌙 (client)
│   ├── providers/
│   │   └── ThemeProvider.tsx           ← Contexte React dark/light
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── lib/
│   ├── domain/
│   │   ├── model/
│   │   │   ├── types.ts                ← DSL Expr (EQ, GT, AND, OR…)
│   │   │   ├── rgie.ts                 ← Regle, RuleSet
│   │   │   └── diagnostic.ts           ← DiagnosticInput/Output, Hypothese
│   │   └── services/
│   │       ├── ruleEvaluator.ts        ← Interpréteur DSL (sans eval)
│   │       ├── scoringPolicy.ts        ← Strategy : score 0–100
│   │       ├── riskPolicy.ts           ← Strategy : niveau de risque
│   │       └── diagnosisEngine.ts      ← Scoring probabiliste (sigmoid)
│   │
│   ├── application/
│   │   ├── ports.ts                    ← Interfaces hexagonales
│   │   └── diagnosticUseCase.ts        ← Orchestration pure
│   │
│   └── infrastructure/
│       ├── jsonRuleRepository.ts
│       ├── jsonHypothesisRepository.ts
│       ├── jsonQuestionRepository.ts
│       └── nextApiAdapter.ts           ← Factory (injection des dépendances)
│
└── resources/rgie/
    ├── ruleset_2020_2023_2025.json     ← 7 règles RGIE versionnées
    ├── hypotheses.json                 ← 4 hypothèses de diagnostic
    └── question_bank.json              ← 9 questions de suivi
```

---

## API — `POST /api/rgie/diagnostic`

### Requête

```json
{
  "date_realisation": "2025-06-01",
  "terre_resistance_ohm": 45,
  "diff_general_present": true,
  "diff_general_mA": 300,
  "nombre_diff_30mA": 2,
  "sdb_presente": true,
  "sdb_protegee_30mA": false,
  "sdb_equipotentielle_ok": false,
  "max_prises_par_circuit": 10,
  "section_min_detectee_mm2": 1.5,
  "disjoncteur_max_detecte_A": 20,
  "borne_ve_presente": false,
  "symptomes": ["diff_declenche", "odeur_brule"]
}
```

Tous les champs sauf `date_realisation` sont optionnels. Les champs absents ne déclenchent aucune règle.

### Réponse (200 OK)

```json
{
  "resultat_global": "NON_CONFORME",
  "score_conformite": 52,
  "risque": "ELEVÉ",
  "non_conformites": [
    {
      "code": "CABLE-001",
      "niveau": "BLOQUANT",
      "message": "Un câble de section 1,5 mm² est protégé par un disjoncteur > 16 A…",
      "correction": "Remplacer le disjoncteur par un 16 A max, ou recâbler en 2,5 mm²."
    }
  ],
  "top_causes_probables": [
    {
      "hypothese_id": "HYP-DIFF-001",
      "probabilite": 0.953,
      "resume": "Fuite à la terre probable",
      "actions_immediates": ["Isoler le circuit défaillant…"]
    }
  ],
  "questions_suivantes": [
    { "id": "Q_DIFF_01", "texte": "Le différentiel déclenche-t-il immédiatement ?", "type": "OUI_NON" }
  ],
  "plan_correction": [
    { "priorite": 1, "action": "Remplacer le disjoncteur…", "origine": "RGIE", "refs": ["CABLE-001"] }
  ]
}
```

### Erreur (400)

```json
{ "error": "date_realisation est obligatoire (format ISO : YYYY-MM-DD)" }
```

---

## Règles RGIE versionnées

| Code | Niveau | Applicable depuis | Condition |
|---|---|---|---|
| `DIFF-GENERAL-001` | BLOQUANT | toujours | Différentiel général absent |
| `CABLE-001` | BLOQUANT | toujours | Section ≤ 1,5 mm² + disjoncteur > 16 A |
| `SDB-030-2025` | BLOQUANT | 2025-03-01 | SDB présente sans diff. 30 mA dédié |
| `TERRE-001` | MAJEUR | toujours | Résistance de terre > 30 Ω |
| `SDB-EQUI-001` | MAJEUR | toujours | Équipotentialité SDB absente |
| `PRISES-2023` | MAJEUR | 2023-06-01 | Plus de 8 prises par circuit |
| `VE-001` | MAJEUR | toujours | Borne VE avec diff. type AC |

**Ajouter une règle** : éditer uniquement `resources/rgie/ruleset_2020_2023_2025.json`, aucun code à modifier.

---

## Diagnostic probabiliste

Les hypothèses sont scorées via la fonction sigmoïde :

```
P = sigmoid(Σ déclencheurs − seuil_activation)
```

Où les déclencheurs sont :
- **erreurs RGIE** détectées (poids défaut : 3)
- **symptômes** déclarés par l'utilisateur (poids défaut : 2)

Les hypothèses avec `P ≥ 0.35` sont retournées (top 3, triées par probabilité décroissante).

**Ajouter une hypothèse** : éditer uniquement `resources/rgie/hypotheses.json`.

---

## Politiques (Strategy pattern)

| Politique | Classe | Comportement |
|---|---|---|
| **Scoring** | `DefaultScoringPolicy` | `100 − (bloquants×20) − (majeurs×8) − (avertissements×2)`, clampé 0–100 |
| **Risque** | `DefaultRiskPolicy` | ≥2 bloquants → CRITIQUE · 1 bloquant → ELEVÉ · ≥2 majeurs → MOYEN · sinon → FAIBLE |

---

## DSL des conditions de règles

Les conditions sont des arbres d'expressions JSON, évaluées par un interpréteur pur (aucun `eval`).

**Opérateurs feuilles** : `EQ`, `NE`, `GT`, `GTE`, `LT`, `LTE`, `IN`, `NOT_IN`
**Opérateurs logiques** : `AND`, `OR`, `NOT`

```json
{
  "op": "AND",
  "exprs": [
    { "op": "LTE", "path": "section_min_detectee_mm2", "value": 1.5 },
    { "op": "GT",  "path": "disjoncteur_max_detecte_A", "value": 16 }
  ]
}
```

Un champ absent dans l'input → la règle n'est pas déclenchée (pas de crash).

---

## Mode jour/nuit

- Persisté dans `localStorage` (clé `rgie-theme`)
- Script inline dans `<head>` : aucun flash au rechargement (FOUC-free)
- Basé sur la classe `.dark` sur `<html>` — indépendant du `prefers-color-scheme` système

---

## Valeurs normalisées du formulaire

| Champ | Valeurs / Pas |
|---|---|
| Résistance de terre | Continu, pas 1 Ω |
| Calibre diff. général | 30 · 100 · 300 · 500 mA |
| Section câble | 0,75 · 1,5 · 2,5 · 4 · 6 · 10 · 16 · 25 · 35 · 50 mm² |
| Calibre disjoncteur | 2 · 4 · 6 · 10 · 16 · 20 · 25 · 32 · 40 · 50 · 63 A |
| Prises / circuit | Continu, pas 1 |
| Nombre diff. 30 mA | Continu, pas 1 |

---

## Déploiement Vercel

L'API est **stateless** (aucun état serveur, JSON importés statiquement). Déploiement direct sans configuration supplémentaire.

```bash
vercel deploy
```

---

## Évolution

| Objectif | Action |
|---|---|
| Nouvelle règle RGIE | Ajouter un objet dans `ruleset_2020_2023_2025.json` |
| Nouvelle hypothèse | Ajouter un objet dans `hypotheses.json` |
| Nouvelle question | Ajouter une entrée dans `question_bank.json` |
| Scoring différent | Implémenter `ScoringPolicy` et l'injecter dans `DiagnosticUseCase` |
| Source de données DB | Implémenter `RuleRepository` et remplacer dans `nextApiAdapter.ts` |
