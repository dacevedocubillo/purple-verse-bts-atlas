import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/guia-army")({
  head: () => ({ meta: [{ title: "Glosario ARMY — Palabras para empezar" }, { name: "description", content: "Qué significan bias, OT7, comeback, maknae y otras palabras que escucharás como nueva ARMY." }], links: [{ rel: "canonical", href: `${import.meta.env.BASE_URL}guia-army` }] }),
  component: GuiaArmy,
});

const terms = [
  { word: "ARMY", meaning: "Es el nombre del fandom de BTS. Cuando alguien dice «soy ARMY», está compartiendo su cariño por el grupo." },
  { word: "Bangtan", meaning: "Una forma abreviada de Bangtan Sonyeondan, el nombre coreano de BTS. Se usa para hablar del mismo grupo." },
  { word: "Bias", meaning: "El miembro por el que sientes una afinidad especial. Puedes tener uno, varios o ninguno, y puede cambiar con el tiempo." },
  { word: "Bias wrecker", meaning: "Ese otro miembro que te llama tanto la atención que te hace dudar de tu bias. Es una expresión divertida del fandom." },
  { word: "OT7", meaning: "Una expresión para mostrar cariño y apoyo a los siete miembros como grupo. Tener un bias y apoyar a los siete puede ir de la mano." },
  { word: "Comeback", meaning: "En el K-pop se usa para una nueva etapa de lanzamientos y promociones. No significa necesariamente que el artista se haya separado o retirado." },
  { word: "Era", meaning: "La etapa asociada a un lanzamiento: su música, concepto visual, actuaciones y recuerdos. Por ejemplo, la era de Love Yourself." },
  { word: "Maknae", meaning: "Una palabra coreana para el menor de un grupo. En BTS, el maknae es Jungkook." },
  { word: "Fanchant", meaning: "Una secuencia de nombres o frases que el público corea en momentos concretos de una canción. Puedes aprenderlo si te divierte; no es un requisito." },
  { word: "MV", meaning: "Abreviatura de music video: un video musical. Busca los lanzamientos en los canales oficiales." },
  { word: "Borahae", meaning: "La expresión que suele traducirse como «I purple you». En el fandom se usa para expresar cariño y confianza; de ahí tantos corazones morados." },
  { word: "Weverse", meaning: "Una plataforma con comunidades de artistas, incluida BTS. Allí puedes encontrar publicaciones, avisos y contenido oficial." },
];
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function GuiaArmy() {
  const [query, setQuery] = useState("");
  const results = terms.filter(term => normalize(`${term.word} ${term.meaning}`).includes(normalize(query.trim())));
  return <>
    <PageHero eyebrow="Glosario ARMY" title="¿Bias? ¿OT7? Aquí lo desciframos." subtitle="Una pequeña guía para esas palabras que aparecen en comentarios, videos y conversaciones." />
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <label htmlFor="glossary-search" className="font-semibold">¿Qué palabra buscas?</label>
      <Input id="glossary-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Prueba con bias, comeback o maknae" className="mt-3" />
      <p role="status" className="mt-3 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "término encontrado" : "términos encontrados"}</p>
      <dl className="mt-8 grid gap-5 sm:grid-cols-2">
        {results.map(term => <div key={term.word} className="rounded-3xl border border-border bg-card p-7"><dt className="text-xl font-bold text-primary">{term.word}</dt><dd className="mt-3 leading-relaxed text-muted-foreground">{term.meaning}</dd></div>)}
      </dl>
      {!results.length && <div className="mt-8 rounded-3xl bg-secondary p-8 text-center"><p>No encontramos esa palabra. Prueba con otra o <Link to="/contacto" className="font-semibold text-primary underline">cuéntanos cuál falta</Link>.</p></div>}
      <aside className="mt-10 rounded-3xl bg-accent p-7 text-accent-foreground"><h2 className="text-xl font-bold">Tu forma de ser ARMY también cuenta</h2><p className="mt-3">No hay examen de ingreso. Disfruta de la música a tu ritmo, respeta la privacidad de los artistas y a las demás personas, y contrasta los rumores con fuentes oficiales.</p></aside>
      <Link to="/canciones" className="mt-8 inline-block font-semibold text-primary hover:underline">Ahora sí, vamos a la música →</Link>
    </section>
  </>;
}
