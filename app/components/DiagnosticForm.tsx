"use client";

import { useState, type FormEvent } from "react";
import type { DiagnosticOutput } from "@/lib/domain/model/diagnostic";

// ── Types internes ────────────────────────────────────────────────────────────

type BoolStr = "" | "true" | "false";

type FormData = {
  date_realisation: string;
  terre_resistance_ohm: string;
  type_prise_terre: string;
  diff_general_present: BoolStr;
  diff_general_mA: string;
  nombre_diff_30mA: string;
  sdb_presente: BoolStr;
  sdb_protegee_30mA: BoolStr;
  sdb_equipotentielle_ok: BoolStr;
  max_prises_par_circuit: string;
  section_min_detectee_mm2: string;
  disjoncteur_max_detecte_A: string;
  borne_ve_presente: BoolStr;
  type_diff_borne: string;
  symptomes: string[];
};

// ── Valeurs standard (snap-to) ────────────────────────────────────────────────

/** Sections normalisées de câbles en mm² (NF C 15-100 / RGIE) */
const CABLE_SECTIONS = [0.75, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];

/** Calibres standard de disjoncteurs en ampères */
const BREAKER_AMPS = [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63];

/** Sensibilités standard de différentiels en mA */
const DIFF_MA = [30, 100, 300, 500];

// ── Constantes formulaire ─────────────────────────────────────────────────────

const today = new Date().toISOString().split("T")[0];

const INITIAL: FormData = {
  date_realisation: today,
  terre_resistance_ohm: "",
  type_prise_terre: "",
  diff_general_present: "",
  diff_general_mA: "",
  nombre_diff_30mA: "",
  sdb_presente: "",
  sdb_protegee_30mA: "",
  sdb_equipotentielle_ok: "",
  max_prises_par_circuit: "",
  section_min_detectee_mm2: "",
  disjoncteur_max_detecte_A: "",
  borne_ve_presente: "",
  type_diff_borne: "",
  symptomes: [],
};

const SYMPTOMES = [
  { id: "diff_declenche", label: "Différentiel déclenche fréquemment" },
  { id: "diff_declenche_nuit", label: "Déclenchement nocturne" },
  { id: "diff_declenche_sdb", label: "Diff. déclenche en SDB" },
  { id: "odeur_brule", label: "Odeur de brûlé au tableau" },
  { id: "odeur_brule_circuit", label: "Odeur de brûlé sur un circuit" },
  { id: "odeur_brule_sdb", label: "Odeur de brûlé en SDB" },
  { id: "choc_electrique", label: "Choc électrique ressenti" },
  { id: "choc_sdb", label: "Choc électrique en SDB" },
  { id: "disjoncteur_saute", label: "Disjoncteur qui saute souvent" },
  { id: "prise_chaude", label: "Prise chaude au toucher" },
  { id: "erreur_borne_ve", label: "Erreur / défaut borne VE" },
  { id: "diff_declenche_borne_ve", label: "Diff. déclenche à la charge VE" },
];

// ── Helpers de conversion ─────────────────────────────────────────────────────

function parseBool(s: BoolStr): boolean | undefined {
  return s === "true" ? true : s === "false" ? false : undefined;
}
function parseNum(s: string): number | undefined {
  const n = Number(s);
  return s === "" || isNaN(n) ? undefined : n;
}
function toInput(f: FormData) {
  return {
    date_realisation: f.date_realisation,
    terre_resistance_ohm: parseNum(f.terre_resistance_ohm),
    type_prise_terre:
      (f.type_prise_terre as "BOUCLE_FOUILLE" | "PIQUETS" | "INCONNU") ||
      undefined,
    diff_general_present: parseBool(f.diff_general_present),
    diff_general_mA: parseNum(f.diff_general_mA),
    nombre_diff_30mA: parseNum(f.nombre_diff_30mA),
    sdb_presente: parseBool(f.sdb_presente),
    sdb_protegee_30mA: parseBool(f.sdb_protegee_30mA),
    sdb_equipotentielle_ok: parseBool(f.sdb_equipotentielle_ok),
    max_prises_par_circuit: parseNum(f.max_prises_par_circuit),
    section_min_detectee_mm2: parseNum(f.section_min_detectee_mm2),
    disjoncteur_max_detecte_A: parseNum(f.disjoncteur_max_detecte_A),
    borne_ve_presente: parseBool(f.borne_ve_presente),
    type_diff_borne:
      (f.type_diff_borne as "A" | "B" | "AC" | "INCONNU") || undefined,
    symptomes: f.symptomes.length ? f.symptomes : undefined,
  };
}

// ── Classes communes ──────────────────────────────────────────────────────────

const SELECT =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 " +
  "shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 " +
  "dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-100 dark:focus:border-blue-400";

const LABEL =
  "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

const BTN_STEP =
  "flex w-10 shrink-0 items-center justify-center text-xl font-light select-none transition-colors " +
  "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:bg-slate-200 " +
  "dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100";

// ── Composant NumberStepper ───────────────────────────────────────────────────

type StepperProps = {
  value: string;
  onChange: (v: string) => void;
  /** Pas pour les champs continus (résistance, comptages) */
  step?: number;
  /** Valeurs normalisées à parcourir (câble, disjoncteur, diff mA) */
  values?: readonly number[];
  min?: number;
  max?: number;
  unit?: string;
  placeholder?: string;
};

/**
 * Champ numérique avec boutons − / + remplaçant les flèches natives du navigateur.
 *
 * • Si `values` est fourni → parcourt les valeurs normalisées (ex : sections câble)
 * • Sinon               → incrémente/décrémente par `step` (ex : résistance Ω)
 */
function NumberStepper({
  value,
  onChange,
  step = 1,
  values,
  min = 0,
  max,
  unit,
  placeholder,
}: StepperProps) {
  const num = value === "" ? null : Number(value);

  function increment() {
    if (values) {
      // Snap vers la valeur suivante dans la liste
      if (num === null) return onChange(String(values[0]));
      const next = values.find((v) => v > num);
      if (next !== undefined) onChange(String(next));
      // Si déjà au max de la liste : ne rien faire
    } else {
      const current = num ?? min - step;
      const next =
        max !== undefined ? Math.min(current + step, max) : current + step;
      onChange(String(Math.round(next * 100) / 100));
    }
  }

  function decrement() {
    if (values) {
      // Snap vers la valeur précédente, ou vide si on est déjà au minimum
      if (num === null) return;
      const prev = [...values].reverse().find((v) => v < num);
      onChange(prev !== undefined ? String(prev) : "");
    } else {
      if (num === null) return;
      const prev = Math.max(num - step, min);
      // Si on était déjà à min, on vide le champ (= non renseigné)
      onChange(num === min ? "" : String(Math.round(prev * 100) / 100));
    }
  }

  const dividerCls = "border-slate-300 dark:border-slate-600";

  return (
    <div
      className={`flex overflow-hidden rounded-lg border shadow-sm ${dividerCls}`}
    >
      {/* Bouton − */}
      <button
        type="button"
        onClick={decrement}
        aria-label="Diminuer"
        className={`${BTN_STEP} border-r ${dividerCls}`}
      >
        −
      </button>

      {/* Zone valeur */}
      <div className="flex flex-1 items-center bg-white dark:bg-slate-700/60">
        <input
          type="number"
          className="
            w-full bg-transparent py-2 pl-3 text-sm text-slate-900 dark:text-slate-100
            text-center tabular-nums focus:outline-none
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "—"}
          min={min}
          step={values ? "any" : step}
          {...(max !== undefined ? { max } : {})}
        />
        {unit && (
          <span className="shrink-0 pr-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
            {unit}
          </span>
        )}
      </div>

      {/* Bouton + */}
      <button
        type="button"
        onClick={increment}
        aria-label="Augmenter"
        className={`${BTN_STEP} border-l ${dividerCls}`}
      >
        +
      </button>
    </div>
  );
}

// ── Badges niveaux / risque ───────────────────────────────────────────────────

const LEVEL_CLS = {
  BLOQUANT:
    "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800",
  MAJEUR:
    "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800",
  AVERTISSEMENT:
    "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800",
};
const RISK_CLS: Record<string, string> = {
  FAIBLE:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  MOYEN:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  ELEVÉ:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  CRITIQUE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

function LevelBadge({ level }: { level: keyof typeof LEVEL_CLS }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${LEVEL_CLS[level]}`}
    >
      {level}
    </span>
  );
}

// ── SVG icons inline (pas de dépendance externe) ──────────────────────────────

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d={d} />
    </svg>
  );
}

const Icons = {
  calendar: () => (
    <Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
  ),
  ground: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v14" />
      <path d="M5 16h14" />
      <path d="M8 20h8" />
      <path d="M11 22h2" />
    </svg>
  ),
  diff: () => <Icon d="M12 22V2M2 12h20M17 7l-5-5-5 5M7 17l5 5 5-5" />,
  shower: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16M4 12a8 8 0 0 1 8-8M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
      <circle cx="12" cy="5" r="1" fill="currentColor" />
    </svg>
  ),
  circuit: () => (
    <Icon d="M18 20V10M12 20V4M6 20v-6M2 10l4-4 4 4 4-4 4 4M2 14h20" />
  ),
  car: () => (
    <Icon d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v6a2 2 0 0 1-2 2h-2M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
  ),
  alert: () => (
    <Icon d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
  ),
  check: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  xcircle: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  ),
};

// ── Composants de mise en forme ───────────────────────────────────────────────

function Field({
  label,
  span2,
  children,
}: {
  label: string;
  span2?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={span2 ? "sm:col-span-2" : undefined}>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

function BoolSelect({
  value,
  onChange,
}: {
  value: BoolStr;
  onChange: (v: BoolStr) => void;
}) {
  return (
    <select
      title="Sélectionnez Oui, Non, ou laissez vide si non renseigné"
      className={SELECT}
      value={value}
      onChange={(e) => onChange(e.target.value as BoolStr)}
    >
      <option value="">— Non renseigné</option>
      <option value="true">Oui</option>
      <option value="false">Non</option>
    </select>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/60 px-5 py-3.5 dark:border-slate-700 dark:bg-slate-800/80">
        <span className="text-blue-600 dark:text-blue-400">{icon}</span>
        <h2 className="text-xs font-semibold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-green-500"
      : score >= 60
        ? "bg-yellow-500"
        : score >= 40
          ? "bg-orange-500"
          : "bg-red-500";
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-600 dark:text-slate-400">
          Score conformité
        </span>
        <span className="font-bold tabular-nums text-slate-900 dark:text-slate-100">
          {score} / 100
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function ResultSection({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          {count}
        </span>
      </div>
      {children}
    </div>
  );
}

// ── Formulaire principal ──────────────────────────────────────────────────────

export function DiagnosticForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [result, setResult] = useState<DiagnosticOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }
  function toggleSymptome(id: string) {
    setForm((prev) => ({
      ...prev,
      symptomes: prev.symptomes.includes(id)
        ? prev.symptomes.filter((s) => s !== id)
        : [...prev.symptomes, id],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/rgie/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toInput(form)),
      });
      const data: unknown = await res.json();
      if (!res.ok)
        throw new Error((data as { error?: string }).error ?? "Erreur serveur");
      setResult(data as DiagnosticOutput);
      setTimeout(
        () =>
          document
            .getElementById("rgie-results")
            ?.scrollIntoView({ behavior: "smooth" }),
        80,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* ── 1 : Date ── */}
        <Section icon={<Icons.calendar />} title="Informations générales">
          <Field label="Date de réalisation *" span2>
            <input
              type="date"
              required
              title="Date à laquelle le diagnostic est réalisé (format ISO : YYYY-MM-DD)"
              className={SELECT}
              value={form.date_realisation}
              onChange={(e) => set("date_realisation", e.target.value)}
            />
          </Field>
        </Section>

        {/* ── 2 : Terre ── */}
        <Section icon={<Icons.ground />} title="Mise à la terre">
          <Field label="Résistance de terre">
            {/* Pas de 1 Ω — valeur typique 0–200 Ω */}
            <NumberStepper
              value={form.terre_resistance_ohm}
              onChange={(v) => set("terre_resistance_ohm", v)}
              step={1}
              min={0}
              unit="Ω"
              placeholder="—"
            />
          </Field>
          <Field label="Type de prise de terre">
            <select
              title="Type de prise de terre installée (ex : boucle en fond de fouille, piquet(s) de terre, etc.)"
              className={SELECT}
              value={form.type_prise_terre}
              onChange={(e) => set("type_prise_terre", e.target.value)}
            >
              <option value="">— Non renseigné</option>
              <option value="BOUCLE_FOUILLE">Boucle en fond de fouille</option>
              <option value="PIQUETS">Piquet(s) de terre</option>
              <option value="INCONNU">Inconnu</option>
            </select>
          </Field>
        </Section>

        {/* ── 3 : Différentiels ── */}
        <Section icon={<Icons.diff />} title="Protection différentielle">
          <Field label="Différentiel général présent ?">
            <BoolSelect
              value={form.diff_general_present}
              onChange={(v) => set("diff_general_present", v)}
            />
          </Field>
          <Field label="Calibre diff. général">
            {/* Valeurs normalisées : 30 / 100 / 300 / 500 mA */}
            <NumberStepper
              value={form.diff_general_mA}
              onChange={(v) => set("diff_general_mA", v)}
              values={DIFF_MA}
              unit="mA"
              placeholder="—"
            />
          </Field>
          <Field label="Nombre de diff. 30 mA">
            {/* Comptage entier 0–15 */}
            <NumberStepper
              value={form.nombre_diff_30mA}
              onChange={(v) => set("nombre_diff_30mA", v)}
              step={1}
              min={0}
              max={15}
              placeholder="—"
            />
          </Field>
        </Section>

        {/* ── 4 : SDB ── */}
        <Section icon={<Icons.shower />} title="Salle de bains">
          <Field label="Salle de bains présente ?">
            <BoolSelect
              value={form.sdb_presente}
              onChange={(v) => set("sdb_presente", v)}
            />
          </Field>
          <Field label="SDB protégée par diff. 30 mA ?">
            <BoolSelect
              value={form.sdb_protegee_30mA}
              onChange={(v) => set("sdb_protegee_30mA", v)}
            />
          </Field>
          <Field label="Équipotentialité SDB conforme ?">
            <BoolSelect
              value={form.sdb_equipotentielle_ok}
              onChange={(v) => set("sdb_equipotentielle_ok", v)}
            />
          </Field>
        </Section>

        {/* ── 5 : Circuits ── */}
        <Section icon={<Icons.circuit />} title="Circuits & câblage">
          <Field label="Nb max de prises par circuit">
            {/* Comptage entier 0–30 */}
            <NumberStepper
              value={form.max_prises_par_circuit}
              onChange={(v) => set("max_prises_par_circuit", v)}
              step={1}
              min={0}
              max={30}
              placeholder="—"
            />
          </Field>
          <Field label="Section câble minimale">
            {/* Sections normalisées : 1.5 / 2.5 / 4 / 6 / 10 / 16 / 25 / 35 / 50 mm² */}
            <NumberStepper
              value={form.section_min_detectee_mm2}
              onChange={(v) => set("section_min_detectee_mm2", v)}
              values={CABLE_SECTIONS}
              unit="mm²"
              placeholder="—"
            />
          </Field>
          <Field label="Calibre disjoncteur max">
            {/* Calibres normalisés : 6 / 10 / 16 / 20 / 25 / 32 / 40 / 50 / 63 A */}
            <NumberStepper
              value={form.disjoncteur_max_detecte_A}
              onChange={(v) => set("disjoncteur_max_detecte_A", v)}
              values={BREAKER_AMPS}
              unit="A"
              placeholder="—"
            />
          </Field>
        </Section>

        {/* ── 6 : VE ── */}
        <Section icon={<Icons.car />} title="Borne de recharge VE">
          <Field label="Borne VE présente ?">
            <BoolSelect
              value={form.borne_ve_presente}
              onChange={(v) => set("borne_ve_presente", v)}
            />
          </Field>
          <Field label="Type de différentiel borne VE">
            <select
              title="Type de différentiel installé pour la protection de la borne de recharge VE (ex : Type A, Type B, etc.)"
              className={SELECT}
              value={form.type_diff_borne}
              onChange={(e) => set("type_diff_borne", e.target.value)}
            >
              <option value="">— Non renseigné</option>
              <option value="A">Type A</option>
              <option value="B">Type B</option>
              <option value="AC">Type AC</option>
              <option value="INCONNU">Inconnu</option>
            </select>
          </Field>
        </Section>

        {/* ── 7 : Symptômes ── */}
        <Section icon={<Icons.alert />} title="Symptômes observés">
          <div className="col-span-full grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SYMPTOMES.map((s) => (
              <label
                key={s.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 transition-colors
                  hover:bg-slate-50 dark:hover:bg-slate-700/40"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600
                    focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700"
                  checked={form.symptomes.includes(s.id)}
                  onChange={() => toggleSymptome(s.id)}
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {s.label}
                </span>
              </label>
            ))}
          </div>
        </Section>

        {/* ── Bouton soumettre ── */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-md
            hover:bg-blue-700 active:bg-blue-800 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-60
            dark:focus:ring-offset-slate-900"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <SpinnerIcon /> Analyse RGIE en cours…
            </span>
          ) : (
            "⚡ Lancer le diagnostic RGIE"
          )}
        </button>

        {error && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700
            dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
          >
            {error}
          </div>
        )}
      </form>

      {result && <DiagnosticResults data={result} />}
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────

function SpinnerIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

type RephraseState = Record<string, string>;

// ── Résultats ─────────────────────────────────────────────────────────────────

function DiagnosticResults({ data }: { data: DiagnosticOutput }) {
  const ok = data.resultat_global === "CONFORME";
  const [rephrased, setRephrased] = useState<RephraseState>({});
  const [rephraseErrors, setRephraseErrors] = useState<RephraseState>({});
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  async function rephraseText(key: string, text: string, context: string) {
    if (!text.trim()) return;
    setLoadingKey(key);
    setRephraseErrors((prev) => ({ ...prev, [key]: "" }));

    try {
      const res = await fetch("/api/rgie/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, context }),
      });

      const payload: unknown = await res.json();
      if (!res.ok) {
        const message =
          typeof payload === "object" &&
          payload !== null &&
          "error" in payload &&
          typeof (payload as { error?: unknown }).error === "string"
            ? (payload as { error: string }).error
            : "Impossible de reformuler ce texte pour l'instant.";
        throw new Error(message);
      }

      const reformulation =
        typeof payload === "object" &&
        payload !== null &&
        "rephrased" in payload &&
        typeof (payload as { rephrased?: unknown }).rephrased === "string"
          ? (payload as { rephrased: string }).rephrased
          : "";

      if (!reformulation) {
        throw new Error("Aucune reformulation générée.");
      }

      setRephrased((prev) => ({ ...prev, [key]: reformulation }));
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Erreur inattendue pendant la reformulation.";
      setRephraseErrors((prev) => ({ ...prev, [key]: message }));
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <div id="rgie-results" className="space-y-4 pt-2">
      {/* Bandeau résumé */}
      <div
        className={`overflow-hidden rounded-xl border shadow-sm
        ${
          ok
            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
            : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
        }`}
      >
        <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-slate-700">
          <div className="flex flex-col items-center justify-center gap-2 p-5">
            <span className={ok ? "text-green-500" : "text-red-500"}>
              {ok ? <Icons.check /> : <Icons.xcircle />}
            </span>
            <span
              className={`text-lg font-bold ${ok ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}
            >
              {data.resultat_global}
            </span>
          </div>
          <div className="flex flex-col justify-center p-5">
            <ScoreBar score={data.score_conformite} />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 p-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Niveau de risque
            </span>
            <span
              className={`rounded-full px-4 py-1.5 text-sm font-bold ${RISK_CLS[data.risque] ?? "bg-slate-100 text-slate-700"}`}
            >
              {data.risque}
            </span>
          </div>
        </div>
      </div>

      {/* Non-conformités */}
      {data.non_conformites.length > 0 && (
        <ResultSection
          title="Non-conformités détectées"
          count={data.non_conformites.length}
        >
          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {data.non_conformites.map((nc) => (
              <li key={nc.code} className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <LevelBadge level={nc.niveau} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 font-mono text-[11px] font-bold text-slate-400 dark:text-slate-500">
                      {nc.code}
                    </p>
                    <p className="text-sm text-slate-800 dark:text-slate-200">
                      {nc.message}
                    </p>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          rephraseText(
                            `nc-${nc.code}`,
                            nc.message,
                            "non-conformite",
                          )
                        }
                        disabled={loadingKey === `nc-${nc.code}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        {loadingKey === `nc-${nc.code}` ? (
                          <SpinnerIcon />
                        ) : null}
                        Reformuler avec IA
                      </button>
                    </div>
                    {rephrased[`nc-${nc.code}`] && (
                      <p className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
                        {rephrased[`nc-${nc.code}`]}
                      </p>
                    )}
                    {rephraseErrors[`nc-${nc.code}`] && (
                      <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                        {rephraseErrors[`nc-${nc.code}`]}
                      </p>
                    )}
                    {nc.correction && (
                      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          Correction :{" "}
                        </span>
                        {nc.correction}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ResultSection>
      )}

      {/* Causes probables */}
      {data.top_causes_probables.length > 0 && (
        <ResultSection
          title="Causes probables identifiées"
          count={data.top_causes_probables.length}
        >
          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {data.top_causes_probables.map((c) => (
              <li key={c.hypothese_id} className="px-5 py-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-500">
                      {c.hypothese_id}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {c.resume}
                    </p>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          rephraseText(
                            `cause-${c.hypothese_id}`,
                            c.resume,
                            "cause-probable",
                          )
                        }
                        disabled={loadingKey === `cause-${c.hypothese_id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        {loadingKey === `cause-${c.hypothese_id}` ? (
                          <SpinnerIcon />
                        ) : null}
                        Reformuler avec IA
                      </button>
                    </div>
                    {rephrased[`cause-${c.hypothese_id}`] && (
                      <p className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
                        {rephrased[`cause-${c.hypothese_id}`]}
                      </p>
                    )}
                    {rephraseErrors[`cause-${c.hypothese_id}`] && (
                      <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                        {rephraseErrors[`cause-${c.hypothese_id}`]}
                      </p>
                    )}
                  </div>
                  <span
                    className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700
                    dark:bg-blue-900/40 dark:text-blue-300 tabular-nums"
                  >
                    {Math.round(c.probabilite * 100)} %
                  </span>
                </div>
                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-1.5 rounded-full bg-blue-500 transition-all duration-700"
                    style={{ width: `${Math.round(c.probabilite * 100)}%` }}
                  />
                </div>
                {c.actions_immediates.length > 0 && (
                  <ul className="space-y-1.5">
                    {c.actions_immediates.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400"
                      >
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full
                          bg-orange-100 text-[10px] font-bold text-orange-600 dark:bg-orange-900/40 dark:text-orange-400"
                        >
                          {i + 1}
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </ResultSection>
      )}

      {/* Questions pour approfondir */}
      {data.questions_suivantes.length > 0 && (
        <ResultSection
          title="Questions pour approfondir"
          count={data.questions_suivantes.length}
        >
          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
            {data.questions_suivantes.map((q) => (
              <div
                key={q.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3.5
                  dark:border-slate-700 dark:bg-slate-700/40"
              >
                <p className="mb-1 font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500">
                  {q.id}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {q.texte}
                </p>
                {q.choix && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {q.choix.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700
                          dark:bg-blue-900/40 dark:text-blue-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ResultSection>
      )}

      {/* Plan de correction */}
      {data.plan_correction.length > 0 && (
        <ResultSection
          title="Plan de correction"
          count={data.plan_correction.length}
        >
          <ul className="divide-y divide-slate-100 p-5 dark:divide-slate-700">
            {data.plan_correction.map((a) => (
              <li
                key={a.priorite}
                className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold
                  ${
                    a.origine === "RGIE"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                  }`}
                >
                  {a.priorite}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-800 dark:text-slate-200">
                    {a.action}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider
                      ${a.origine === "RGIE" ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"}`}
                    >
                      {a.origine}
                    </span>
                    {a.refs?.map((r) => (
                      <span
                        key={r}
                        className="font-mono text-[10px] text-slate-400 dark:text-slate-500"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ResultSection>
      )}
    </div>
  );
}
