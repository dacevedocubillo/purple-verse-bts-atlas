import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ComponentType } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Route } from "@/routes/contacto";

const ContactForm = Route.options.component as ComponentType;

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function fillForm() {
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Prueba" } });
  fireEvent.change(screen.getByLabelText("¿Quién es tu bias?"), { target: { value: "RM" } });
  fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Mensaje de prueba" } });
}

describe("Contact form", () => {
  it("does not submit invalid input", () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Enviar mi mensaje 💜" }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText("Escribe tu nombre")).toBeInTheDocument();
    expect(screen.getByText("Selecciona tu bias")).toBeInTheDocument();
    expect(screen.getByText("Escribe un mensaje")).toBeInTheDocument();
    expect(screen.queryByLabelText("Correo electrónico")).not.toBeInTheDocument();
  });

  it("submits to Formspree and resets only after success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true }); vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />); fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mi mensaje 💜" }));
    await screen.findByRole("status");
    expect(fetchMock).toHaveBeenCalledWith("https://formspree.io/f/maeelkve", expect.objectContaining({ method: "POST", body: JSON.stringify({ name: "Prueba", bias: "RM", message: "Mensaje de prueba" }) }));
    expect(screen.getByLabelText("Nombre")).toHaveValue("");
    expect(screen.getByLabelText("¿Quién es tu bias?")).toHaveValue("");
  });

  it("keeps the message and allows retry after rejection or network failure", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false }).mockRejectedValueOnce(new Error("Offline"));
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />); fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mi mensaje 💜" }));
    await screen.findByRole("alert");
    expect(screen.getByLabelText("Mensaje")).toHaveValue("Mensaje de prueba");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mi mensaje 💜" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    await screen.findByRole("alert");
    expect(screen.getByRole("button", { name: "Enviar mi mensaje 💜" })).toBeEnabled();
  });
});
