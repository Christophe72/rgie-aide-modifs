import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moteur Diagnostic RGIE",
  description: "Vérification de conformité électrique RGIE 2020 / 2023 / 2025 — diagnostic intelligent et guidé",
};

// Script injecté avant le paint pour éviter le flash de mode clair sur rechargement
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('rgie-theme');
    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && d)) document.documentElement.classList.add('dark');
  } catch(e){}
})();
`.trim();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Injection synchrone — élimine le FOUC (flash of unstyled content) */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
