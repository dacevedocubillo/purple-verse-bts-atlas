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

const biasOptions = ["Namjoon", "Seokjin", "Yoongi", "Hobi", "Jimin", "Taehyung", "Jungkook", "OT7"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Escribe tu nombre").max(100),
  bias: z.enum(biasOptions, { errorMap: () => ({ message: "Selecciona tu bias" }) }),
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
          <p className="text-sm text-muted-foreground">Todos los campos son obligatorios.</p>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" type="text" autoComplete="given-name" maxLength={100} required disabled={sending} aria-invalid={!!errors["name"]} aria-describedby={errors["name"] ? "name-error" : undefined} />
            {errors["name"] && <p id="name-error" className="text-sm text-destructive">{errors["name"]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bias">¿Quién es tu bias?</Label>
            <select id="bias" name="bias" defaultValue="" required disabled={sending} aria-invalid={!!errors["bias"]} aria-describedby={errors["bias"] ? "bias-error" : undefined} className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">
              <option value="" disabled>Selecciona una opción</option>
              {biasOptions.map((bias) => <option key={bias} value={bias}>{bias}</option>)}
            </select>
            {errors["bias"] && <p id="bias-error" className="text-sm text-destructive">{errors["bias"]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" name="message" rows={5} maxLength={1000} required disabled={sending} aria-invalid={!!errors["message"]} />
            {errors["message"] && <p className="text-sm text-destructive">{errors["message"]}</p>}
          </div>
          <p className="text-xs text-muted-foreground">Al enviar, tu nombre, bias y mensaje se procesarán mediante Formspree para recibir tu comentario.</p>
          {errors["submit"] && <p role="alert" className="text-sm text-destructive">{errors["submit"]}</p>}
          {status && <p role="status" className="text-sm text-primary">{status}</p>}
          <Button type="submit" size="lg" disabled={sending} className="w-full rounded-full">{sending ? "Enviando…" : "Enviar mi mensaje 💜"}</Button>
        </form>
      </section>
    </>
  );
}
