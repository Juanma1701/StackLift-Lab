import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await transporter.sendMail({
    from: `"StackLift Lab" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Restablece tu contraseña — StackLift Lab",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Restablece tu contraseña</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña. Este enlace expira en 30 minutos.</p>
        <p>
          <a href="${resetUrl}" style="display:inline-block; background:#d99a3f; color:#1a1a1a; padding:10px 20px; border-radius:6px; text-decoration:none; font-weight:bold;">
            Restablecer contraseña
          </a>
        </p>
        <p style="color:#888; font-size:12px;">Si no solicitaste esto, puedes ignorar este correo.</p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  await transporter.sendMail({
    from: `"StackLift Lab" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Verifica tu correo — StackLift Lab",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Verifica tu correo</h2>
        <p>Gracias por registrarte en StackLift Lab. Confirma tu correo para activar tu cuenta. Este enlace expira en 24 horas.</p>
        <p>
          <a href="${verifyUrl}" style="display:inline-block; background:#d99a3f; color:#1a1a1a; padding:10px 20px; border-radius:6px; text-decoration:none; font-weight:bold;">
            Verificar mi correo
          </a>
        </p>
        <p style="color:#888; font-size:12px;">Si no creaste esta cuenta, puedes ignorar este correo.</p>
      </div>
    `,
  });
}

export async function sendAdminMessageEmail(to: string, subject: string, message: string) {
  await transporter.sendMail({
    from: `"StackLift Lab" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  });
}