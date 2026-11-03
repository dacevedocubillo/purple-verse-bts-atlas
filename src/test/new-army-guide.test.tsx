import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", async importOriginal => {
  const original = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...original, Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => <a href={to} {...props}>{children}</a> };
});

import { Route as GlossaryRoute } from "@/routes/guia-army";
import { Route as SongsRoute } from "@/routes/canciones";

const Glossary = GlossaryRoute.options.component as ComponentType;
const Songs = SongsRoute.options.component as ComponentType;

afterEach(() => { cleanup(); vi.restoreAllMocks(); localStorage.clear(); });

describe("New ARMY guide", () => {
  it("finds terms without case or accent sensitivity and handles no results", () => {
    render(<Glossary />);
    const search = screen.getByRole("searchbox");
    fireEvent.change(search, { target: { value: "  MAKNAE  " } });
    expect(screen.getByText("Maknae", { selector: "dt" })).toBeInTheDocument();
    expect(screen.queryByText("Comeback", { selector: "dt" })).not.toBeInTheDocument();
    fireEvent.change(search, { target: { value: "ZZZ-no-term" } });
    expect(screen.getByText(/No encontramos esa palabra/)).toBeInTheDocument();
    fireEvent.change(search, { target: { value: "expresion" } });
    expect(screen.getByText("OT7", { selector: "dt" })).toBeInTheDocument();
  });

  it("combines style and search filters and can recover from an empty result", () => {
    render(<Songs />);
    fireEvent.click(screen.getByRole("button", { name: "Energía", exact: true }));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Spring Day" } });
    expect(screen.getByText(/No hay coincidencias/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Ver todas las canciones" }));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(24);
  });

  it("persists favorites across visits and supports removing them", () => {
    const view = render(<Songs />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Dynamite" } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar Dynamite en favoritas" }));
    view.unmount();
    render(<Songs />);
    fireEvent.click(screen.getByRole("button", { name: "Mis favoritas (1)" }));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Quitar Dynamite de favoritas" }));
    expect(screen.getByText(/Todavía no hay favoritas/)).toBeInTheDocument();
  });

  it("allows favorites even if browser storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Blocked"); });
    render(<Songs />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Butter" } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar Butter en favoritas" }));
    expect(screen.getByRole("button", { name: "Quitar Butter de favoritas" })).toBeInTheDocument();
    expect(screen.getByText(/solo durante esta visita/)).toBeInTheDocument();
  });
});
