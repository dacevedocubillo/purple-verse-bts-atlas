import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { albums, songs, findSongs } from "@/data/bts-catalog";
vi.mock("@tanstack/react-router", async original => ({ ...await original<typeof import("@tanstack/react-router")>(), Link: ({to, children}: {to: string; children: ReactNode}) => <a href={to}>{children}</a> }));
import { Route } from "@/routes/canciones";
const Songs = Route.options.component as ComponentType;
const options = { query: "", album: "all", year: "all", filter: "Todas", favorites: [] };
afterEach(() => { cleanup(); localStorage.clear(); });
describe("BTS catalog", () => {
  it("retains all release track counts, sources and unique recording IDs", () => {
    expect(albums).toHaveLength(41);
    expect(new Set(songs.map(s => s.id)).size).toBe(songs.length);
    expect(songs.every(song => !/^(DISC|※)/.test(song.title))).toBe(true);
    for (const album of albums) {
      expect(album.source).toMatch(/^https:\/\/(bts\.ibighit\.com|bts-official\.jp)\//);
      expect(findSongs({...options, album: album.id}).length).toBe(new Set(album.tracks.map(t => songs.find(s => s.aliases.includes(t) && s.albums.includes(album.id))?.id)).size);
      expect(album.tracks.every(t => songs.some(s => s.aliases.includes(t) && s.albums.includes(album.id)))).toBe(true);
    }
    expect(albums.find(a => a.id === "proof")?.tracks).toHaveLength(48);
    expect(findSongs({...options, album: "arirang"})).toHaveLength(14);
  });
  it("groups repeated recordings but keeps Japanese and live versions separate", () => {
    const dynamite = songs.filter(s => s.title === "Dynamite");
    expect(dynamite).toHaveLength(1);
    expect(dynamite[0].albums).toEqual(expect.arrayContaining(["dynamite", "be", "proof", "jp-1"]));
    expect(findSongs({...options, query: "Dynamite"}).some(s => s.title.includes("Live"))).toBe(true);
    const dna = findSongs({...options, query: "DNA"});
    expect(dna.some(s => s.title.includes("Japanese"))).toBe(true);
    expect(dna.some(s => s.title === "DNA")).toBe(true);
    expect(songs.filter(s => s.mood)).toHaveLength(9);
  });
  it("combines album and release year without mixing unrelated appearances", () => {
    expect(findSongs({...options, album: "be", year: "2020"})).toHaveLength(8);
    expect(findSongs({...options, album: "be", year: "2022"})).toHaveLength(0);
    expect(findSongs({...options, query: "  ARIRANG "})).toHaveLength(14);
  });
  it("paginates, resets on filtering, and preserves legacy favorites", () => {
    localStorage.setItem("army-space-favorite-songs", JSON.stringify(["Spring Day", "not-a-song"]));
    render(<Songs />);
    expect(screen.getAllByRole("article")).toHaveLength(24);
    fireEvent.click(screen.getByRole("button", {name:"Siguiente"}));
    expect(screen.getByText(/^Página 2 de/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Álbum o lanzamiento"), {target:{value:"arirang"}});
    expect(screen.getByText("Página 1 de 1")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(14);
    fireEvent.click(screen.getByRole("button", {name:"Limpiar filtros"}));
    fireEvent.click(screen.getByRole("button", {name:"Mis favoritas (1)"}));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading",{name:"Spring Day"})).toBeInTheDocument();
  });
  it("labels CD-only tracks without suggesting they are on Spotify", () => {
    render(<Songs />);
    fireEvent.change(screen.getByRole("searchbox"), {target:{value:"Quotation Mark"}});
    expect(screen.getByText(/Pista de CD físico/)).toBeInTheDocument();
    expect(screen.getByRole("link",{name:/Ver edición física/})).toHaveAttribute("href", "https://bts.ibighit.com/eng/discography/detail/proof/index.html");
  });
});
