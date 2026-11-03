import { createFileRoute, Link } from "@tanstack/react-router";
import { Music, Sparkles, Heart, Users, Disc3, ArrowRight, BookOpen, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPOTIFY_URL } from "@/components/SiteLayout";

const title = "ARMY Space — Tu primera guía de BTS";
const description = "Un espacio para compartir la música de BTS, encontrar inspiración y conectar como ARMY. Conoce a los miembros y explora su discografía.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: "Música, inspiración y comunidad: un espacio de fans dedicado a BTS." },
      { property: "og:url", content: `${import.meta.env.BASE_URL}` },
    ],
    links: [{ rel: "canonical", href: `${import.meta.env.BASE_URL}` }],
  }),
  component: Index,
});

const features = [
  { icon: Music, title: "Música que nos acompaña", text: "Canciones para celebrar, encontrar calma y sentirnos comprendidos en distintas etapas de la vida." },
  { icon: Sparkles, title: "Pasión que nos inspira", text: "La creatividad y dedicación de los siete nos animan a aprender, expresarnos y perseguir nuestras metas." },
  { icon: Heart, title: "Una comunidad para compartir", text: "Ser ARMY también es conectar, apoyar a BTS y crear recuerdos con personas que comparten este cariño." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/10" aria-hidden />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary-foreground/10" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 fade-up">
          <h1 className="text-5xl font-extrabold leading-tight sm:text-7xl">Tu primer paso al universo BTS</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90 sm:text-xl">
            Conoce a los siete, encuentra canciones que conecten contigo y descubre este mundo a tu ritmo.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/empieza-aqui"><Compass /> Empieza aquí</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/canciones"><Music /> Encuentra tu canción</Link>
            </Button>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="rounded-3xl border border-primary/15 bg-accent p-7 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">De ARMY para ARMY</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">La guía que me habría gustado encontrar al llegar</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-accent-foreground">Soy Daniela, ARMY desde 2021. Creé este espacio para acompañarte en tus primeros pasos con BTS: descubrir su música, conocer a los siete y explorar a tu ritmo.</p>
          <p className="mt-3 text-sm text-muted-foreground">No necesitas saberlo todo, comprar álbumes ni elegir un bias para disfrutar de BTS. Aquí puedes empezar por curiosidad.</p>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { to: "/empieza-aqui" as const, icon: Compass, title: "Empieza sin perderte", text: "Un recorrido sencillo con cuatro pasos y enlaces oficiales." },
            { to: "/canciones" as const, icon: Music, title: "Encuentra tu sonido", text: "Explora canciones por álbum y año, y guarda tus favoritas." },
            { to: "/guia-army" as const, icon: BookOpen, title: "Habla un poquito de ARMY", text: "Bias, OT7, comeback… Un glosario para entender la conversación." },
          ].map(card => <Link key={card.to} to={card.to} className="lift rounded-3xl border border-border bg-card p-7"><card.icon className="h-7 w-7 text-primary" aria-hidden="true" /><h3 className="mt-4 text-xl font-bold">{card.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.text}</p><span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">Descubrir<ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Lo que nos une</h2>
          <p className="mt-4 text-muted-foreground">Más que canciones: momentos, inspiración y una comunidad para compartirlos.</p>
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
          { to: "/discografia" as const, icon: Disc3, title: "Discografía de BTS", text: "De 2 Cool 4 Skool a ARIRANG: álbumes, eras y canciones clave." },
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
