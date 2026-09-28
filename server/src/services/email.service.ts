import { sendMail } from "./mailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await sendMail({
    to,
    subject: "Restablece tu contraseña — StackLift Lab",
    text:
      "Recibimos una solicitud para restablecer tu contraseña de StackLift Lab.\n" +
      "Este enlace expira en 30 minutos:\n\n" +
      `${resetUrl}\n\n` +
      "Si no solicitaste esto, puedes ignorar este correo.",
    html: `...el mismo html de antes...`,
  });
}

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  await sendMail({
    to,
    subject: "Verifica tu correo — StackLift Lab",
    text:
      "Gracias por registrarte en StackLift Lab.\n" +
      "Confirma tu correo para activar tu cuenta. Este enlace expira en 24 horas:\n\n" +
      `${verifyUrl}\n\n` +
      "Si no creaste esta cuenta, puedes ignorar este correo.",
    html: `...el mismo html de antes...`,
  });
}

export async function sendAdminMessageEmail(to: string, subject: string, message: string) {
  await sendMail({
    to,
    subject,
    text: message,
    html: `...el mismo html de antes...`,
  });
}