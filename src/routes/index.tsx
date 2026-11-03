import { createFileRoute, Link } from "@tanstack/react-router";
import { Music, Sparkles, Heart, Users, Disc3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPOTIFY_URL } from "@/components/SiteLayout";

const title = "ARMY Space — Descubre el universo BTS";
const description = "Descubre por qué BTS es mi pasatiempo favorito: su música, su baile y su mensaje de Love Myself. Conoce a los miembros y explora su discografía.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: "Música, baile y el mensaje de Love Myself: un espacio de fans dedicado a BTS." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const features = [
  { icon: Music, title: "La música", text: "Melodías cautivadoras, una producción impecable y letras profundas sobre crecer, dudar y soñar." },
  { icon: Sparkles, title: "El baile", text: "Coreografías complejas y perfectamente sincronizadas que te invitan a moverte, practicar y expresarte." },
  { icon: Heart, title: "El mensaje", text: "La campaña Love Myself con UNICEF y su impacto positivo en la salud mental de millones de fans." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/10" aria-hidden />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary-foreground/10" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 fade-up">
          <h1 className="text-5xl font-extrabold leading-tight sm:text-7xl">Descubre el universo BTS</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90 sm:text-xl">
            Su música es un lugar seguro: te ayuda a conectar contigo, a encontrar consuelo en los días difíciles y a celebrar quién eres.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/miembros"><Users /> Conoce a los miembros</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/discografia"><Disc3 /> Ver discografía</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Por qué es mi pasatiempo favorito</h2>
          <p className="mt-4 text-muted-foreground">Tres razones por las que BTS pasó a formar parte de mi día a día.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="lift rounded-3xl border border-border bg-card p-8">
              <div className="mb-5 inline-flex rounded-2xl bg-accent p-3 text-primary"><f.icon /></div>
              <h3 className="text-xl font-bold">{f.title}</h3>
              <p className="mt-3 text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-24 sm:px-6 md:grid-cols-2">
        {[
          { to: "/miembros" as const, icon: Users, title: "Miembros de BTS", text: "RM, Jin, SUGA, j-hope, Jimin, V y Jung Kook: roles, datos y proyectos en solitario." },
          { to: "/discografia" as const, icon: Disc3, title: "Discografía de BTS", text: "De 2 Cool 4 Skool a Proof: álbumes, eras y canciones clave." },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="lift group rounded-3xl bg-secondary p-8">
            <c.icon className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">{c.title}</h2>
            <p className="mt-2 text-muted-foreground">{c.text}</p>
            <span className="mt-5 inline-flex items-center gap-1 font-semibold text-primary">Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        ))}
      </section>

      <section className="bg-deep text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-5xl">¿Quieres unirte al fandom?</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Empieza por escuchar. Te esperamos con los brazos abiertos, ARMY.</p>
          <Button asChild size="lg" variant="secondary" className="mt-8 h-14 rounded-full px-10 text-base">
            <a href={SPOTIFY_URL} target="_blank" rel="noreferrer">Escuchar en Spotify</a>
          </Button>
        </div>
      </section>
    </>
  );
}
