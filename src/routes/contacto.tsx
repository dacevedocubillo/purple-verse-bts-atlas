import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/SiteLayout";

const title = "Contacto — ARMY Space";
const description = "Escríbeme: comparte tu canción favorita de BTS, ideas para el sitio o simplemente saluda.";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${import.meta.env.BASE_URL}contacto` },
    ],
    links: [{ rel: "canonical", href: `${import.meta.env.BASE_URL}contacto` }],
  }),
  component: Contacto,
});

const schema = z.object({
  name: z.string().trim().min(1, "Escribe tu nombre").max(100),
  email: z.string().trim().email("Correo electrónico no válido").max(255),
  message: z.string().trim().min(1, "Escribe un mensaje").max(1000, "Máximo 1000 caracteres"),
});

function Contacto() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setStatus("");
    const form = e.currentTarget;
    const result = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const response = await fetch("https://formspree.io/f/maeelkve", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setStatus("¡Mensaje enviado! Gracias por escribir, ARMY. 💜");
      toast.success("¡Mensaje enviado! 💜");
      form.reset();
    } catch {
      setErrors({ submit: "No se pudo enviar el mensaje. Tus datos siguen aquí; intenta nuevamente en unos minutos." });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero eyebrow="Contacto" title="Hablemos de BTS" subtitle="¿Tienes una canción favorita, una idea o una pregunta? Me encantaría leerte." />
      <section className="mx-auto max-w-xl px-4 py-20 sm:px-6">
        <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-soft">
          {([
            ["name", "Nombre", "text"],
            ["email", "Correo electrónico", "email"],
          ] as const).map(([id, label, type]) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{label}</Label>
              <Input id={id} name={id} type={type} maxLength={id === "name" ? 100 : 255} disabled={sending} aria-invalid={!!errors[id]} />
              {errors[id] && <p className="text-sm text-destructive">{errors[id]}</p>}
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" name="message" rows={5} maxLength={1000} disabled={sending} aria-invalid={!!errors["message"]} />
            {errors["message"] && <p className="text-sm text-destructive">{errors["message"]}</p>}
          </div>
          <p className="text-xs text-muted-foreground">Al enviar, tu nombre, correo y mensaje se procesarán mediante Formspree para responder a tu consulta.</p>
          {errors["submit"] && <p role="alert" className="text-sm text-destructive">{errors["submit"]}</p>}
          {status && <p role="status" className="text-sm text-primary">{status}</p>}
          <Button type="submit" size="lg" disabled={sending} className="w-full rounded-full">{sending ? "Enviando…" : "Enviar mensaje"}</Button>
        </form>
      </section>
    </>
  );
}
