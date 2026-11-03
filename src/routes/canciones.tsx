import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Music2, Search } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { albums, songs, catalogYears, findSongs } from "@/data/bts-catalog";

export const Route = createFileRoute("/canciones")({
  head: () => ({ meta: [{ title: "Catálogo de canciones de BTS — ARMY Space" }, { name: "description", content: "Explora la discografía de BTS por álbum y año. Busca canciones, descubre recomendaciones y guarda tus favoritas." }], links: [{ rel: "canonical", href: `${import.meta.env.BASE_URL}canciones` }] }),
  component: Canciones,
});

const filters = ["Todas", "Para empezar", "Energía", "Calma", "Rap", "Emoción", "Mis favoritas"] as const;
const pageSize = 24;
const storageKey = "army-space-favorite-songs";

function Canciones() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todas");
  const [query, setQuery] = useState("");
  const [album, setAlbum] = useState("all");
  const [year, setYear] = useState("all");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageNotice, setStorageNotice] = useState("");
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved)) setFavorites([...new Set(saved.filter((item): item is string => typeof item === "string").map(item => songs.find(song => song.id === item || song.title === item)?.id).filter((id): id is string => !!id))]);
    } catch { setStorageNotice("El guardado local no está disponible. Puedes elegir favoritas durante esta visita."); }
  }, []);
  function toggleFavorite(title: string) {
    const next = favorites.includes(title) ? favorites.filter(item => item !== title) : [...favorites, title];
    setFavorites(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); }
    catch { setStorageNotice("El guardado local no está disponible. Tus favoritas se conservarán solo durante esta visita."); }
  }
  const selectedAlbum = albums.find(item => item.id === album);
  const results = findSongs({ query, album, year, filter, favorites }).sort((a,b) => selectedAlbum
    ? selectedAlbum.tracks.findIndex(track => a.aliases.includes(track)) - selectedAlbum.tracks.findIndex(track => b.aliases.includes(track))
    : Math.max(...b.years)-Math.max(...a.years) || a.title.localeCompare(b.title));
  const pages = Math.max(1, Math.ceil(results.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = results.slice((currentPage-1)*pageSize, currentPage*pageSize);
  useEffect(() => { setPage(1); }, [query, album, year, filter]);
  function reset() { setFilter("Todas"); setQuery(""); setAlbum("all"); setYear("all"); setPage(1); }
  return <>
    <PageHero eyebrow="La música de BTS" title="Una canción para cada etapa" subtitle="Recorre sus álbumes, descubre nuevos sonidos y guarda las canciones que quieras volver a escuchar." />
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="max-w-3xl leading-relaxed text-muted-foreground">Álbumes y sencillos del grupo, lanzamientos japoneses, recopilatorios y un álbum en vivo. Las canciones que se repiten en varios discos aparecen una sola vez; las versiones distintas conservan su propia entrada.</p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-primary"><span className="rounded-full bg-accent px-4 py-2">{songs.length} canciones y versiones</span><span className="rounded-full bg-accent px-4 py-2">{albums.length} lanzamientos</span><span className="rounded-full bg-accent px-4 py-2">2013–2026</span></div>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar canciones por estilo">
        {filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`}>{item}{item === "Mis favoritas" ? ` (${favorites.length})` : ""}</button>)}
      </div>
      <label htmlFor="song-search" className="mt-7 block text-sm font-semibold">Buscar canción o álbum</label>
      <Input id="song-search" type="search" className="mt-2 max-w-lg" placeholder="Por ejemplo: Spring Day" value={query} onChange={event => setQuery(event.target.value)} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold" htmlFor="album-filter">Álbum o lanzamiento<select id="album-filter" value={album} onChange={e => setAlbum(e.target.value)} className="mt-2 block w-full min-w-0 rounded-xl border border-border bg-card p-3 text-sm font-normal"><option value="all">Todos los lanzamientos</option>{albums.map(item => <option key={item.id} value={item.id}>{item.title} · {item.year}</option>)}</select></label>
        <label className="text-sm font-semibold" htmlFor="year-filter">Año del lanzamiento<select id="year-filter" value={year} onChange={e => setYear(e.target.value)} className="mt-2 block w-full rounded-xl border border-border bg-card p-3 text-sm font-normal"><option value="all">Todos los años</option>{catalogYears.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">¿No sabes por dónde empezar? «Para empezar» reúne nuestras nueve recomendaciones. Los filtros de ánimo se aplican a esa selección personal.</p>
      <button type="button" onClick={reset} className="mt-3 text-sm font-semibold text-primary underline">Limpiar filtros</button>
      <p className="mt-3 text-xs text-muted-foreground">Tus favoritas se guardan solo en este navegador. Puedes quitarlas tocando otra vez el corazón.</p>
      {storageNotice && <p role="status" className="mt-2 text-sm text-primary">{storageNotice}</p>}
      <p role="status" className="mt-6 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "canción para explorar" : "canciones para explorar"}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(song => <article key={song.id} className="flex flex-col rounded-3xl border border-border bg-card p-7">
          <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{song.mood ? "Para empezar · " + song.mood : "BTS"}</span><button type="button" onClick={() => toggleFavorite(song.id)} aria-pressed={favorites.includes(song.id)} aria-label={`${favorites.includes(song.id) ? "Quitar" : "Guardar"} ${song.title} ${favorites.includes(song.id) ? "de" : "en"} favoritas`} className="rounded-full p-2 text-primary hover:bg-accent"><Heart className={`h-5 w-5 ${favorites.includes(song.id) ? "fill-current" : ""}`} aria-hidden="true" /></button></div>
          <Music2 className="mt-5 h-7 w-7 text-primary" aria-hidden="true" /><h2 className="mt-3 text-2xl font-bold">{song.title}</h2><p className="mt-2 text-sm text-muted-foreground">{Math.min(...song.years)}{song.cdOnly ? " · Pista de CD físico" : ""}</p>
          <div className="mb-6 mt-4 flex-1 text-sm text-muted-foreground"><p className="font-semibold">Incluida en:</p><ul className="mt-2 space-y-1">{song.albums.map(id => { const release = albums.find(a => a.id === id)!; return <li key={id}><a href={release.source} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">{release.title} · {release.year} ↗</a></li>; })}</ul></div>
          <a href={song.cdOnly ? albums.find(a => a.id === "proof")!.source : `https://open.spotify.com/search/${encodeURIComponent(`BTS ${song.title}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><Search className="h-4 w-4" aria-hidden="true" />{song.cdOnly ? "Ver edición física ↗" : "Buscar en Spotify ↗"}<span className="sr-only">: {song.title}</span></a>
        </article>)}
      </div>
      {!results.length && <div className="mt-8 rounded-3xl bg-secondary p-8 text-center"><p>{filter === "Mis favoritas" ? "Todavía no hay favoritas que coincidan. Explora las canciones y toca el corazón para guardar alguna." : "No hay coincidencias con esos filtros. Prueba otra búsqueda."}</p><button type="button" onClick={reset} className="mt-4 font-semibold text-primary underline">Ver todas las canciones</button></div>}
      {!!results.length && <nav aria-label="Páginas del catálogo" className="mt-8 flex flex-wrap items-center justify-center gap-5"><button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage-1)} className="rounded-full border border-border px-5 py-2 font-semibold text-primary disabled:opacity-40">Anterior</button><span role="status" className="text-sm">Página {currentPage} de {pages}</span><button type="button" disabled={currentPage === pages} onClick={() => setPage(currentPage+1)} className="rounded-full border border-border px-5 py-2 font-semibold text-primary disabled:opacity-40">Siguiente</button></nav>}
      <details className="mt-10 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground"><summary className="cursor-pointer font-semibold text-foreground">Acerca del catálogo y sus fuentes</summary><p className="mt-3">Listados consultados el 3 de noviembre de 2026 en BIGHIT MUSIC y BTS Japan Official. Cada álbum de las tarjetas enlaza a su ficha oficial. Incluye los 22 lanzamientos del índice global, 17 lanzamientos japoneses, Skool Luv Affair (Special Addition) y COME OVER.</p><p className="mt-2">Las pistas solistas y de subunidades incluidas en discos de BTS forman parte del catálogo. No incluye los discos solistas independientes, todo el archivo de SoundCloud, colaboraciones externas ni todas las ediciones de remixes. El número corresponde a grabaciones agrupadas, no a canciones compuestas únicas.</p><p className="mt-2">El año del filtro es el del lanzamiento: una canción puede aparecer en varios años. Algunas demos de Proof son exclusivas del CD y no tienen enlace de escucha en Spotify.</p><a href="https://bts.ibighit.com/eng/discography/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-primary underline">Discografía oficial de BIGHIT MUSIC ↗</a></details>
      <p className="mt-8 text-sm text-muted-foreground">Los enlaces abren una búsqueda en Spotify. Elige la grabación publicada por BTS.</p>
      <Link to="/discografia" className="mt-5 inline-block font-semibold text-primary hover:underline">¿Te quedaste con ganas de más? Explora sus eras →</Link>
    </section>
  </>;
}
