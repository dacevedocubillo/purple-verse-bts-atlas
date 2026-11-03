import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";

const title = "Miembros de BTS — RM, Jin, SUGA, j-hope, Jimin, V y Jung Kook";
const description = "Conoce a los 7 miembros de BTS: nombres reales, cumpleaños, roles en el grupo y sus proyectos en solitario.";

export const Route = createFileRoute("/miembros")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/miembros" },
    ],
    links: [{ rel: "canonical", href: "/miembros" }],
  }),
  component: Miembros,
});

const members = [
  { stage: "RM", name: "Kim Namjoon", born: "12 sep 1994", place: "Ilsan, Goyang", role: "Líder, rapero principal", solo: "Indigo (2022), Right Place, Wrong Person (2024)", fact: "Aprendió gran parte de su inglés viendo Friends." },
  { stage: "Jin", name: "Kim Seokjin", born: "4 dic 1992", place: "Gwacheon", role: "Vocalista, visual", solo: "The Astronaut (2022), Happy (2024)", fact: "El mayor del grupo, famoso por sus chistes de papá." },
  { stage: "SUGA", name: "Min Yoongi", born: "9 mar 1993", place: "Daegu", role: "Rapero principal, productor", solo: "D-DAY (2023), mixtapes como Agust D", fact: "Produce música para BTS y para otros artistas como IU y PSY." },
  { stage: "j-hope", name: "Jung Hoseok", born: "18 feb 1994", place: "Gwangju", role: "Bailarín principal, rapero", solo: "Jack In The Box (2022), HOPE ON THE STREET (2024)", fact: "Fue el primer miembro en encabezar el escenario principal de Lollapalooza." },
  { stage: "Jimin", name: "Park Jimin", born: "13 oct 1995", place: "Busan", role: "Vocalista y bailarina principal", solo: "FACE (2023), MUSE (2024)", fact: "“Like Crazy” fue el primer #1 en solitario de un artista coreano en el Billboard Hot 100." },
  { stage: "V", name: "Kim Taehyung", born: "30 dic 1995", place: "Daegu", role: "Vocalista, visual", solo: "Layover (2023)", fact: "Su grave barrítono es una de las voces más reconocibles del grupo." },
  { stage: "Jung Kook", name: "Jeon Jungkook", born: "1 sep 1997", place: "Busan", role: "Vocalista principal, maknae", solo: "GOLDEN (2023), “Seven”", fact: "Cantó “Dreamers” en la ceremonia de apertura del Mundial Qatar 2022." },
];

function Miembros() {
  return (
    <>
      <PageHero eyebrow="Bangtan Sonyeondan · 방탄소년단" title="Los 7 miembros de BTS" subtitle="Siete personalidades, una sola voz. Debutaron el 13 de junio de 2013 bajo Big Hit Music." />
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <article key={m.stage} className="lift fade-up rounded-3xl border border-border bg-card p-7" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-hero font-display text-lg font-bold text-primary-foreground" aria-hidden>
                  {m.stage.slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{m.stage}</h2>
                  <p className="text-sm text-muted-foreground">{m.name}</p>
                </div>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Nacimiento</dt><dd className="text-right font-medium">{m.born}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Ciudad natal</dt><dd className="text-right font-medium">{m.place}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Rol</dt><dd className="text-right font-medium">{m.role}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Solos</dt><dd className="text-right font-medium">{m.solo}</dd></div>
              </dl>
              <p className="mt-5 rounded-2xl bg-accent p-4 text-sm text-accent-foreground">💜 {m.fact}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
