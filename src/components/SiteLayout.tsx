import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Heart, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SPOTIFY_URL = "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/empieza-aqui", label: "Empieza aquí" },
  { to: "/miembros", label: "Miembros" },
  { to: "/canciones", label: "Canciones" },
  { to: "/discografia", label: "Discografía" },
  { to: "/guia-army", label: "Glosario" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Menú principal">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <Heart className="h-5 w-5 fill-current" aria-hidden /> ARMY Space
        </Link>
        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild className="hidden rounded-full xl:inline-flex">
          <a href={SPOTIFY_URL} target="_blank" rel="noreferrer">Escuchar en Spotify</a>
        </Button>
        <button
          className="rounded-md p-2 text-foreground xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 xl:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: true }}
                  className="block rounded-lg px-3 py-3 font-medium text-foreground hover:bg-accent data-[status=active]:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild className="w-full rounded-full">
            <a href={SPOTIFY_URL} target="_blank" rel="noreferrer">Escuchar en Spotify</a>
          </Button>
        </div>
      )}
    </header>
  );
}

const cols = [
  { title: "Explora", items: [["Inicio", "/"], ["Miembros de BTS", "/miembros"], ["Discografía", "/discografia"]] },
  { title: "Tu primera guía", items: [["Empieza aquí", "/empieza-aqui"], ["Canciones para empezar", "/canciones"], ["Glosario ARMY", "/guia-army"]] },
  { title: "Contacto", items: [["Escríbenos", "/contacto"]] },
  { title: "Música", items: [["BTS en Spotify", SPOTIFY_URL]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4">
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{c.title}</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {c.items.map(([label, to]) => (
                <li key={label}>
                  {to.startsWith("https://") ? (
                    <a href={to} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-100 hover:underline">{label}</a>
                  ) : (
                    <Link to={to} className="transition-opacity hover:opacity-100 hover:underline">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-ink-foreground/15 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p className="opacity-70">© {new Date().getFullYear()} ARMY Space · Creado por Daniela, ARMY desde 2021 💜 · Sitio de fans no oficial</p>
        <div className="flex gap-4">
          <a href="https://twitter.com/BTS_twt" aria-label="Twitter" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100"><Twitter className="h-5 w-5" /></a>
          <a href="https://www.instagram.com/bts.bighitofficial/" aria-label="Instagram" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100"><Instagram className="h-5 w-5" /></a>
          <a href="https://www.youtube.com/@BTS" aria-label="YouTube" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100"><Youtube className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-hero text-primary-foreground">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10" aria-hidden />
      <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-primary-foreground/10" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 fade-up">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest opacity-90">{eyebrow}</p>
        <h1 className="text-4xl font-extrabold sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg opacity-90">{subtitle}</p>
      </div>
    </section>
  );
}
