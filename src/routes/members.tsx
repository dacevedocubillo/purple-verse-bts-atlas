import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";

const title = "BTS Members — RM, Jin, SUGA, j-hope, Jimin, V y Jung Kook";
const description = "Meet the 7 members of BTS: real names, birthdays, roles in the group and their solo projects.";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/members" },
    ],
    links: [{ rel: "canonical", href: "/members" }],
  }),
  component: Members,
});

const members = [
  { stage: "RM", name: "Kim Namjoon", born: "12 Sep 1994", place: "Ilsan, Goyang", role: "Leader, main rapper", solo: "Indigo (2022), Right Place, Wrong Person (2024)", fact: "He learned much of his English by watching Friends." },
  { stage: "Jin", name: "Kim Seokjin", born: "4 Dec 1992", place: "Gwacheon", role: "Vocalist, visual", solo: "The Astronaut (2022), Happy (2024)", fact: "The oldest member, famous for his dad jokes." },
  { stage: "SUGA", name: "Min Yoongi", born: "9 Mar 1993", place: "Daegu", role: "Main rapper, producer", solo: "D-DAY (2023), mixtapes as Agust D", fact: "Produces music for BTS and other artists like IU and PSY." },
  { stage: "j-hope", name: "Jung Hoseok", born: "18 Feb 1994", place: "Gwangju", role: "Main dancer, rapper", solo: "Jack In The Box (2022), HOPE ON THE STREET (2024)", fact: "First member to headline a Lollapalooza main stage." },
  { stage: "Jimin", name: "Park Jimin", born: "13 Oct 1995", place: "Busan", role: "Main vocalist, dancer", solo: "FACE (2023), MUSE (2024)", fact: "“Like Crazy” was the first Korean solo #1 on the Billboard Hot 100." },
  { stage: "V", name: "Kim Taehyung", born: "30 Dec 1995", place: "Daegu", role: "Vocalist, visual", solo: "Layover (2023)", fact: "His deep baritone is one of the most recognizable voices in the group." },
  { stage: "Jung Kook", name: "Jeon Jungkook", born: "1 Sep 1997", place: "Busan", role: "Main vocalist, maknae", solo: "GOLDEN (2023), “Seven”", fact: "Sang “Dreamers” at the 2022 Qatar World Cup opening ceremony." },
];

function Members() {
  return (
    <>
      <PageHero eyebrow="Bangtan Sonyeondan · 방탄소년단" title="The 7 Members of BTS" subtitle="Seven personalities, one voice. They debuted on June 13, 2013 under Big Hit Music." />
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
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Born</dt><dd className="text-right font-medium">{m.born}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Hometown</dt><dd className="text-right font-medium">{m.place}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Role</dt><dd className="text-right font-medium">{m.role}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Solo work</dt><dd className="text-right font-medium">{m.solo}</dd></div>
              </dl>
              <p className="mt-5 rounded-2xl bg-accent p-4 text-sm text-accent-foreground">💜 {m.fact}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
