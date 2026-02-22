import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { DiagnosticForm } from "./DiagnosticForm";

type Mode = "pedagogique" | "strict";

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

export function DiagnosticPage({ mode }: { mode: Mode }) {
  const isStrict = mode === "strict";

  const title = isStrict ? "Mode strict" : "Mode pédagogique";
  const subtitle = isStrict
    ? "Évaluation stricte orientée conformité et criticité"
    : "Évaluation guidée orientée apprentissage et correction";

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
                {title} · Belgique
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
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold
              text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            ← Retour au dashboard
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            {title}
          </h2>
          <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <DiagnosticForm />

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
