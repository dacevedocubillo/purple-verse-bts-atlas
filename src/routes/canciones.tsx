import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Music2, Search } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/canciones")({
  head: () => ({ meta: [{ title: "Tu primera canción de BTS — ARMY Space" }, { name: "description", content: "Explora canciones de BTS por estilo, encuentra tu punto de partida y guarda tus favoritas en este navegador." }], links: [{ rel: "canonical", href: `${import.meta.env.BASE_URL}canciones` }] }),
  component: Canciones,
});

const songs = [
  { title: "Dynamite", mood: "Energía", description: "Un punto de partida luminoso si te gusta el pop con ganas de bailar." },
  { title: "Butter", mood: "Energía", description: "Para descubrir su lado más ligero y acompañar un día con ritmo." },
  { title: "Spring Day", mood: "Calma", description: "Una invitación a bajar el ritmo y dejar que una melodía te acompañe." },
  { title: "Life Goes On", mood: "Calma", description: "Para una escucha tranquila, sin prisa y con espacio para respirar." },
  { title: "MIC Drop", mood: "Rap", description: "Una entrada con fuerza para quienes disfrutan del rap y la energía sobre el escenario." },
  { title: "UGH!", mood: "Rap", description: "Para seguir explorando el rap de RM, SUGA y j-hope. Una recomendación de escucha intensa." },
  { title: "Mikrokosmos", mood: "Emoción", description: "Para ese momento en que quieres una canción que se sienta compartida." },
  { title: "Yet To Come", mood: "Emoción", description: "Una puerta a los recuerdos del grupo y a todo lo que queda por descubrir." },
  { title: "SWIM", mood: "Emoción", description: "El punto de partida para conocer ARIRANG y explorar la etapa de 2026." },
] as const;
const filters = ["Todas", "Energía", "Calma", "Rap", "Emoción", "Mis favoritas"] as const;
const storageKey = "army-space-favorite-songs";
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Canciones() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todas");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageNotice, setStorageNotice] = useState("");
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved)) setFavorites(saved.filter((item): item is string => typeof item === "string" && songs.some(song => song.title === item)));
    } catch { setStorageNotice("El guardado local no está disponible. Puedes elegir favoritas durante esta visita."); }
  }, []);
  function toggleFavorite(title: string) {
    const next = favorites.includes(title) ? favorites.filter(item => item !== title) : [...favorites, title];
    setFavorites(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); }
    catch { setStorageNotice("El guardado local no está disponible. Tus favoritas se conservarán solo durante esta visita."); }
  }
  const results = songs.filter(song => (filter === "Todas" || (filter === "Mis favoritas" ? favorites.includes(song.title) : song.mood === filter)) && normalize(song.title).includes(normalize(query.trim())));
  return <>
    <PageHero eyebrow="Encuentra tu primera canción" title="¿Qué te gustaría escuchar hoy?" subtitle="No hay una canción correcta para empezar. Encuentra la que conecte contigo." />
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="max-w-3xl leading-relaxed text-muted-foreground">Esta es una selección personal para descubrir distintos sonidos, no un ranking ni una lista completa. Las sensaciones son subjetivas: explora y encuentra las tuyas.</p>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar canciones por estilo">
        {filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`}>{item}{item === "Mis favoritas" ? ` (${favorites.length})` : ""}</button>)}
      </div>
      <label htmlFor="song-search" className="mt-7 block text-sm font-semibold">Buscar una canción de esta selección</label>
      <Input id="song-search" type="search" className="mt-2 max-w-lg" placeholder="Por ejemplo: Spring Day" value={query} onChange={event => setQuery(event.target.value)} />
      <p className="mt-3 text-xs text-muted-foreground">Tus favoritas se guardan solo en este navegador. Puedes quitarlas tocando otra vez el corazón.</p>
      {storageNotice && <p role="status" className="mt-2 text-sm text-primary">{storageNotice}</p>}
      <p role="status" className="mt-6 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "canción para explorar" : "canciones para explorar"}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(song => <article key={song.title} className="flex flex-col rounded-3xl border border-border bg-card p-7">
          <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{song.mood}</span><button type="button" onClick={() => toggleFavorite(song.title)} aria-pressed={favorites.includes(song.title)} aria-label={`${favorites.includes(song.title) ? "Quitar" : "Guardar"} ${song.title} ${favorites.includes(song.title) ? "de" : "en"} favoritas`} className="rounded-full p-2 text-primary hover:bg-accent"><Heart className={`h-5 w-5 ${favorites.includes(song.title) ? "fill-current" : ""}`} aria-hidden="true" /></button></div>
          <Music2 className="mt-5 h-7 w-7 text-primary" aria-hidden="true" /><h2 className="mt-3 text-2xl font-bold">{song.title}</h2><p className="mb-6 mt-3 flex-1 leading-relaxed text-muted-foreground">{song.description}</p>
          <a href={`https://open.spotify.com/search/${encodeURIComponent(`BTS ${song.title}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><Search className="h-4 w-4" aria-hidden="true" />Buscar en Spotify ↗<span className="sr-only">: {song.title}</span></a>
        </article>)}
      </div>
      {!results.length && <div className="mt-8 rounded-3xl bg-secondary p-8 text-center"><p>{filter === "Mis favoritas" ? "Todavía no hay favoritas que coincidan. Explora las canciones y toca el corazón para guardar alguna." : "No hay coincidencias con esos filtros. Prueba otra búsqueda."}</p><button type="button" onClick={() => { setFilter("Todas"); setQuery(""); }} className="mt-4 font-semibold text-primary underline">Ver todas las canciones</button></div>}
      <p className="mt-8 text-sm text-muted-foreground">Los enlaces abren una búsqueda en Spotify. Elige la grabación publicada por BTS.</p>
      <Link to="/discografia" className="mt-5 inline-block font-semibold text-primary hover:underline">¿Te quedaste con ganas de más? Explora sus eras →</Link>
    </section>
  </>;
}
