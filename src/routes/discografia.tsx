import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";

const title = "Discografía de BTS — Álbumes, eras y canciones clave";
const description = "Explora la discografía de BTS: álbumes de estudio, las series Love Yourself y Map of the Soul, ARIRANG (2026) y éxitos como Dynamite y Butter.";

export const Route = createFileRoute("/discografia")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${import.meta.env.BASE_URL}discografia` },
    ],
    links: [{ rel: "canonical", href: `${import.meta.env.BASE_URL}discografia` }],
  }),
  component: Discografia,
});

const albums = [
  { year: 2013, title: "2 Cool 4 Skool", type: "Sencillo de álbum", track: "No More Dream", note: "El debut: hip hop crudo y una crítica al sistema educativo." },
  { year: 2014, title: "Dark & Wild", type: "Álbum de estudio", track: "Danger", note: "Su primer álbum coreano de larga duración." },
  { year: 2015, title: "The Most Beautiful Moment in Life", type: "Serie de EP", track: "I NEED U · RUN", note: "La era HYYH: juventud, dolor y su primer gran salto." },
  { year: 2016, title: "Wings", type: "Álbum de estudio", track: "Blood Sweat & Tears", note: "Inspirado en Demian de Hermann Hesse, con un solo de cada miembro." },
  { year: 2017, title: "Love Yourself: Her", type: "EP", track: "DNA", note: "Su debut en el Billboard 200 y el inicio de la serie Love Yourself." },
  { year: 2018, title: "Love Yourself: Tear / Answer", type: "Álbum / compilatorio", track: "FAKE LOVE · IDOL", note: "Su primer #1 en el Billboard 200." },
  { year: 2020, title: "Map of the Soul: 7", type: "Álbum de estudio", track: "ON", note: "Un álbum sobre abrazar la sombra y el ego." },
  { year: 2020, title: "BE", type: "Álbum de estudio", track: "Life Goes On · Dynamite", note: "Hecho durante la pandemia; Dynamite les dio su primer #1 en el Hot 100 y una nominación al Grammy." },
  { year: 2021, title: "Butter / Permission to Dance", type: "Sencillos", track: "Butter", note: "Butter pasó 10 semanas en el #1 del Hot 100." },
  { year: 2022, title: "Proof", type: "Antología", track: "Yet To Come", note: "La celebración de 9 años juntos antes de su etapa en solitario." },
  { year: 2026, title: "ARIRANG", type: "Álbum de estudio", track: "SWIM", note: "Publicado el 20 de marzo de 2026. Sus 14 canciones abren una nueva etapa para BTS, con un título que conecta con sus raíces coreanas." },
];

const stats = [
  { value: String(albums.length), label: "hitos en esta selección", detail: "Álbumes, sencillos y eras", source: null },
  { value: "7", label: "canciones nº 1 en el Hot 100", detail: "Incluye SWIM (2026)", source: "https://www.korea.net/NewsFocus/Culture/view?articleId=289860" },
  { value: "5", label: "nominaciones al Grammy", detail: "Nominaciones del grupo", source: "https://live.grammy.com/artists/bts/287749/" },
  { value: "2013", label: "debut de BTS", detail: "13 de junio", source: null },
];

function Discografia() {
  return (
    <>
      <PageHero eyebrow="Discografía" title="Cada álbum, una historia" subtitle="Un recorrido por la música de BTS, desde sus primeros pasos hasta ARIRANG." />
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 pt-16 sm:px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center rounded-3xl border border-primary/10 bg-secondary p-6 text-center">
            <p className="font-display text-4xl font-extrabold text-primary">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold">{stat.label}</p>
            <p className="mt-2 text-xs text-muted-foreground">{stat.detail}</p>
            {stat.source && <a href={stat.source} target="_blank" rel="noopener noreferrer" className="mt-3 text-xs font-medium text-primary underline underline-offset-4">Ver fuente<span className="sr-only"> de {stat.label} (abre en otra pestaña)</span></a>}
          </div>
        ))}
        <p className="col-span-full text-center text-xs text-muted-foreground">Esta cronología es una selección, no el catálogo completo. Cifras revisadas el 2 de noviembre de 2026.</p>
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
