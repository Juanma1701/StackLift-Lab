export interface MailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const provider = process.env.MAIL_PROVIDER ?? "apps-script"; 

async function sendWithAppsScript({ to, subject, html, text }: MailInput) {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;
  if (!url || !secret) throw new Error("Faltan APPS_SCRIPT_URL o APPS_SCRIPT_SECRET");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret, to, subject, html, text }),
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
  });

  let data: { ok?: boolean; error?: string };
  try {
    data = await res.json();
  } catch {
    throw new Error(`AppsScript: respuesta no válida (HTTP ${res.status})`);
  }
  if (!data.ok) throw new Error(`AppsScript: ${data.error ?? `HTTP ${res.status}`}`);
}

async function sendWithResend({ to, subject, html, text }: MailInput) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: process.env.MAIL_FROM, to: [to], subject, html, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function sendMail(input: MailInput): Promise<void> {
  if (provider === "resend") return sendWithResend(input);
  return sendWithAppsScript(input);
}