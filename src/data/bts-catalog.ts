import releases from "./bts-releases.json";

export const normalize = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const albums = [...releases].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
export type Song = { id: string; title: string; albums: string[]; years: number[]; aliases: string[]; cdOnly: boolean; mood?: string };
const aliases: Record<string, string> = {
  "Singularity": "Intro : Singularity", "Her": "Outro : Her", "Tear": "Outro : Tear",
  "Yet To Come (The Most Beautiful Moment)": "Yet To Come", "So 4 more": "2nd Grade",
  "Don' t Leave Me": "Don't Leave Me", "IDOL (Remix)": "IDOL (Stadium Remix)",
  "House OF Cards (full length edition)": "House of Cards (Full Length Edition)",
  "いいね!Pt.2〜あの場所で〜": "いいね！Pt.2～あの場所で～",
};
const recommendations: Record<string, string> = { Dynamite: "Energía", Butter: "Energía", "Spring Day": "Calma", "Life Goes On": "Calma", "MIC Drop": "Rap", "UGH!": "Rap", Mikrokosmos: "Emoción", "Yet To Come": "Emoción", SWIM: "Emoción" };
function canonicalTitle(raw: string) {
  let title = aliases[raw] || raw;
  title = title.replace(/[–—]/g, "-").replace(/\(Japanese Ver\.\)\.?/gi, "-Japanese Ver.-").replace(/\s*-Japanese ver\.-/gi, " -Japanese Ver.-");
  title = title.replace(/DOPE\s*-超ヤベー!-\s*/gi, "DOPE ").replace(/\s+/g, " ").trim();
  return title;
}
function recordingId(title: string, albumId: string) {
  const key = normalize(title).replace(/[’‘]/g, "'").replace(/[^\p{L}\p{N}]/gu, "");
  // Generic interlude names refer to different recordings on different releases.
  return ["intro", "outro", "skit", "interlude"].includes(key) ? `${albumId}:${key}` : key;
}
const catalog = new Map<string, Song>();
for (const album of [...albums].sort((a,b) => a.year-b.year)) {
  for (const raw of album.tracks) {
    const title = canonicalTitle(raw);
    const id = recordingId(title, album.id);
    const existing = catalog.get(id);
    if (existing) {
      if (!existing.albums.includes(album.id)) existing.albums.push(album.id);
      if (!existing.years.includes(album.year)) existing.years.push(album.year);
      if (!existing.aliases.includes(raw)) existing.aliases.push(raw);
    } else catalog.set(id, { id, title, albums: [album.id], years: [album.year], aliases: [raw], cdOnly: album.id === "proof" && album.tracks.indexOf(raw) >= 34 && raw !== "For Youth", mood: recommendations[title] });
  }
}
export const songs = [...catalog.values()];
export const catalogYears = [...new Set(albums.map(a => a.year))].sort((a,b) => b-a);
export function findSongs(options: { query: string; album: string; year: string; filter: string; favorites: string[] }) {
  const query = normalize(options.query.trim());
  return songs.filter(song =>
    (options.filter === "Todas" || (options.filter === "Mis favoritas" ? options.favorites.includes(song.id) : options.filter === "Para empezar" ? !!song.mood : song.mood === options.filter)) &&
    (options.album === "all" || song.albums.includes(options.album)) &&
    (options.year === "all" || song.albums.some(id => albums.some(a => a.id === id && a.year === Number(options.year) && (options.album === "all" || a.id === options.album)))) &&
    (!query || normalize([song.title, ...song.aliases, ...song.albums.map(id => albums.find(a => a.id === id)?.title || "")].join(" ")).includes(query))
  );
}
