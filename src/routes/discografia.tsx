import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";

const title = "Discografía de BTS — Álbumes, eras y canciones clave";
const description = "Recorre la discografía de BTS: álbumes de estudio, la saga Love Yourself y Map of the Soul, y los éxitos Dynamite, Butter y más.";

export const Route = createFileRoute("/discografia")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/discografia" },
    ],
    links: [{ rel: "canonical", href: "/discografia" }],
  }),
  component: Discography,
});

const albums = [
  { year: 2013, title: "2 Cool 4 Skool", type: "Single album", track: "No More Dream", note: "El debut: hip hop crudo y crítica al sistema escolar." },
  { year: 2014, title: "Dark & Wild", type: "Álbum de estudio", track: "Danger", note: "Su primer álbum completo en coreano." },
  { year: 2015, title: "The Most Beautiful Moment in Life", type: "Serie EP", track: "I NEED U · RUN", note: "La era HYYH: juventud, dolor y el primer gran salto." },
  { year: 2016, title: "Wings", type: "Álbum de estudio", track: "Blood Sweat & Tears", note: "Inspirado en Demian de Hermann Hesse, con solos de cada miembro." },
  { year: 2017, title: "Love Yourself: Her", type: "EP", track: "DNA", note: "Debutan en el Billboard 200 y comienza la saga Love Yourself." },
  { year: 2018, title: "Love Yourself: Tear / Answer", type: "Álbum / compilación", track: "FAKE LOVE · IDOL", note: "Su primer #1 en el Billboard 200." },
  { year: 2020, title: "Map of the Soul: 7", type: "Álbum de estudio", track: "ON", note: "Un álbum sobre aceptar la sombra y el ego." },
  { year: 2020, title: "BE", type: "Álbum de estudio", track: "Life Goes On · Dynamite", note: "Creado en pandemia; Dynamite les dio su primer #1 en el Hot 100 y una nominación al Grammy." },
  { year: 2021, title: "Butter / Permission to Dance", type: "Singles", track: "Butter", note: "Butter pasó 10 semanas en el #1 del Hot 100." },
  { year: 2022, title: "Proof", type: "Antología", track: "Yet To Come", note: "Celebración de 9 años de carrera antes de la etapa solista." },
];

const stats = [
  ["9", "álbumes de estudio"],
  ["6", "#1 en el Billboard Hot 100"],
  ["5", "nominaciones al Grammy"],
  ["2013", "año de debut"],
];

function Discography() {
  return (
    <>
      <PageHero eyebrow="Discografía" title="Una década de música" subtitle="De los sonidos hip hop de su debut al pop global: estas son las eras que definieron a BTS." />
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 pt-16 sm:px-6 md:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={l} className="rounded-3xl bg-secondary p-6 text-center">
            <p className="font-display text-4xl font-extrabold text-primary">{n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Cronología</h2>
        <ol className="relative space-y-8 border-l-2 border-accent pl-8">
          {albums.map((a) => (
            <li key={a.title} className="relative">
              <span className="absolute -left-[41px] top-6 h-4 w-4 rounded-full bg-hero ring-4 ring-background" aria-hidden />
              <article className="lift rounded-3xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">{a.year}</span>
                  <span className="text-muted-foreground">{a.type}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold">{a.title}</h3>
                <p className="mt-2 text-muted-foreground">{a.note}</p>
                <p className="mt-3 text-sm font-medium text-primary">🎵 Canción clave: {a.track}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
