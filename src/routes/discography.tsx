import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";

const title = "BTS Discography — Albums, Eras and Key Songs";
const description = "Explore the BTS discography: studio albums, the Love Yourself and Map of the Soul series, and hits like Dynamite and Butter.";

export const Route = createFileRoute("/discography")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/discography" },
    ],
    links: [{ rel: "canonical", href: "/discography" }],
  }),
  component: Discography,
});

const albums = [
  { year: 2013, title: "2 Cool 4 Skool", type: "Single album", track: "No More Dream", note: "The debut: raw hip hop and a critique of the school system." },
  { year: 2014, title: "Dark & Wild", type: "Studio album", track: "Danger", note: "Their first full-length Korean album." },
  { year: 2015, title: "The Most Beautiful Moment in Life", type: "EP series", track: "I NEED U · RUN", note: "The HYYH era: youth, pain and their first big breakthrough." },
  { year: 2016, title: "Wings", type: "Studio album", track: "Blood Sweat & Tears", note: "Inspired by Hermann Hesse’s Demian, with a solo from each member." },
  { year: 2017, title: "Love Yourself: Her", type: "EP", track: "DNA", note: "Their Billboard 200 debut and the start of the Love Yourself series." },
  { year: 2018, title: "Love Yourself: Tear / Answer", type: "Album / compilation", track: "FAKE LOVE · IDOL", note: "Their first #1 on the Billboard 200." },
  { year: 2020, title: "Map of the Soul: 7", type: "Studio album", track: "ON", note: "An album about embracing the shadow and the ego." },
  { year: 2020, title: "BE", type: "Studio album", track: "Life Goes On · Dynamite", note: "Made during the pandemic; Dynamite gave them their first Hot 100 #1 and a Grammy nomination." },
  { year: 2021, title: "Butter / Permission to Dance", type: "Singles", track: "Butter", note: "Butter spent 10 weeks at #1 on the Hot 100." },
  { year: 2022, title: "Proof", type: "Anthology", track: "Yet To Come", note: "A celebration of 9 years together before their solo chapter." },
];

const stats = [
  ["9", "studio albums"],
  ["6", "Billboard Hot 100 #1s"],
  ["5", "Grammy nominations"],
  ["2013", "debut year"],
];

function Discography() {
  return (
    <>
      <PageHero eyebrow="Discography" title="A Decade of Music" subtitle="From the hip hop sound of their debut to global pop: these are the eras that defined BTS." />
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 pt-16 sm:px-6 md:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={l} className="rounded-3xl bg-secondary p-6 text-center">
            <p className="font-display text-4xl font-extrabold text-primary">{n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Timeline</h2>
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
                <p className="mt-3 text-sm font-medium text-primary">🎵 Key song: {a.track}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
