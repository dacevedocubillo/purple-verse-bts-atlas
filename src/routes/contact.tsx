import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/SiteLayout";

const title = "Contact — ARMY Space";
const description = "Write to me: share your favorite BTS song, ideas for the site or just say hi.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Please enter a message").max(1000, "Maximum 1000 characters"),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const result = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const { name, email, message } = result.data;
    window.location.href = `mailto:?subject=${encodeURIComponent(`Message from ${name} (${email})`)}&body=${encodeURIComponent(message)}`;
    toast.success("Thanks for writing, ARMY! 💜");
    form.reset();
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s Talk BTS" subtitle="Have a favorite song, an idea or a question? I’d love to hear from you." />
      <section className="mx-auto max-w-xl px-4 py-20 sm:px-6">
        <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-soft">
          {([
            ["name", "Name", "text"],
            ["email", "Email", "email"],
          ] as const).map(([id, label, type]) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{label}</Label>
              <Input id={id} name={id} type={type} maxLength={255} aria-invalid={!!errors[id]} />
              {errors[id] && <p className="text-sm text-destructive">{errors[id]}</p>}
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={5} maxLength={1000} aria-invalid={!!errors["message"]} />
            {errors["message"] && <p className="text-sm text-destructive">{errors["message"]}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full">Send message</Button>
        </form>
      </section>
    </>
  );
}
