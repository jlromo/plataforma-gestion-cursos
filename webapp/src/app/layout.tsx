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
      <body className="min-h-full flex flex-col">
        <div className="h-1.5 bg-gradient-to-r from-chapingo-blue-900 via-chapingo-blue-500 to-chapingo-silver-300" />
        <header className="bg-chapingo-blue-900 text-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-chapingo-silver-300 bg-chapingo-blue-800 text-xs font-bold tracking-wide text-chapingo-silver-100">
              UACh
            </span>
            <div>
              <a href="/" className="text-lg font-semibold tracking-tight hover:text-chapingo-silver-100">
                Plataforma de Gestión de Cursos
              </a>
              <p className="text-sm text-chapingo-blue-100">
                División de Ciencias Forestales · Universidad Autónoma Chapingo
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
