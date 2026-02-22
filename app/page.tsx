import Link from "next/link";
import { ThemeToggle } from "./components/ThemeToggle";

// ── Icône éclair (SVG inline serveur) ────────────────────────────────────────
function BoltIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

// ── Badges version ────────────────────────────────────────────────────────────
function VersionBadge({ label }: { label: string }) {
  return (
    <span
      className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px]
      font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    >
      {label}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm
        dark:border-slate-800 dark:bg-slate-900/90"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="text-blue-600 dark:text-blue-400">
              <BoltIcon />
            </span>
            <div>
              <h1 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-lg">
                Moteur Diagnostic RGIE
              </h1>
              <p className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block">
                Dashboard d&apos;entrée · Belgique
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-1.5 sm:flex">
              <VersionBadge label="2020" />
              <VersionBadge label="2023" />
              <VersionBadge label="2025" />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Choisir un mode de diagnostic
          </h2>
          <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Sélectionnez le mode souhaité pour démarrer votre analyse RGIE.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/pedagogique"
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow
              dark:border-slate-700 dark:bg-slate-900"
          >
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Mode pédagogique
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
              Guidé et explicatif
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Idéal pour apprendre: priorités de correction, questions de suivi
              et compréhension des non-conformités.
            </p>
          </Link>

          <Link
            href="/strict"
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow
              dark:border-slate-700 dark:bg-slate-900"
          >
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Mode strict
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
              Contrôle orienté conformité
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Pour un verdict ferme et rapide, focalisé sur la conformité et la
              criticité des écarts détectés.
            </p>
          </Link>
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="text-center text-xs text-slate-400 dark:text-slate-600">
            Moteur RGIE · Next.js App Router · Architecture DDD Hexagonale ·
            TypeScript strict
          </p>
        </footer>
      </main>
    </div>
  );
}
