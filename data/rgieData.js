/**
 * Base de données RGIE - Livre 1
 * Règlement Général sur les Installations Électriques (Belgique)
 *
 * Annexe 1 - Installations à basse tension et à très basse tension
 */

const baseRgieArticles = [
  // SECTION 4: Protection contre les chocs électriques
  {
    id: "4.2.2",
    titre: "Protection contre les chocs électriques par contact direct",
    categorie: "Protection",
    description:
      "Synthèse des prescriptions RGIE de la section 4.2.2 (contacts directs).",
    explication_profane:
      "On ne doit jamais pouvoir toucher une partie électrique sous tension. Les fils actifs doivent être isolés et enfermés derrière des protections adaptées.",
    contenu:
      "Selon la section 4.2.2, la protection contre les contacts directs est assurée par des mesures telles que l'isolation des parties actives, des enveloppes/barrières adaptées et des dispositions spécifiques selon le lieu d'installation.",
    mots_cles: [
      "contact direct",
      "section 4.2.2",
      "isolation",
      "barrière",
      "enveloppe",
    ],
    importance: "critique",
  },
  {
    id: "4.2.3",
    titre: "Protection contre les chocs électriques par contact indirect",
    categorie: "Protection",
    description: "Synthèse des sections 4.2.3 et 4.2.4 (contacts indirects).",
    explication_profane:
      "Si une carcasse métallique devient dangereuse à cause d'un défaut, l'installation doit couper vite le courant pour éviter l'électrocution.",
    contenu:
      "La protection contre les contacts indirects combine les mesures des sections 4.2.3 et 4.2.4: mise à la terre, conducteurs de protection, liaisons équipotentielles et coupure automatique, avec règles spécifiques en domestique et non-domestique.",
    mots_cles: [
      "contact indirect",
      "4.2.3",
      "4.2.4",
      "mise à la terre",
      "coupure automatique",
    ],
    importance: "critique",
  },
  {
    id: "4.2.1",
    titre:
      "Protection contre les chocs électriques - Généralités opérationnelles",
    categorie: "Protection",
    description:
      "Synthèse RGIE des mesures de protection contre les chocs électriques.",
    explication_profane:
      "La protection des personnes repose sur trois piliers: une bonne terre, des liaisons équipotentielles et des différentiels qui déclenchent en cas de fuite de courant.",
    contenu:
      "Selon les chapitres 4.2.1 à 4.2.4, la protection contre les contacts indirects repose sur la mise à la terre, les liaisons équipotentielles et la coupure automatique. En installation domestique (4.2.4.3), au moins un DDR est prévu à l'origine, complété par des DDR à haute ou très haute sensibilité pour les circuits visés.",
    mots_cles: [
      "protection chocs",
      "DDR",
      "mise à la terre",
      "liaison équipotentielle",
      "coupure automatique",
    ],
    importance: "critique",
  },
  {
    id: "4.3.1",
    titre: "Schémas de liaison à la terre - TT",
    categorie: "Mise à la terre",
    description: "Schéma TT (neutre à la terre, masses à la terre).",
    contenu:
      "Dans le schéma TT, le neutre de l'installation est relié directement à la terre et les masses sont reliées à une prise de terre distincte. Protection obligatoire par DDR.",
    mots_cles: ["TT", "schéma", "terre", "neutre", "masses"],
    importance: "élevée",
  },
  {
    id: "4.3.2",
    titre: "Schémas de liaison à la terre - TN",
    categorie: "Mise à la terre",
    description: "Schéma TN (neutre à la terre, masses au neutre).",
    contenu:
      "Dans le schéma TN, le neutre est relié à la terre et les masses sont reliées au conducteur de protection. Deux variantes: TN-C et TN-S.",
    mots_cles: ["TN", "TN-C", "TN-S", "schéma", "terre", "protection"],
    importance: "élevée",
  },

  // SECTION 5: Choix et mise en œuvre
  {
    id: "5.1.1",
    titre: "Calibre des dispositifs de protection",
    categorie: "Dimensionnement",
    description: "Choix du calibre des disjoncteurs et fusibles.",
    explication_profane:
      "Le disjoncteur doit correspondre au câble: trop grand, il ne protège pas; trop petit, il saute trop souvent. Le bon calibre évite incendie et coupures inutiles.",
    contenu:
      "Le courant assigné du dispositif de protection doit être: In ≥ Ib (courant d'emploi) et Iz ≥ 1,45 × In (capacité du câble). Le pouvoir de coupure doit être supérieur au courant de court-circuit présumé.",
    mots_cles: [
      "disjoncteur",
      "calibre",
      "dimensionnement",
      "protection",
      "courant",
    ],
    importance: "critique",
  },
  {
    id: "5.2.1",
    titre: "Section des conducteurs",
    categorie: "Dimensionnement",
    description: "Détermination de la section minimale des conducteurs.",
    contenu:
      "La section des conducteurs doit être déterminée en fonction: du courant d'emploi, du mode de pose, de la chute de tension admissible (max 3% pour éclairage, 5% pour force motrice).",
    mots_cles: [
      "section",
      "conducteur",
      "câble",
      "dimensionnement",
      "chute de tension",
    ],
    importance: "critique",
  },
  {
    id: "5.2.2",
    titre: "Chute de tension admissible",
    categorie: "Dimensionnement",
    description: "Limites de chute de tension dans les installations.",
    contenu:
      "La chute de tension entre l'origine de l'installation et tout point d'utilisation ne doit pas dépasser: 3% pour les circuits d'éclairage, 5% pour les autres usages.",
    mots_cles: ["chute de tension", "tension", "éclairage", "limite"],
    importance: "élevée",
  },
  {
    id: "5.4.3.2",
    titre: "Conducteur de protection (PE)",
    categorie: "Protection",
    description: "Dimensionnement du conducteur de protection.",
    explication_profane:
      "Le fil de terre doit être assez gros pour évacuer un défaut sans surchauffer. Un fil de terre sous-dimensionné met les personnes en danger.",
    contenu:
      "La section du conducteur de protection doit être: égale à celle des conducteurs actifs si S ≤ 16mm², 16mm² si S = 16 à 35mm², S/2 si S > 35mm² (minimum 16mm²).",
    mots_cles: ["PE", "protection", "terre", "section", "conducteur"],
    importance: "critique",
  },

  // SECTION 6: Vérifications
  {
    id: "6.4.5.1",
    titre: "Résistance d'isolement",
    categorie: "Vérification",
    description: "Mesures d'isolement selon la sous-section 6.4.5.1.",
    explication_profane:
      "Avant la mise en service, on vérifie que les câbles ne laissent pas fuir le courant. Un mauvais isolement peut provoquer déclenchements, chocs ou incendie.",
    contenu:
      "La sous-section 6.4.5.1 impose la mesure de la résistance d'isolement lors du contrôle de conformité avant mise en usage, selon les tensions d'essai et conditions définies par le tableau RGIE correspondant.",
    mots_cles: [
      "isolement",
      "6.4.5.1",
      "contrôle de conformité",
      "tension d'essai",
      "mesure",
    ],
    importance: "critique",
  },
  {
    id: "4.2.4.4",
    titre: "Protection des contacts indirects - Installations non-domestiques",
    categorie: "Protection",
    description:
      "Règles de protection des contacts indirects en non-domestique.",
    explication_profane:
      "Dans les locaux professionnels, la protection contre l'électrocution doit être cohérente entre la terre et les différentiels, selon le type d'installation.",
    contenu:
      "La sous-section 4.2.4.4 fixe les mesures de protection contre les contacts indirects dans les installations non-domestiques, notamment la cohérence entre schéma de terre, résistance de dispersion et choix des dispositifs différentiels.",
    mots_cles: [
      "4.2.4.4",
      "non-domestique",
      "contacts indirects",
      "schéma de terre",
      "dispositif différentiel",
    ],
    importance: "critique",
  },
  {
    id: "6.3.1",
    titre: "Objet de l'agrément (organismes de contrôle)",
    categorie: "Vérification",
    description:
      "Section 6.3.1 relative à l'agrément des organismes intervenant dans les contrôles.",
    contenu:
      "La section 6.3.1 traite de l'objet de l'agrément des organismes chargés des contrôles RGIE. Elle s'inscrit dans le cadre du chapitre 6.3 relatif aux organismes et autorités habilités.",
    mots_cles: [
      "6.3.1",
      "agrément",
      "organisme agréé",
      "contrôle",
      "habilitation",
    ],
    importance: "élevée",
  },

  // SECTION 7: Locaux et emplacements particuliers
  {
    id: "7.1.1",
    titre: "Salles de bains et douches - Volumes",
    categorie: "Emplacements spéciaux",
    description: "Division en volumes de sécurité dans les salles d'eau.",
    explication_profane:
      "Plus on est proche de l'eau, plus les appareils autorisés sont limités. La salle de bain est découpée en zones de sécurité.",
    contenu:
      "Volume 0: intérieur baignoire/douche. Volume 1: jusqu'à 2,25m au-dessus du volume 0. Volume 2: jusqu'à 60cm du volume 1. Volume 3: au-delà de 60cm du volume 2.",
    mots_cles: ["salle de bain", "douche", "volume", "eau", "IP"],
    importance: "critique",
  },
  {
    id: "7.1.2",
    titre: "Salles de bains - Matériel autorisé",
    categorie: "Emplacements spéciaux",
    description: "Équipements autorisés par volume.",
    contenu:
      "Conformément à la sous-section 7.1.5.2, le matériel admis dépend du volume: en volume 0, uniquement du matériel fixe autorisé, alimenté en TBTS avec source hors volumes 0 et 1; en volume 1, uniquement le matériel explicitement admis et adapté; en volume 2, les socles en basse tension exigent une protection différentielle à très haute sensibilité ou une séparation individuelle.",
    mots_cles: ["7.1.5.2", "volume 0", "volume 1", "volume 2", "TBTS"],
    importance: "élevée",
  },
  {
    id: "7.2.1",
    titre: "Piscines - Domaine d'application",
    categorie: "Emplacements spéciaux",
    description: "Portée des prescriptions particulières du chapitre 7.2.",
    contenu:
      "La section 7.2.1 précise que les prescriptions générales du Livre 1 s'appliquent aussi aux piscines, pédiluves, fontaines et bassins accessibles, et que le chapitre 7.2 complète ces règles en raison du risque accru de choc électrique dans ces volumes.",
    mots_cles: ["piscine", "7.2.1", "pédiluve", "bassin", "risque accru"],
    importance: "critique",
  },

  // SECTION 8: Tableaux électriques
  {
    id: "8.1.1",
    titre: "Composition du tableau de distribution",
    categorie: "Tableaux",
    description: "Éléments constitutifs d'un tableau électrique.",
    explication_profane:
      "Le tableau doit contenir les protections essentielles: coupure générale, différentiels, disjoncteurs et bornes de terre bien identifiés.",
    contenu:
      "Le tableau doit comporter: appareil de coupure générale, DDR en tête, disjoncteurs divisionnaires, bornes de terre, identification claire des circuits.",
    mots_cles: ["tableau", "distribution", "disjoncteur", "composition"],
    importance: "élevée",
  },
  {
    id: "8.1.2",
    titre: "Accessibilité du tableau",
    categorie: "Tableaux",
    description: "Règles d'installation et d'accès.",
    explication_profane:
      "Le tableau doit être facile d'accès et bien éclairé pour pouvoir couper vite en cas d'urgence et intervenir en sécurité.",
    contenu:
      "Le tableau doit être facilement accessible, à une hauteur entre 0,75m et 1,80m. Espace de travail minimum: 60cm devant le tableau. Éclairage suffisant obligatoire.",
    mots_cles: ["tableau", "accessibilité", "hauteur", "espace"],
    importance: "moyenne",
  },
  {
    id: "8.2.1",
    titre: "Identification des circuits",
    categorie: "Tableaux",
    description: "Marquage et repérage des circuits.",
    explication_profane:
      "Chaque disjoncteur doit dire clairement ce qu'il alimente. Un bon étiquetage évite les erreurs et fait gagner du temps en cas de panne.",
    contenu:
      "Chaque circuit doit être identifié de manière claire et durable (étiquettes, schémas). Le schéma unifilaire doit être disponible au tableau.",
    mots_cles: ["identification", "repérage", "schéma", "étiquette"],
    importance: "moyenne",
  },

  // SECTION 9: Circuits spécialisés
  {
    id: "9.1.1",
    titre: "Devoirs du propriétaire/gestionnaire/exploitant (non-domestique)",
    categorie: "Vérification",
    description:
      "Section 9.1.1 relative aux obligations en installations non-domestiques.",
    contenu:
      "La section 9.1.1 fixe les devoirs du propriétaire, du gestionnaire ou de l'exploitant d'une installation non-domestique, notamment en matière de documents et de collaboration lors des contrôles.",
    mots_cles: [
      "9.1.1",
      "devoirs",
      "non-domestique",
      "propriétaire",
      "exploitant",
    ],
    importance: "élevée",
  },
  {
    id: "9.3.2.2",
    titre: "Travaux électriques - Personnel",
    categorie: "Protection",
    description:
      "Exigences relatives au personnel impliqué dans les travaux électriques.",
    explication_profane:
      "Seules des personnes formées et correctement habilitées peuvent faire certains travaux électriques. Le niveau BA4/BA5 détermine ce qu'elles peuvent faire.",
    contenu:
      "La sous-section 9.3.2.2 impose que les personnes impliquées dans les travaux reçoivent les instructions de sécurité adaptées; la réalisation des tâches est liée au niveau de compétence/habilitation (notamment BA4/BA5 selon le cadre RGIE).",
    mots_cles: [
      "9.3.2.2",
      "personnel",
      "BA4",
      "BA5",
      "instructions de sécurité",
    ],
    importance: "élevée",
  },
  {
    id: "9.3.1",
    titre: "Travaux aux installations électriques - Domaine d'application",
    categorie: "Protection",
    description:
      "Section 9.3.1 sur le champ d'application des règles de travaux électriques.",
    explication_profane:
      "Cette règle dit quand les procédures de sécurité des travaux électriques doivent s'appliquer: sur l'installation, avec elle, ou à proximité.",
    contenu:
      "La section 9.3.1 précise le domaine d'application des prescriptions de sécurité pour les travaux sur, avec ou à proximité des installations électriques.",
    mots_cles: [
      "9.3.1",
      "travaux électriques",
      "domaine d'application",
      "sécurité",
      "intervention",
    ],
    importance: "élevée",
  },
  {
    id: "9.4.1",
    titre: "Panneaux d'avertissement des dangers électriques",
    categorie: "Protection",
    description: "Section 9.4.1 sur la signalisation d'avertissement.",
    explication_profane:
      "Les zones à risque électrique doivent être signalées clairement. La signalisation sert à prévenir avant qu'un accident n'arrive.",
    contenu:
      "La section 9.4.1 impose des panneaux d'avertissement pour signaler les risques électriques dans les lieux/équipements concernés et précise leurs principes de forme et de signalisation.",
    mots_cles: [
      "9.4.1",
      "panneaux",
      "avertissement",
      "danger électrique",
      "signalisation",
    ],
    importance: "élevée",
  },

  // SECTION 10: Cas particuliers
  {
    id: "5.3.4.3",
    titre: "Appareils de chauffage",
    categorie: "Chauffage",
    description:
      "Prescriptions RGIE liées aux circuits de chauffage en domestique.",
    explication_profane:
      "Les circuits de chauffage demandent une protection adaptée car ils peuvent consommer beaucoup et chauffer longtemps.",
    contenu:
      "Dans la sous-section 4.2.4.3, certains circuits de chauffage peuvent être repris sur des dispositifs différentiels complémentaires adaptés. Pour les résistances noyées alimentées au-delà des seuils TBTS, une protection différentielle dédiée est exigée.",
    mots_cles: [
      "chauffage électrique",
      "résistances noyées",
      "DDR",
      "4.2.4.3",
      "protection dédiée",
    ],
    importance: "élevée",
  },
  {
    id: "7.1.5.1",
    titre: "Lieux baignoire/douche - Prescriptions communes du matériel",
    categorie: "Emplacements spéciaux",
    description:
      "Prescriptions communes de choix et d'utilisation du matériel dans les lieux 7.1.",
    explication_profane:
      "Dans une salle d'eau, le matériel doit être choisi selon l'humidité, les projections d'eau et la proximité des personnes.",
    contenu:
      "La sous-section 7.1.5.1 fixe les prescriptions communes (influences externes et contraintes générales) applicables au matériel électrique installé dans les lieux contenant une baignoire et/ou une douche.",
    mots_cles: [
      "7.1.5.1",
      "baignoire",
      "douche",
      "matériel électrique",
      "influences externes",
    ],
    importance: "moyenne",
  },
  {
    id: "7.22.4",
    titre: "Bornes VE - Mesures de protection",
    categorie: "Mobilité électrique",
    description:
      "Mesures de protection générales applicables aux bornes de charge VE.",
    explication_profane:
      "Une borne de voiture électrique doit avoir ses protections dédiées contre les défauts électriques et les surintensités.",
    contenu:
      "La section 7.22.4 regroupe les mesures de protection des bornes VE: protection contre les contacts indirects (dont DDR adapté) et protection contre les surintensités des circuits dédiés.",
    mots_cles: [
      "7.22.4",
      "borne VE",
      "contacts indirects",
      "surintensités",
      "circuit dédié",
    ],
    importance: "élevée",
  },

  // EXTRAITS COMPLÉMENTAIRES - RGIE Annexe 1 (PDF fourni)
  {
    id: "4.2.3.1",
    titre: "Principes de prévention des contacts indirects en basse tension",
    categorie: "Protection",
    description:
      "Mesures de base et mesures complémentaires contre les contacts indirects.",
    contenu:
      "La protection est assurée par une construction sûre, un entretien adéquat et des mesures complémentaires: classe II/isolement renforcé, séparation de sécurité, liaisons équipotentielles locales, ou coupure automatique avec conducteur de protection relié à la terre.",
    mots_cles: [
      "contact indirect",
      "classe II",
      "séparation de sécurité",
      "liaison équipotentielle",
      "coupure automatique",
    ],
    importance: "critique",
  },
  {
    id: "4.2.3.2",
    titre: "Installation de mise à la terre",
    categorie: "Mise à la terre",
    description:
      "Composition de l'installation de terre et exigences de résistance.",
    explication_profane:
      "La terre est la voie d'évacuation des défauts électriques. Elle doit être bien réalisée et suffisamment efficace pour faire déclencher les protections.",
    contenu:
      "L'installation de mise à la terre comprend prises de terre, conducteurs de terre, conducteurs de protection et liaisons équipotentielles. La résistance de dispersion est maintenue aussi faible que possible; pour le domestique, elle est réalisée selon la sous-section 5.4.2.1 avec une valeur inférieure à 100 ohms.",
    mots_cles: [
      "mise à la terre",
      "prise de terre",
      "conducteur de terre",
      "liaison équipotentielle",
      "100 ohms",
    ],
    importance: "critique",
  },
  {
    id: "4.2.4.3",
    titre:
      "Protection contre les contacts indirects - Installations domestiques",
    categorie: "Protection",
    description: "Règles DDR en habitation et parties communes résidentielles.",
    explication_profane:
      "En habitation, les différentiels sont obligatoires et doivent être bien répartis. Ils coupent vite en cas de fuite pour protéger les personnes.",
    contenu:
      "Au moins un DDR est placé à l'origine de l'installation et des DDR haute ou très haute sensibilité sont exigés pour les circuits clés (prises, éclairage, salles de bains, lave-linge/sèche-linge/lave-vaisselle). Maximum 8 circuits terminaux par DDR haute sensibilité; si la résistance de terre est supérieure à 30 ohms, au moins deux DDR haute sensibilité sont requis.",
    mots_cles: [
      "DDR",
      "haute sensibilité",
      "salle de bains",
      "8 circuits",
      "30 ohms",
    ],
    importance: "critique",
  },
  {
    id: "4.2.5.3",
    titre: "Installations TBTS/TBTP",
    categorie: "Protection",
    description:
      "Prescriptions de séparation et d'alimentation en très basse tension.",
    contenu:
      "Les circuits TBTS/TBTP sont alimentés par des sources autorisées et séparés physiquement des autres circuits. Les conducteurs doivent garantir la séparation de protection et les prises TBTS/TBTP doivent empêcher toute interconnexion avec des socles d'autres tensions.",
    mots_cles: ["TBTS", "TBTP", "séparation", "très basse tension", "prises"],
    importance: "critique",
  },
  {
    id: "4.2.5.5",
    titre: "Circuits TBTS - Raccordements interdits",
    categorie: "Protection",
    description:
      "Interdictions de liaisons galvaniques pour préserver la TBTS.",
    contenu:
      "Les parties actives et les masses du matériel TBTS ne peuvent pas être reliées galvaniquement à la prise de terre, aux conducteurs de protection d'autres circuits ni aux masses d'autres installations, sauf conditions explicitement prévues pour éviter tout dépassement de tension admissible.",
    mots_cles: [
      "TBTS",
      "liaison galvanique",
      "prise de terre",
      "masse",
      "sécurité",
    ],
    importance: "critique",
  },
  {
    id: "5.4.2.1",
    titre: "Prise de terre domestique - Boucle de terre",
    categorie: "Mise à la terre",
    description:
      "Exigences de réalisation de la boucle de terre dans les nouveaux bâtiments.",
    explication_profane:
      "Dans un bâtiment neuf, la boucle de terre doit être posée correctement dès le gros oeuvre. C'est une base essentielle de la sécurité électrique.",
    contenu:
      "Pour un nouveau bâtiment avec fond de fouille d'au moins 60 cm, une boucle de terre est posée à fond de fouille à la verticale des murs extérieurs. La section minimale du conducteur de boucle est de 35 mm², et les extrémités/connexions restent visitables.",
    mots_cles: [
      "boucle de terre",
      "fond de fouille",
      "35 mm²",
      "bâtiment neuf",
      "prise de terre",
    ],
    importance: "élevée",
  },
  {
    id: "5.4.2",
    titre: "Prise de terre commune - Dispositions techniques",
    categorie: "Mise à la terre",
    description:
      "Règles techniques pour une prise de terre commune à plusieurs installations.",
    explication_profane:
      "Si plusieurs installations partagent la même terre, son niveau de qualité et son repérage doivent rester maîtrisés et vérifiables.",
    contenu:
      "La prise de terre commune doit avoir une résistance de dispersion inférieure ou égale à 30 ohms. Un sectionneur de terre commun unique et accessible est requis, avec repérage durable, accessibilité des points de connexion et distribution en étoile vers les bâtiments concernés.",
    mots_cles: [
      "prise de terre commune",
      "30 ohms",
      "sectionneur de terre",
      "distribution en étoile",
      "repérage",
    ],
    importance: "critique",
  },
  {
    id: "7.1.4.3",
    titre: "Lieux baignoire/douche - Protection avec coupure automatique",
    categorie: "Emplacements spéciaux",
    description:
      "Protection différentielle des circuits alimentant les lieux contenant baignoire ou douche.",
    explication_profane:
      "Les circuits qui alimentent la salle de bain doivent être protégés par des différentiels adaptés, placés hors du volume humide.",
    contenu:
      "Sauf exceptions TBTS/séparation de sécurité, les circuits alimentant ces lieux sont protégés par un ou plusieurs DDR à haute ou très haute sensibilité. Ces dispositifs sont installés en dehors du lieu contenant la baignoire ou la douche.",
    mots_cles: [
      "baignoire",
      "douche",
      "DDR",
      "haute sensibilité",
      "coupure automatique",
    ],
    importance: "critique",
  },
  {
    id: "7.1.4.4",
    titre: "Lieux baignoire/douche - Liaison équipotentielle supplémentaire",
    categorie: "Emplacements spéciaux",
    description:
      "Liaison locale des masses et éléments conducteurs étrangers accessibles.",
    explication_profane:
      "Dans la salle de bain, les parties métalliques accessibles doivent être mises au même potentiel pour réduire le risque de choc électrique.",
    contenu:
      "Une liaison équipotentielle supplémentaire relie localement toutes les masses et éléments conducteurs étrangers simultanément accessibles dans le lieu, avec exceptions prévues (notamment masses alimentées en TBTS et certains matériels de classe II).",
    mots_cles: [
      "liaison équipotentielle",
      "baignoire",
      "douche",
      "masses",
      "éléments conducteurs étrangers",
    ],
    importance: "critique",
  },
  {
    id: "7.1.5.2",
    titre: "Lieux baignoire/douche - Matériel autorisé par volume",
    categorie: "Emplacements spéciaux",
    description:
      "Restrictions de matériel électrique dans les volumes 0, 1 et 2.",
    explication_profane:
      "Chaque zone de la salle de bain autorise seulement certains appareils. Plus on est près de l'eau, plus les restrictions sont fortes.",
    contenu:
      "Volume 0: uniquement matériel fixe conforme, alimenté en TBTS avec source hors volumes 0 et 1; pas de prises/interrupteurs sauf exceptions intégrées. Volume 1: uniquement matériel explicitement admis et adapté au volume. Volume 2: prises possibles si protégées par DDR très haute sensibilité ou séparation individuelle.",
    mots_cles: [
      "volume 0",
      "volume 1",
      "volume 2",
      "TBTS",
      "matériel autorisé",
    ],
    importance: "critique",
  },
  {
    id: "7.22.1",
    titre: "Bornes VE - Domaine d'application",
    categorie: "Mobilité électrique",
    description:
      "Champ d'application du chapitre RGIE sur l'alimentation des véhicules électriques routiers.",
    contenu:
      "Le chapitre 7.22 s'applique aux bornes de charge conductives pour véhicules électriques routiers et à leurs circuits, y compris les circuits de fourniture d'énergie et, le cas échéant, de réinjection depuis la batterie du véhicule.",
    mots_cles: [
      "7.22",
      "véhicule électrique",
      "borne conductive",
      "domaine d'application",
      "réinjection",
    ],
    importance: "élevée",
  },
  {
    id: "7.22.3",
    titre: "Bornes VE - Circuit dédié par point de connexion",
    categorie: "Mobilité électrique",
    description: "Règle de division des installations pour la recharge VE.",
    explication_profane:
      "Une borne de recharge ne se branche pas sur une prise classique. Chaque point de charge doit avoir son propre circuit dédié.",
    contenu:
      "Il est interdit de connecter une borne de charge fixe au moyen d'une prise de courant classique. Un circuit dédié est requis pour chaque point de connexion, avec protections adéquates situées en amont, dans la borne, ou via une combinaison des deux.",
    mots_cles: [
      "circuit dédié",
      "point de connexion",
      "borne VE",
      "prise de courant",
      "recharge",
    ],
    importance: "critique",
  },
  {
    id: "7.22.4.1",
    titre: "Bornes VE - Protection contre les contacts indirects",
    categorie: "Mobilité électrique",
    description:
      "Mesures de protection des circuits dédiés des bornes de charge.",
    explication_profane:
      "Pour la recharge VE, un différentiel 30 mA adapté est obligatoire, avec gestion des défauts continus pour éviter les protections inefficaces.",
    contenu:
      "Le schéma TN-C est interdit pour le circuit dédié. Chaque circuit dédié AC est protégé individuellement par un DDR de maximum 30 mA, avec prise en compte des composantes continues (DDR compatible ou dispositif de détection DC coordonné).",
    mots_cles: [
      "TN-C interdit",
      "DDR 30 mA",
      "détection DC",
      "contact indirect",
      "circuit dédié",
    ],
    importance: "critique",
  },
  {
    id: "7.22.4.2",
    titre: "Bornes VE - Protection contre les surintensités",
    categorie: "Mobilité électrique",
    description:
      "Protection individuelle des circuits de recharge contre les surcharges et courts-circuits.",
    contenu:
      "Chaque circuit dédié est protégé individuellement par un dispositif de protection contre les surintensités conforme au chapitre 4.4. Une protection commune peut être admise pour plusieurs points non simultanés si la protection reste adéquate pour chacun.",
    mots_cles: [
      "surintensités",
      "surcharge",
      "court-circuit",
      "circuit dédié",
      "borne VE",
    ],
    importance: "critique",
  },
  {
    id: "7.22.5.1",
    titre: "Bornes VE - Influences externes",
    categorie: "Mobilité électrique",
    description:
      "Exigences de protection environnementale des bornes de charge.",
    explication_profane:
      "Une borne en extérieur doit résister à la pluie et aux chocs. L'indice de protection minimal demandé est IP44.",
    contenu:
      "La borne de charge doit être protégée contre les influences externes prévisibles. En installation à ciel ouvert, le matériel présente au minimum un degré de protection IP44 et des mesures complémentaires sont prises contre les chocs mécaniques prévisibles.",
    mots_cles: [
      "IP44",
      "influences externes",
      "borne extérieure",
      "protection mécanique",
      "recharge VE",
    ],
    importance: "élevée",
  },
  {
    id: "7.22.2",
    titre: "Bornes VE - Termes et définitions",
    categorie: "Mobilité électrique",
    description:
      "Définitions de véhicule électrique, borne de charge et point de connexion.",
    contenu:
      "La section définit les notions de véhicule électrique routier, borne de charge conductive et point de connexion (par exemple socle sur borne ou prise mobile de véhicule) afin d'appliquer correctement les prescriptions techniques.",
    mots_cles: [
      "définitions",
      "point de connexion",
      "borne de charge",
      "véhicule électrique",
      "chapitre 7.22",
    ],
    importance: "moyenne",
  },

  // COMPLÉMENTS MASSIFS - STRUCTURE, PROTECTION, CONTRÔLES ET OBLIGATIONS
  {
    id: "2.6.1",
    titre: "Circuits électriques - Termes généraux",
    categorie: "Circuits",
    description: "Terminologie de base des circuits électriques du Livre 1.",
    contenu:
      "Cette section introduit les termes généraux relatifs aux circuits électriques utilisés dans le RGIE pour uniformiser l'interprétation des prescriptions techniques.",
    mots_cles: ["circuits", "termes", "définitions", "rgie", "livre 1"],
    importance: "moyenne",
  },
  {
    id: "2.6.2",
    titre: "Circuits électriques - Courants",
    categorie: "Circuits",
    description:
      "Notions de courant utiles au dimensionnement et à la protection.",
    contenu:
      "La section couvre les notions de courants utilisées pour le choix des protections, le dimensionnement des conducteurs et l'analyse des défauts en basse et très basse tension.",
    mots_cles: [
      "courant",
      "dimensionnement",
      "protection",
      "défaut",
      "basse tension",
    ],
    importance: "élevée",
  },
  {
    id: "2.6.3",
    titre: "Circuits électriques - Transformateurs",
    categorie: "Circuits",
    description:
      "Rôle des transformateurs dans l'alimentation et la séparation des circuits.",
    contenu:
      "La section définit les principes liés aux transformateurs utilisés dans les installations électriques, notamment pour la séparation et l'adaptation de tension.",
    mots_cles: [
      "transformateur",
      "séparation",
      "alimentation",
      "tension",
      "circuits",
    ],
    importance: "élevée",
  },
  {
    id: "2.6.4",
    titre: "Caractéristiques des dispositifs de protection",
    categorie: "Protection",
    description: "Paramètres de référence des dispositifs de protection.",
    contenu:
      "Cette section fixe les caractéristiques techniques générales des dispositifs de protection à utiliser dans les circuits (seuils, comportement et adéquation au circuit protégé).",
    mots_cles: [
      "dispositif de protection",
      "caractéristiques",
      "seuil",
      "coordination",
      "circuit",
    ],
    importance: "élevée",
  },
  {
    id: "2.7.1",
    titre: "Canalisations - Termes généraux",
    categorie: "Dimensionnement",
    description: "Vocabulaire de base relatif aux canalisations électriques.",
    contenu:
      "La section définit les termes généraux appliqués aux canalisations électriques, utilisés dans les règles de choix, de pose et de protection des conducteurs.",
    mots_cles: ["canalisation", "conducteur", "termes", "pose", "protection"],
    importance: "moyenne",
  },
  {
    id: "2.7.2",
    titre: "Canalisations - Modes de pose",
    categorie: "Dimensionnement",
    description: "Classification et principes des modes de pose.",
    explication_profane:
      "La façon de poser les câbles (en gaine, encastré, enterré...) influence la section nécessaire et la protection à choisir.",
    contenu:
      "Les modes de pose sont définis afin de permettre le choix correct des sections, des protections et des contraintes admissibles en service normal.",
    mots_cles: [
      "mode de pose",
      "canalisation",
      "section",
      "installation",
      "choix",
    ],
    importance: "élevée",
  },
  {
    id: "3.1.2",
    titre: "Schémas, plans et documents des installations",
    categorie: "Tableaux",
    description: "Exigences documentaires des installations électriques.",
    contenu:
      "Les installations doivent disposer de schémas, plans et documents adaptés pour permettre la compréhension, la vérification, l'exploitation et la maintenance en sécurité.",
    mots_cles: [
      "schéma",
      "plan",
      "documentation",
      "installation",
      "conformité",
    ],
    importance: "élevée",
  },
  {
    id: "3.1.2.1",
    titre: "Prescriptions générales des schémas et plans",
    categorie: "Tableaux",
    description: "Règles générales de contenu et de lisibilité documentaire.",
    contenu:
      "Les documents techniques de l'installation doivent être clairs, cohérents, maintenus à jour et suffisamment détaillés pour refléter l'état réel de l'installation.",
    mots_cles: [
      "prescriptions générales",
      "schémas",
      "plans",
      "mise à jour",
      "lisibilité",
    ],
    importance: "élevée",
  },
  {
    id: "3.1.2.2",
    titre: "Contenu des schémas de l'installation",
    categorie: "Tableaux",
    description: "Informations minimales attendues dans les schémas.",
    explication_profane:
      "Le schéma doit montrer clairement circuits, protections et coupures pour qu'un technicien comprenne l'installation sans danger.",
    contenu:
      "Les schémas de l'installation reprennent les circuits, protections et organes de coupure de manière à permettre les contrôles et interventions en sécurité.",
    mots_cles: [
      "schéma unifilaire",
      "circuits",
      "protections",
      "coupure",
      "contrôle",
    ],
    importance: "élevée",
  },
  {
    id: "3.1.2.3",
    titre: "Contenu des plans de position",
    categorie: "Tableaux",
    description: "Exigences de repérage spatial du matériel.",
    explication_profane:
      "Le plan de position indique où se trouvent les équipements électriques dans le bâtiment pour éviter les erreurs lors des travaux.",
    contenu:
      "Les plans de position indiquent l'implantation du matériel électrique et des circuits afin de faciliter la maintenance, la vérification et la traçabilité de l'installation.",
    mots_cles: [
      "plan de position",
      "implantation",
      "matériel",
      "repérage",
      "traçabilité",
    ],
    importance: "élevée",
  },
  {
    id: "3.1.2.4",
    titre: "Plans de localisation détaillés",
    categorie: "Tableaux",
    description: "Précisions complémentaires sur les plans d'installation.",
    explication_profane:
      "Quand c'est nécessaire, des plans plus détaillés sont fournis pour localiser précisément les éléments sensibles.",
    contenu:
      "Des plans complémentaires peuvent être requis pour localiser précisément les éléments critiques de l'installation et réduire les risques lors des travaux.",
    mots_cles: ["plans", "localisation", "travaux", "sécurité", "installation"],
    importance: "moyenne",
  },
  {
    id: "3.1.3.1",
    titre: "Repérage des circuits",
    categorie: "Tableaux",
    description: "Identification claire et durable des circuits.",
    explication_profane:
      "Chaque circuit doit avoir un repère durable pour savoir immédiatement ce qu'on coupe ou ce qu'on contrôle.",
    contenu:
      "Chaque circuit doit être repéré de manière compréhensible et durable pour éviter les erreurs de manœuvre et améliorer la sécurité des interventions.",
    mots_cles: [
      "repérage",
      "circuits",
      "identification",
      "sécurité",
      "maintenance",
    ],
    importance: "élevée",
  },
  {
    id: "3.1.3.2",
    titre: "Repérage du matériel électrique",
    categorie: "Tableaux",
    description: "Règles d'identification des appareils et équipements.",
    contenu:
      "Le matériel électrique doit être identifié de façon cohérente avec les schémas et plans pour assurer une correspondance fiable entre terrain et documentation.",
    mots_cles: [
      "repérage matériel",
      "identification",
      "documentation",
      "cohérence",
      "terrain",
    ],
    importance: "élevée",
  },
  {
    id: "3.1.3.3",
    titre: "Repérage des tableaux de répartition et de manoeuvre",
    categorie: "Tableaux",
    description: "Identification des tableaux et de leurs fonctions.",
    contenu:
      "Les tableaux de répartition et de manœuvre sont repérés de manière à rendre explicite leur rôle, leur zone desservie et les circuits associés.",
    mots_cles: [
      "tableau de répartition",
      "manœuvre",
      "repérage",
      "circuits",
      "identification",
    ],
    importance: "élevée",
  },
  {
    id: "4.4.1",
    titre: "Protection électrique contre les surintensités - Généralités",
    categorie: "Protection",
    description:
      "Principes généraux de protection contre surcharges et courts-circuits.",
    contenu:
      "La protection contre les surintensités est organisée pour limiter l'échauffement dangereux des conducteurs et préserver l'installation en cas de surcharge ou de court-circuit.",
    mots_cles: [
      "surintensité",
      "surcharge",
      "court-circuit",
      "échauffement",
      "protection",
    ],
    importance: "critique",
  },
  {
    id: "4.4.2",
    titre: "Protection contre les courts-circuits",
    categorie: "Protection",
    description:
      "Exigences de coupure et de placement des protections contre courts-circuits.",
    contenu:
      "Les dispositifs de protection contre les courts-circuits doivent disposer d'un pouvoir de coupure adapté au courant de court-circuit présumé et être implantés de manière à garantir une protection effective des canalisations.",
    mots_cles: [
      "court-circuit",
      "pouvoir de coupure",
      "dispositif",
      "canalisation",
      "protection",
    ],
    importance: "critique",
  },
  {
    id: "4.4.2.1",
    titre: "Dispositifs contre courts-circuits - Conditions techniques",
    categorie: "Protection",
    description: "Pouvoir de coupure et temps de fonctionnement admissible.",
    explication_profane:
      "En cas de court-circuit, la protection doit couper assez vite et assez fort pour éviter la surchauffe et les dégâts sur les câbles.",
    contenu:
      "Le dispositif doit avoir un pouvoir de coupure au moins égal au court-circuit présumé et couper dans un temps compatible avec la tenue thermique des conducteurs.",
    mots_cles: [
      "temps de coupure",
      "tenue thermique",
      "pouvoir de coupure",
      "court-circuit",
      "conducteur",
    ],
    importance: "critique",
  },
  {
    id: "4.4.2.2",
    titre: "Emplacement des dispositifs contre courts-circuits",
    categorie: "Protection",
    description:
      "Règles de positionnement à l'origine des circuits et dérogations.",
    explication_profane:
      "La protection contre court-circuit se place en principe au départ du circuit pour protéger toute la ligne dès l'origine.",
    contenu:
      "La protection est placée en principe à l'origine du circuit. Des dérogations existent sous conditions strictes (portion courte, risque réduit, éloignement des matériaux combustibles).",
    mots_cles: [
      "origine du circuit",
      "dérogation",
      "portion courte",
      "matériaux combustibles",
      "positionnement",
    ],
    importance: "élevée",
  },
  {
    id: "4.4.3",
    titre: "Protection contre les surcharges en BT/TBT",
    categorie: "Protection",
    description:
      "Principes de placement et de réglage des protections surcharge.",
    explication_profane:
      "Une surcharge chauffe les câbles. Les protections doivent être placées et réglées pour couper avant que les conducteurs ne se détériorent.",
    contenu:
      "Les protections contre surcharges sont positionnées là où un changement de section, de nature ou de pose réduit le courant admissible dans les conducteurs.",
    mots_cles: [
      "surcharge",
      "courant admissible",
      "conducteur",
      "section",
      "protection",
    ],
    importance: "critique",
  },
  {
    id: "4.4.3.1",
    titre: "Principe de protection surcharge",
    categorie: "Protection",
    description:
      "Position de la protection lors des changements de caractéristiques de canalisation.",
    contenu:
      "Un dispositif de protection contre les surcharges est placé lorsque les caractéristiques de la canalisation entraînent une diminution du courant admissible.",
    mots_cles: [
      "principe",
      "surcharge",
      "canalisation",
      "courant admissible",
      "dispositif",
    ],
    importance: "élevée",
  },
  {
    id: "4.4.3.2",
    titre: "Conditions des dispositifs contre surcharges",
    categorie: "Protection",
    description:
      "Relations entre courant d'emploi, courant nominal et courant admissible.",
    explication_profane:
      "Le réglage du disjoncteur doit laisser passer l'usage normal mais couper avant que les câbles ne chauffent dangereusement.",
    contenu:
      "Le courant nominal du dispositif est supérieur ou égal au courant d'emploi et inférieur au courant admissible; les courants conventionnels de fonctionnement/non-fonctionnement restent dans les limites RGIE.",
    mots_cles: [
      "courant d'emploi",
      "courant nominal",
      "courant admissible",
      "In",
      "surcharge",
    ],
    importance: "critique",
  },
  {
    id: "4.4.3.3",
    titre: "Dispenses de protection surcharge",
    categorie: "Protection",
    description: "Cas admissibles de dérogation à la protection surcharge.",
    contenu:
      "Des dispenses sont admises dans des cas spécifiques (certaines canalisations, protections en amont, circuits particuliers), sous réserve de conditions techniques précises et de limitation des risques.",
    mots_cles: [
      "dispense",
      "dérogation",
      "surcharge",
      "protection en amont",
      "conditions",
    ],
    importance: "élevée",
  },
  {
    id: "4.4.4",
    titre: "Protection des conducteurs de phase et neutre",
    categorie: "Protection",
    description:
      "Règles de détection/coupure des surintensités selon le schéma de réseau.",
    contenu:
      "La protection des phases et du neutre dépend du type de circuit et du schéma de mise à la terre (TT, TN, IT), avec exigences de coupure adaptées.",
    mots_cles: ["phase", "neutre", "TT", "TN", "IT"],
    importance: "critique",
  },
  {
    id: "4.4.4.2",
    titre: "Circuits monophasés - Protection des conducteurs actifs",
    categorie: "Protection",
    description: "Protection en monophasé dans les installations domestiques.",
    contenu:
      "Dans les circuits monophasés domestiques, la protection s'applique aux deux conducteurs actifs sauf présence d'un dispositif assurant simultanément la protection et la coupure adéquate.",
    mots_cles: [
      "monophasé",
      "conducteurs actifs",
      "domestique",
      "protection",
      "coupure",
    ],
    importance: "élevée",
  },
  {
    id: "4.4.4.4",
    titre: "Circuits triphasés TT/TN avec neutre distribué",
    categorie: "Protection",
    description: "Conditions de protection du neutre selon sa section.",
    contenu:
      "Lorsque la section du neutre est inférieure à celle des phases, une détection de surintensité sur le neutre est requise, avec coupure adaptée des conducteurs actifs selon les cas prévus.",
    mots_cles: ["triphasé", "neutre distribué", "TT", "TN", "surintensité"],
    importance: "élevée",
  },
  {
    id: "4.6.4",
    titre: "Protection contre les risques dus aux mouvements",
    categorie: "Protection",
    description:
      "Mesures contre les risques mécaniques sur installations et canalisations.",
    contenu:
      "La protection tient compte des risques créés par les mouvements mécaniques ou déplacements susceptibles d'endommager les éléments de l'installation électrique.",
    mots_cles: [
      "risques mécaniques",
      "mouvements",
      "canalisation",
      "protection",
      "sécurité",
    ],
    importance: "élevée",
  },
  {
    id: "5.2.9",
    titre: "Règles particulières selon le mode de pose",
    categorie: "Dimensionnement",
    description:
      "Prescriptions spécifiques pour pose aérienne, souterraine, encastrée, etc.",
    explication_profane:
      "Selon que le câble est en plein air, enterré ou encastré, les contraintes changent et les règles de pose ne sont pas les mêmes.",
    contenu:
      "La section 5.2.9 définit des règles détaillées par mode de pose (lignes aériennes, canalisations souterraines, conduits, encastrement, installations extérieures, TBT, etc.).",
    mots_cles: [
      "mode de pose",
      "aérien",
      "souterrain",
      "encastrement",
      "installations extérieures",
    ],
    importance: "élevée",
  },
  {
    id: "5.3.1",
    titre: "Appareillage électrique - Généralités",
    categorie: "Tableaux",
    description:
      "Choix/mise en œuvre de l'appareillage de protection, commande et sectionnement.",
    contenu:
      "Le chapitre traite de l'appareillage électrique (protection, commande, sectionnement, surveillance) en tenant compte des influences externes du chapitre 2.10.",
    mots_cles: [
      "appareillage",
      "commande",
      "sectionnement",
      "surveillance",
      "influences externes",
    ],
    importance: "élevée",
  },
  {
    id: "5.3.2.2",
    titre: "Matériel en fonction de la présence d'eau (AD)",
    categorie: "Protection",
    description: "Degrés de protection IP selon l'influence externe AD.",
    contenu:
      "Le degré de protection contre les liquides est choisi selon la présence d'eau (AD) avec correspondances IP (par exemple AD4: IPX4, AD7: IPX7, AD8: IPX8).",
    mots_cles: ["AD", "IP", "IPX4", "IPX7", "présence d'eau"],
    importance: "critique",
  },
  {
    id: "5.3.2.3",
    titre: "Matériel en fonction des corps solides étrangers (AE)",
    categorie: "Protection",
    description: "Degrés de protection IP contre pénétration de corps solides.",
    contenu:
      "Le matériel est choisi selon l'influence AE et le niveau de pénétration admissible des corps solides (ex.: AE2 -> IP3X, AE3 -> IP4X, AE4 -> IP5X/IP6X selon l'étanchéité requise).",
    mots_cles: ["AE", "IP3X", "IP4X", "IP5X", "IP6X"],
    importance: "élevée",
  },
  {
    id: "5.3.2.9",
    titre: "Matériel en fonction de la compétence des personnes (BA)",
    categorie: "Protection",
    description: "Adaptation du matériel selon BA1 à BA5.",
    contenu:
      "Le choix du matériel dépend du niveau de compétence des personnes (BA). Exemples: exigences renforcées pour BA2/BA3 et possibilités particulières pour BA4/BA5.",
    mots_cles: ["BA1", "BA2", "BA3", "BA4", "BA5"],
    importance: "élevée",
  },
  {
    id: "5.3.2.11",
    titre: "Matériel en fonction du contact au potentiel de terre (BC)",
    categorie: "Protection",
    description:
      "Choix des classes de matériel selon fréquence de contact à la terre.",
    contenu:
      "Le choix du matériel est adapté à la classe BC (contact des personnes avec le potentiel de terre), avec exigences de classe et mesures de protection correspondantes.",
    mots_cles: [
      "BC",
      "potentiel de terre",
      "classe de matériel",
      "contact",
      "protection",
    ],
    importance: "élevée",
  },
  {
    id: "5.3.3",
    titre: "Modes de commande et de coupure",
    categorie: "Tableaux",
    description: "Règles de coupure de sécurité et commande fonctionnelle.",
    contenu:
      "La section précise les modes de commande/coupure, y compris le sectionnement de sécurité, la commande fonctionnelle et les fonctions simultanées des dispositifs.",
    mots_cles: [
      "commande",
      "coupure",
      "sectionnement",
      "sécurité",
      "fonctionnelle",
    ],
    importance: "critique",
  },
  {
    id: "5.3.3.1",
    titre: "Coupure de sécurité - Sectionnement",
    categorie: "Tableaux",
    description:
      "Dispositifs permettant le sectionnement pour entretien et réparation.",
    explication_profane:
      "Avant entretien ou réparation, il faut pouvoir isoler clairement la partie concernée pour travailler sans tension.",
    contenu:
      "Des dispositifs de sectionnement doivent permettre l'isolement de tout ou partie de l'installation pour entretien et dépannage, avec règles spécifiques selon les schémas de mise à la terre.",
    mots_cles: [
      "coupure de sécurité",
      "sectionnement",
      "entretien",
      "réparation",
      "schéma réseau",
    ],
    importance: "critique",
  },
  {
    id: "5.3.7",
    titre: "Circuits de mesure",
    categorie: "Tableaux",
    description: "Règles applicables aux circuits de mesure.",
    contenu:
      "Les circuits de mesure (dont mesure de courant) sont traités avec des prescriptions spécifiques pour garantir la sécurité, la fiabilité de mesure et la tenue des équipements associés.",
    mots_cles: [
      "mesure",
      "instrumentation",
      "circuits de mesure",
      "sécurité",
      "courant",
    ],
    importance: "moyenne",
  },
  {
    id: "6.4.1",
    titre: "Contrôle de conformité avant mise en usage - Généralités",
    categorie: "Vérification",
    description:
      "Obligation de contrôle avant mise en service des installations BT/TBT.",
    explication_profane:
      "Avant d'utiliser une nouvelle installation (ou une grosse modification), un contrôle officiel doit confirmer qu'elle est conforme et sûre.",
    contenu:
      "Avant mise en usage, l'installation fait l'objet d'un contrôle de conformité sur place (organisme agréé ou autorité habilitée), comprenant contrôles administratifs, visuels, essais et mesures.",
    mots_cles: [
      "contrôle de conformité",
      "mise en usage",
      "organisme agréé",
      "BT",
      "TBT",
    ],
    importance: "critique",
  },
  {
    id: "6.4.5",
    titre: "Contrôles par mesures",
    categorie: "Vérification",
    description: "Cadre des mesures à réaliser lors du contrôle de conformité.",
    contenu:
      "La section 6.4.5 regroupe les contrôles par mesures réalisés avant mise en usage, notamment les mesures d'isolement (6.4.5.1) et la mesure de la résistance de dispersion des prises de terre (6.4.5.2).",
    mots_cles: [
      "6.4.5",
      "contrôles par mesures",
      "isolement",
      "prise de terre",
      "conformité",
    ],
    importance: "critique",
  },
  {
    id: "6.4.5.2",
    titre:
      "Contrôles par mesures - Résistance de dispersion des prises de terre",
    categorie: "Vérification",
    description:
      "Mesure de la résistance de dispersion des prises de terre au contrôle initial.",
    explication_profane:
      "Le contrôleur mesure la qualité de la terre. Si la terre est mauvaise, les protections peuvent ne pas fonctionner correctement.",
    contenu:
      "Lors du contrôle de conformité avant mise en usage, la résistance de dispersion des prises de terre de l'installation est mesurée et consignée dans le rapport.",
    mots_cles: [
      "résistance de dispersion",
      "prise de terre",
      "mesure",
      "rapport",
      "contrôle initial",
    ],
    importance: "critique",
  },
  {
    id: "6.4.6",
    titre: "Rapports de contrôle de conformité",
    categorie: "Vérification",
    description:
      "Contenu, conservation et transmission des rapports de conformité.",
    explication_profane:
      "Après un contrôle, le rapport doit être conservé et transmis correctement. C'est la preuve officielle de l'état de conformité.",
    contenu:
      "Après contrôle de conformité, un rapport est établi, classé dans le dossier de l'installation et transmis au propriétaire/gestionnaire/exploitant; des exigences spécifiques existent pour domestique et non-domestique.",
    mots_cles: [
      "rapport",
      "dossier installation",
      "transmission",
      "domestique",
      "non-domestique",
    ],
    importance: "élevée",
  },
  {
    id: "6.4.7",
    titre: "Cas spécifiques du contrôle avant mise en usage",
    categorie: "Vérification",
    description:
      "Règles particulières pour machines, installations mobiles et modifications.",
    explication_profane:
      "Certaines installations (mobiles, temporaires, modifiées) ont des règles de contrôle adaptées avant mise en service.",
    contenu:
      "Le RGIE prévoit des dispositions spécifiques de contrôle de conformité pour certains cas: machines/appareils, installations transportables/mobiles/temporaires et modifications/extensions.",
    mots_cles: [
      "cas spécifiques",
      "machine",
      "mobile",
      "temporaire",
      "modification",
    ],
    importance: "élevée",
  },
  {
    id: "6.5.1",
    titre: "Visites de contrôle - Généralités",
    categorie: "Vérification",
    description: "Cadre général des visites de contrôle périodiques.",
    explication_profane:
      "Même après l'installation, des contrôles périodiques sont nécessaires pour vérifier que la sécurité est maintenue dans le temps.",
    contenu:
      "Les installations électriques sont soumises à des visites de contrôle selon les règles du chapitre 6.5 afin de vérifier le maintien de la conformité et de la sécurité dans le temps.",
    mots_cles: [
      "visite de contrôle",
      "périodique",
      "maintien conformité",
      "sécurité",
      "rgie",
    ],
    importance: "élevée",
  },
  {
    id: "6.5.2",
    titre: "Périodicité des visites de contrôle",
    categorie: "Vérification",
    description: "Fréquence des vérifications selon type d'installation.",
    explication_profane:
      "La fréquence des contrôles dépend du type d'installation et du niveau de risque: il faut respecter l'échéance réglementaire.",
    contenu:
      "La périodicité des visites de contrôle est définie par le RGIE selon la nature de l'installation et ses risques, avec obligations de suivi par propriétaire ou exploitant.",
    mots_cles: [
      "périodicité",
      "visite",
      "vérification",
      "obligations",
      "exploitant",
    ],
    importance: "élevée",
  },
  {
    id: "6.5.7",
    titre: "Rapports des visites de contrôle",
    categorie: "Vérification",
    description:
      "Rapports de visite pour installations domestiques et non-domestiques.",
    explication_profane:
      "Chaque visite périodique doit se conclure par un rapport écrit, utile pour le suivi des défauts et obligations de conformité.",
    contenu:
      "Un rapport de visite de contrôle est établi après vérification et comporte des contenus spécifiques selon qu'il s'agit d'installations domestiques ou non-domestiques.",
    mots_cles: [
      "rapport de visite",
      "domestique",
      "non-domestique",
      "contrôle",
      "documentation",
    ],
    importance: "élevée",
  },
  {
    id: "6.5.8",
    titre:
      "Dispositions dérogatoires (installations réalisées à partir du 1er juin 2020)",
    categorie: "Vérification",
    description: "Régime dérogatoire pour certaines parties existantes.",
    explication_profane:
      "Dans certains cas, des règles transitoires existent pour des parties d'installation déjà en place, mais sous conditions strictes.",
    contenu:
      "Le RGIE prévoit des dispositions dérogatoires applicables, sous conditions, à des parties existantes d'installations domestiques ou non-domestiques réalisées à partir du 1er juin 2020.",
    mots_cles: [
      "dérogation",
      "1er juin 2020",
      "parties existantes",
      "domestique",
      "non-domestique",
    ],
    importance: "moyenne",
  },
  {
    id: "9.1.2",
    titre: "Devoirs du propriétaire/exploitant - Installations domestiques",
    categorie: "Vérification",
    description: "Obligations RGIE de suivi documentaire en domestique.",
    explication_profane:
      "Le propriétaire doit garder les documents et rapports à jour pour prouver la conformité et faciliter les contrôles.",
    contenu:
      "Pour les installations domestiques, le propriétaire/gestionnaire doit conserver et tenir à jour les documents et rapports exigés, et faciliter les contrôles réglementaires.",
    mots_cles: ["devoirs", "domestique", "documents", "rapports", "rgie"],
    importance: "élevée",
  },
  {
    id: "9.1.3",
    titre: "Installations en infraction après contrôle ou visite",
    categorie: "Vérification",
    description: "Traitement des non-conformités relevées par contrôle.",
    contenu:
      "Lorsqu'une installation est en infraction à l'issue d'un contrôle de conformité ou d'une visite de contrôle, les mesures correctives et obligations de suivi doivent être appliquées dans les délais prescrits.",
    mots_cles: [
      "infraction",
      "non-conformité",
      "mesures correctives",
      "délai",
      "contrôle",
    ],
    importance: "critique",
  },
  {
    id: "9.1.5",
    titre: "Localisation des canalisations électriques souterraines",
    categorie: "Vérification",
    description:
      "Exigences de localisation/documentation des réseaux enterrés.",
    contenu:
      "La localisation des canalisations électriques souterraines doit être assurée et documentée pour réduire les risques lors des travaux de terrassement et d'exploitation.",
    mots_cles: [
      "canalisation souterraine",
      "localisation",
      "terrassement",
      "sécurité",
      "documentation",
    ],
    importance: "élevée",
  },
  {
    id: "9.1.6",
    titre: "Document des influences externes",
    categorie: "Vérification",
    description: "Traçabilité des influences externes applicables au site.",
    contenu:
      "Le document des influences externes synthétise les contraintes environnementales et d'usage qui conditionnent le choix du matériel et des mesures de protection.",
    mots_cles: [
      "influences externes",
      "document",
      "choix matériel",
      "protection",
      "site",
    ],
    importance: "élevée",
  },
  {
    id: "9.1.7",
    titre: "Plans de zonage",
    categorie: "Vérification",
    description: "Plans des zones particulières de risque ou d'application.",
    contenu:
      "Les plans de zonage doivent être disponibles lorsque requis pour identifier les zones à exigences particulières et appliquer les prescriptions correspondantes.",
    mots_cles: [
      "plans de zonage",
      "zones",
      "risques",
      "prescriptions",
      "documentation",
    ],
    importance: "élevée",
  },
  {
    id: "9.3.2",
    titre: "Travaux électriques - Prescriptions générales",
    categorie: "Protection",
    description:
      "Évaluation des risques, EPI/EPC, organisation et signalisation.",
    explication_profane:
      "Avant de commencer, il faut organiser le chantier électrique: analyser les risques, prévoir les protections et signaler la zone de travail.",
    contenu:
      "Avant travaux, une estimation des risques est exigée. Les moyens de protection collectifs/individuels doivent être adaptés, les défauts dangereux traités sans délai et la signalisation maintenue pendant les travaux.",
    mots_cles: [
      "évaluation des risques",
      "EPI",
      "EPC",
      "signalisation",
      "travaux",
    ],
    importance: "critique",
  },
  {
    id: "9.3.3",
    titre: "Travaux d'exploitation",
    categorie: "Protection",
    description: "Conditions d'exécution des actes d'exploitation.",
    contenu:
      "Les travaux d'exploitation sont réalisés sous responsabilité et avec personnel averti (BA4) ou qualifié (BA5), en appliquant les précautions électriques et procédures adaptées.",
    mots_cles: [
      "travaux d'exploitation",
      "BA4",
      "BA5",
      "responsabilité",
      "précautions",
    ],
    importance: "élevée",
  },
  {
    id: "9.3.4",
    titre: "Procédures de travail",
    categorie: "Protection",
    description: "Préparation, travaux hors tension/sous tension/au voisinage.",
    explication_profane:
      "Les interventions électriques suivent des étapes strictes: préparer, consigner, vérifier l'absence de tension et appliquer la bonne méthode selon le cas.",
    contenu:
      "Les procédures encadrent la préparation des travaux, la consignation, les travaux hors tension, les travaux sous tension et les travaux au voisinage de pièces sous tension.",
    mots_cles: [
      "procédures",
      "hors tension",
      "sous tension",
      "consignation",
      "voisinage",
    ],
    importance: "critique",
  },
  {
    id: "9.3.5",
    titre: "Travaux d'entretien",
    categorie: "Protection",
    description:
      "Organisation des opérations d'entretien, réparation et remplacement.",
    contenu:
      "Les travaux d'entretien sont encadrés par des règles de compétence, de préparation et de clôture des interventions afin de garantir la remise en service en sécurité.",
    mots_cles: [
      "entretien",
      "réparation",
      "remplacement",
      "sécurité",
      "remise en service",
    ],
    importance: "élevée",
  },
  {
    id: "9.3.6",
    titre: "Précautions particulières",
    categorie: "Protection",
    description:
      "Précautions spécifiques notamment au voisinage des lignes et câbles.",
    contenu:
      "Des précautions renforcées sont imposées pour certains contextes, notamment les travaux au voisinage de lignes aériennes et de câbles souterrains.",
    mots_cles: [
      "précautions particulières",
      "lignes aériennes",
      "câbles souterrains",
      "voisinage",
      "travaux",
    ],
    importance: "élevée",
  },
  {
    id: "9.4.2",
    titre: "Panneaux d'interdiction",
    categorie: "Protection",
    description:
      "Signalisation d'interdiction d'accès ou de manœuvre dangereuse.",
    explication_profane:
      "Quand une action est dangereuse (ouvrir, toucher, manœuvrer), un panneau d'interdiction doit être visible pour empêcher l'erreur.",
    contenu:
      "Des panneaux d'interdiction sont placés sur matériels ou accès lorsque l'approche ou le contact est dangereux, y compris dans des cas où le danger n'est pas immédiatement visible.",
    mots_cles: [
      "panneau d'interdiction",
      "danger",
      "accès",
      "manœuvre",
      "signalisation",
    ],
    importance: "élevée",
  },
  {
    id: "9.4.3",
    titre: "Emplacement et dimensions des panneaux",
    categorie: "Protection",
    description:
      "Positionnement et dimensionnement des panneaux de signalisation.",
    explication_profane:
      "Les panneaux doivent être placés au bon endroit et de taille lisible pour être compris immédiatement.",
    contenu:
      "L'emplacement et les dimensions des panneaux sont choisis selon la taille de l'installation ou du matériel concerné et la distance habituelle d'observation.",
    mots_cles: [
      "emplacement",
      "dimensions",
      "panneaux",
      "signalisation",
      "visibilité",
    ],
    importance: "moyenne",
  },
];

const explicationsProfanesSpecifiques = {
  "2.6.1":
    "Le matériel doit être choisi selon l'environnement réel (humidité, poussière, chaleur, chocs). Un appareil mal adapté vieillit mal et devient dangereux.",
  "2.6.2":
    "Les influences externes (eau, corrosion, accès du public, etc.) doivent être identifiées dès la conception pour éviter des protections insuffisantes.",
  "2.6.3":
    "Quand l'environnement change, il faut vérifier que l'installation reste adaptée. Une installation conforme hier peut ne plus l'être aujourd'hui.",
  "2.6.4":
    "Le document des influences externes sert de référence technique: il justifie les choix de matériel et facilite les contrôles futurs.",
  "2.7.1":
    "Les canalisations doivent être posées et protégées de façon à éviter l'arrachement, l'écrasement et les détériorations pendant l'usage normal du bâtiment.",
  "3.1.2":
    "Les documents de l'installation (plans, schémas, repérages) doivent être tenus à jour pour intervenir vite et en sécurité en cas de panne.",
  "3.1.2.1":
    "Le dossier technique doit rester lisible et disponible sur site: sans documents fiables, le diagnostic est plus long et plus risqué.",
  "3.1.3.2":
    "Le repérage clair des circuits et des appareillages évite les erreurs de manœuvre et réduit les risques pendant les interventions.",
  "3.1.3.3":
    "Toute modification doit être reportée sur les schémas. Un plan non à jour crée des confusions dangereuses lors des dépannages.",
  "4.2.3.1":
    "Les masses métalliques accessibles doivent être reliées correctement à la terre pour que le défaut déclenche rapidement la protection.",
  "4.2.5.3":
    "Les liaisons équipotentielles réduisent les différences de potentiel dangereuses. Elles diminuent le risque de choc électrique en cas de défaut.",
  "4.2.5.5":
    "Les liaisons équipotentielles complémentaires sont indispensables dans certains locaux pour renforcer la sécurité des personnes.",
  "4.3.1":
    "En schéma TT, la sécurité dépend fortement de la qualité de la terre et des différentiels. Sans DDR efficace, le risque d'électrocution augmente.",
  "4.3.2":
    "En schéma TN, la continuité du conducteur de protection est essentielle. Une rupture peut rendre les masses métalliques dangereuses.",
  "4.4.1":
    "Les protections contre les surintensités évitent l'échauffement des câbles. Elles limitent les risques d'incendie et de détérioration du matériel.",
  "4.4.2":
    "Le court-circuit doit être coupé très rapidement. Le dispositif de protection doit être assez performant pour interrompre le défaut sans exploser.",
  "4.4.3.1":
    "La surcharge est un excès de courant prolongé: elle chauffe les conducteurs. Le bon réglage des protections évite cette surchauffe.",
  "4.4.3.3":
    "La coordination câble/protection doit être respectée: la protection doit couper avant que l'isolant du câble ne soit endommagé.",
  "4.4.4":
    "Le choix et le réglage des protections doivent être cohérents entre eux pour isoler le défaut sans couper inutilement toute l'installation.",
  "4.4.4.2":
    "La sélectivité améliore le confort et la sécurité: seul le circuit en défaut doit être coupé, pas toute l'habitation ou le site.",
  "4.4.4.4":
    "La coordination entre protections amont/aval évite les déclenchements en cascade et facilite la recherche de panne.",
  "4.6.4":
    "Les matériels installés doivent conserver leurs performances de sécurité pendant toute leur durée de vie, y compris en conditions difficiles.",
  "5.2.1":
    "La section du câble se calcule selon la charge et la pose. Un câble trop fin chauffe, un câble bien dimensionné reste sûr et fiable.",
  "5.2.2":
    "Une chute de tension trop forte fait mal fonctionner les appareils. Respecter les limites évite pertes, échauffements et baisse de performance.",
  "5.3.1":
    "Le mode de pose influence la dissipation thermique des câbles. La même section ne supporte pas le même courant selon l'installation.",
  "5.3.2.2":
    "Les connexions doivent être mécaniquement solides et électriquement fiables. Une mauvaise connexion provoque échauffement et pannes intermittentes.",
  "5.3.2.3":
    "Les conducteurs doivent être raccordés avec du matériel adapté à leur nature et section. Improviser un raccord est une source de danger.",
  "5.3.2.9":
    "Le cheminement des câbles doit limiter les risques de détérioration et faciliter la maintenance. Une pose propre réduit les défauts futurs.",
  "5.3.2.11":
    "Les traversées et passages doivent protéger les câbles contre l'abrasion et les contraintes mécaniques pour éviter les défauts d'isolement.",
  "5.3.3":
    "Avant toute intervention, il faut sécuriser la zone et appliquer les règles de consignation pour supprimer le risque de remise sous tension accidentelle.",
  "5.3.7":
    "Le matériel doit être accessible pour contrôle et remplacement. Une installation impossible à maintenir devient rapidement non conforme.",
  "6.3.1":
    "Seuls des organismes agréés peuvent réaliser certains contrôles RGIE. Cet agrément garantit compétence, méthode et indépendance.",
  "6.4.5":
    "Les essais et mesures de contrôle vérifient que la sécurité réelle correspond aux schémas. Sans mesures, la conformité n'est pas démontrée.",
  "7.1.2":
    "En salle de bain, chaque zone autorise un matériel précis. Plus on est proche de l'eau, plus les exigences sont strictes.",
  "7.2.1":
    "Piscines et bassins augmentent fortement le risque électrique. Les règles spécifiques s'ajoutent aux règles générales pour protéger les usagers.",
  "7.22.1":
    "La recharge de véhicule électrique nécessite un circuit dédié et des protections adaptées. Une prise classique n'est pas une solution durable.",
  "7.22.2":
    "Le point de charge doit être installé dans des conditions d'usage prévues (intérieur/extérieur, humidité, accès). Le choix du matériel est déterminant.",
  "7.22.4.2":
    "La protection différentielle de la borne doit tenir compte des défauts spécifiques de la recharge VE, y compris les composantes continues.",
  "9.1.1":
    "Le propriétaire ou l'exploitant doit organiser la conformité et conserver les documents. Sans suivi, l'installation dérive vite hors cadre RGIE.",
  "9.1.3":
    "Après un contrôle défavorable, les corrections doivent être faites dans les délais. Ignorer une non-conformité maintient un risque réel.",
  "9.1.5":
    "Les canalisations souterraines doivent être localisées et documentées pour éviter les accidents lors de travaux de terrassement.",
  "9.1.6":
    "Le document des influences externes sert à prouver pourquoi le matériel choisi est adapté au site et à ses contraintes.",
  "9.1.7":
    "Les plans de zonage permettent d'identifier immédiatement les zones à risque ou à exigences particulières lors des interventions.",
  "9.3.3":
    "Les travaux d'exploitation exigent des compétences adaptées et une organisation claire. Le niveau BA4/BA5 conditionne les tâches autorisées.",
  "9.3.5":
    "Les travaux d'entretien doivent suivre une méthode stricte: préparation, intervention, contrôles et remise en service sécurisée.",
  "9.3.6":
    "Certaines situations imposent des précautions renforcées, surtout près des lignes aériennes et câbles enterrés, où l'accident peut être grave.",
};

const construireExplicationProfane = (article) => {
  const specifique = explicationsProfanesSpecifiques[article.id];
  if (specifique) {
    return specifique;
  }

  const description = article.description || "";
  const titre = article.titre || "Règle RGIE";

  if (description.length > 0) {
    return `${titre}: ${description} Cette règle vise surtout la sécurité des personnes et la conformité de l'installation.`;
  }

  return `${titre}: cette exigence RGIE doit être appliquée pour garder une installation sûre et conforme.`;
};

const harmoniserTonGrandPublic = (texte, article) => {
  if (!texte || texte.trim().length === 0) {
    return construireExplicationProfane(article);
  }

  const remplacements = [
    [/\bDDR\b/g, "dispositif différentiel (DDR)"],
    [/\bPE\b/g, "conducteur de protection (PE)"],
    [/\bTBTS\b/g, "très basse tension de sécurité (TBTS)"],
    [/\bBA4\/BA5\b/g, "niveaux d'habilitation BA4/BA5"],
    [/\bRGIE\b/g, "RGIE (normes belges)"],
  ];

  let texteHarmonise = texte.trim().replace(/\s+/g, " ");

  remplacements.forEach(([pattern, valeur]) => {
    texteHarmonise = texteHarmonise.replace(pattern, valeur);
  });

  if (!/[.!?]$/.test(texteHarmonise)) {
    texteHarmonise += ".";
  }

  const conseilFinal =
    article?.importance === "critique"
      ? " En pratique: en cas de doute, coupez l'alimentation et faites intervenir un électricien qualifié."
      : " En pratique: faites vérifier l'installation par un professionnel si vous avez un doute.";

  if (!/En pratique:/i.test(texteHarmonise)) {
    texteHarmonise += conseilFinal;
  }

  return texteHarmonise;
};

const construireExplicationMobile = (article, explicationLongue) => {
  const base =
    explicationLongue && explicationLongue.trim().length > 0
      ? explicationLongue
      : construireExplicationProfane(article);

  const phrase = base
    .replace(/\s+/g, " ")
    .split(/[.!?]/)
    .map((partie) => partie.trim())
    .find((partie) => partie.length > 0);

  const motsSource = (
    phrase || `${article.titre} à appliquer pour la sécurité et la conformité.`
  )
    .replace(/[:;,()]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

  const longueurCible = 16;
  const mots = motsSource.slice(0, longueurCible);

  if (mots.length < 12) {
    const complement = [
      "pour",
      "sécurité",
      "des",
      "personnes",
      "et",
      "conformité",
      "de",
      "l'installation",
    ];
    while (mots.length < 12 && complement.length > 0) {
      mots.push(complement.shift());
    }
  }

  let resume = mots.join(" ").trim();
  resume = resume.charAt(0).toUpperCase() + resume.slice(1);

  if (!/[.!?]$/.test(resume)) {
    resume += ".";
  }

  return resume;
};

export const rgieArticles = baseRgieArticles.map((article) => {
  const explicationSource =
    article.explication_profane && article.explication_profane.trim().length > 0
      ? article.explication_profane
      : construireExplicationProfane(article);

  const explicationGrandPublic = harmoniserTonGrandPublic(
    explicationSource,
    article,
  );

  return {
    ...article,
    explication_profane: explicationGrandPublic,
    explication_profane_mobile: construireExplicationMobile(
      article,
      explicationGrandPublic,
    ),
  };
});

/**
 * Catégories disponibles
 */
export const categories = [
  "Protection",
  "Mise à la terre",
  "Dimensionnement",
  "Vérification",
  "Emplacements spéciaux",
  "Tableaux",
  "Circuits",
  "Chauffage",
  "Mobilité électrique",
];

/**
 * Niveaux d'importance
 */
export const niveauxImportance = {
  critique: "Exigence de sécurité critique - Non-respect = danger",
  élevée: "Exigence importante - Conformité RGIE requise",
  moyenne: "Bonne pratique - Recommandé pour conformité",
};

const rgieData = {
  rgieArticles,
  categories,
  niveauxImportance,
};

export default rgieData;
