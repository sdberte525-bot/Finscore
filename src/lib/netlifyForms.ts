/**
 * Submits a form to Netlify Forms from the browser. The form must be declared in
 * public/__forms.html so Netlify detects it at deploy time. Returns false when
 * the site isn't on Netlify (or form detection is off), so callers can say so.
 */
export async function netlifySubmit(formName: string, data: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "form-name": formName, ...data }).toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Joins the email list from any form on the site. Throws with a readable message on failure. */
export async function joinList(email: string, source: string, company = ""): Promise<void> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source, company }),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fallback?: string };
  if (!res.ok) throw new Error(data.error ?? "That didn’t go through. Try again in a moment.");
  if (data.ok) return;
  if (data.fallback === "netlify" && (await netlifySubmit("newsletter", { email, source }))) return;
  throw new Error("Sign-ups aren’t switched on yet. Email swolvation@gmail.com and we’ll add you.");
}
