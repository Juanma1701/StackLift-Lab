import { sendVerificationEmail } from "../src/services/email.service";

sendVerificationEmail("gymtrackerofficial10@gmail.com", "https://ejemplo.com/verify?token=abc")
  .then(() => console.log("✅ Correo enviado"))
  .catch((e) => console.error("❌ Error:", e));