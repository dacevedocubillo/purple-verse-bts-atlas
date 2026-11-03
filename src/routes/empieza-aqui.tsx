import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Music, Users, BookOpen } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/empieza-aqui")({
  head: () => ({ meta: [{ title: "Empieza aquí — Tu primera guía BTS" }, { name: "description", content: "Conoce a BTS paso a paso: los siete miembros, canciones para empezar y un glosario ARMY." }], links: [{ rel: "canonical", href: `${import.meta.env.BASE_URL}empieza-aqui` }] }),
  component: EmpiezaAqui,
});

const steps = [
  { number: "01", title: "Ponles nombre a las siete voces", text: "RM, Jin, SUGA, j-hope, Jimin, V y Jung Kook. Conoce sus nombres y explora sus perfiles; no hace falta aprenderlo todo de una vez.", to: "/miembros", action: "Conocer a los siete", icon: Users },
  { number: "02", title: "Encuentra una canción para ti", text: "¿Pop para bailar, rap o algo tranquilo? Empieza por lo que ya te gusta y guarda las canciones que quieras volver a escuchar.", to: "/canciones", action: "Elegir mi primera canción", icon: Music },
  { number: "03", title: "Descifra el idioma ARMY", text: "Bias, OT7, comeback… Si una palabra te suena nueva, aquí tienes una explicación sencilla y sin examen al final.", to: "/guia-army", action: "Abrir el glosario", icon: BookOpen },
  { number: "04", title: "Sigue el hilo de sus eras", text: "Cada lanzamiento abre una puerta distinta. Recorre nuestra selección desde 2 Cool 4 Skool hasta ARIRANG, en el orden que prefieras.", to: "/discografia", action: "Explorar la discografía", icon: Heart },
] as const;

function EmpiezaAqui() {
  return <>
    <PageHero eyebrow="Tu primera guía" title="Llegaste. Lo demás, a tu ritmo." subtitle="No necesitas saberlo todo para disfrutar de BTS. Una canción puede ser un buen comienzo." />
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Antes de empezar</p>
          <h2 className="mt-3 text-3xl font-bold">Siete artistas, muchas formas de conectar</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">BTS es un grupo surcoreano formado por siete miembros que debutó el 13 de junio de 2013. ARMY es el nombre de su fandom: la comunidad que acompaña su música.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Este espacio reúne una primera selección para ayudarte a explorar. No tienes que seguir un orden, comprar álbumes ni elegir un bias para sentirte parte.</p>
          <a href="https://ibighit.com/en/bts/profile/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-medium text-primary underline underline-offset-4">Conocer el perfil oficial de BTS ↗</a>
          <aside className="mt-8 rounded-3xl bg-accent p-7 text-accent-foreground">
            <Heart className="h-6 w-6" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-bold">De una ARMY para otra</h3>
            <p className="mt-3 leading-relaxed">Soy Daniela, ARMY desde 2021. Creé este espacio para acompañarte en tus primeros pasos con BTS: descubrir su música, conocer a los siete y explorar a tu ritmo.</p>
          </aside>
        </div>
        <ol className="space-y-5">
          {steps.map(step => <li key={step.number} className="rounded-3xl border border-border bg-card p-7">
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-primary">PASO {step.number}</span><step.icon className="h-5 w-5 text-primary" aria-hidden="true" /></div>
            <h2 className="mt-3 text-xl font-bold">{step.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{step.text}</p>
            <Link to={step.to} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">{step.action}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </li>)}
        </ol>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <h2 className="text-2xl font-bold">Cuando quieras seguir explorando</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <a href="https://www.youtube.com/@BTS" target="_blank" rel="noopener noreferrer" className="rounded-3xl bg-secondary p-6 hover:bg-accent"><h3 className="font-bold">BANGTANTV ↗</h3><p className="mt-2 text-sm text-muted-foreground">Videos y contenido del canal oficial de BTS en YouTube.</p></a>
        <a href="https://weverse.io/bts" target="_blank" rel="noopener noreferrer" className="rounded-3xl bg-secondary p-6 hover:bg-accent"><h3 className="font-bold">BTS en Weverse ↗</h3><p className="mt-2 text-sm text-muted-foreground">La comunidad oficial. Algunas funciones o contenidos pueden requerir cuenta o membresía.</p></a>
      </div>
    </section>
  </>;
}
