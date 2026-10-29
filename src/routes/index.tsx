import { createFileRoute, Link } from "@tanstack/react-router";
import { Music, Sparkles, Heart, Users, Disc3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPOTIFY_URL } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARMY Space — Discover the BTS Universe" },
      { name: "description", content: "Discover why BTS is my favorite hobby: their music, their dance and their Love Myself message. Meet the members and explore their discography." },
      { property: "og:title", content: "ARMY Space — Discover the BTS Universe" },
      { property: "og:description", content: "Music, dance and the Love Myself message: a fan space dedicated to BTS." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const features = [
  { icon: Music, title: "The Music", text: "Captivating melodies, flawless production and deep lyrics about growing up, doubting and dreaming." },
  { icon: Sparkles, title: "The Dance", text: "Complex, perfectly synced choreography that inspires you to move, practice and express yourself." },
  { icon: Heart, title: "The Message", text: "The Love Myself campaign with UNICEF and its positive impact on the mental health of millions of fans." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/10" aria-hidden />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary-foreground/10" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 fade-up">
          <h1 className="text-5xl font-extrabold leading-tight sm:text-7xl">Discover the BTS Universe</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90 sm:text-xl">
            Their music is a safe place: it helps you connect with yourself, find comfort on hard days and celebrate who you are.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/members"><Users /> Meet the members</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/discography"><Disc3 /> View discography</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Why it’s my favorite hobby</h2>
          <p className="mt-4 text-muted-foreground">Three reasons BTS became part of my everyday life.</p>
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
          { to: "/members" as const, icon: Users, title: "BTS Members", text: "RM, Jin, SUGA, j-hope, Jimin, V and Jung Kook: roles, facts and solo projects." },
          { to: "/discography" as const, icon: Disc3, title: "BTS Discography", text: "From 2 Cool 4 Skool to Proof: albums, eras and key songs." },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="lift group rounded-3xl bg-secondary p-8">
            <c.icon className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">{c.title}</h2>
            <p className="mt-2 text-muted-foreground">{c.text}</p>
            <span className="mt-5 inline-flex items-center gap-1 font-semibold text-primary">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        ))}
      </section>

      <section className="bg-deep text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-5xl">Want to join the fandom?</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Start by listening. We’re waiting with open arms, ARMY.</p>
          <Button asChild size="lg" variant="secondary" className="mt-8 h-14 rounded-full px-10 text-base">
            <a href={SPOTIFY_URL} target="_blank" rel="noreferrer">Listen on Spotify</a>
          </Button>
        </div>
      </section>
    </>
  );
}
