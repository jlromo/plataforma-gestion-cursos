import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plataforma de Gestión de Cursos",
  description: "Dashboard de cursos, temario y recursos de enseñanza",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
        <header className="border-b border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <a href="/" className="text-lg font-semibold tracking-tight">
              Plataforma de Gestión de Cursos
            </a>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              División de Ciencias Forestales · Universidad Autónoma Chapingo
            </p>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
