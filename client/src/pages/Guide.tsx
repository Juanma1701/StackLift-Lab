import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MessageSquarePlus } from "lucide-react";
import {
  Dumbbell,
  Calendar,
  TrendingUp,
  Image as ImageIcon,
  Share2,
  Timer,
  Trophy,
  Repeat,
  ClipboardList,
  Download,
  Copy,
  Smile,
  MailCheck,
  LifeBuoy,
} from "lucide-react";

interface Section {
  icon: React.ElementType;
  title: string;
  body: string;
}

const SECTIONS: Section[] = [
  {
    icon: MailCheck,
    title: "1. Verifica tu correo",
    body: "Al crear tu cuenta, recibirás un correo con un enlace de verificación. Debes confirmarlo antes de poder iniciar sesión. Si no lo encuentras, revisa la carpeta de spam, o usa la opción de reenviar el correo desde la pantalla de inicio de sesión.",
  },
  {
    icon: Dumbbell,
    title: "2. Crea tu rutina",
    body: "Ve al Dashboard y elige una plantilla (Push/Pull/Legs, Upper/Lower, Full Body) o empieza en blanco. Cada día de la semana se organiza en grupos musculares, y cada grupo en ejercicios. Puedes agregar, renombrar o eliminar grupos y ejercicios cuando quieras, y reordenarlos con las flechas.",
  },
  {
    icon: Copy,
    title: "3. Copia un día completo",
    body: "Si dos días de tu semana son iguales, no los armes desde cero: usa la opción de copiar día para duplicar todos los grupos y ejercicios de un día hacia otro en un clic.",
  },
  {
    icon: ClipboardList,
    title: "4. Registra tus entrenamientos",
    body: "Dentro de cada ejercicio, presiona 'Registrar' para anotar el peso y las repeticiones de cada serie — puedes poner un peso distinto por serie individual (drop sets) si lo necesitas, y agregar notas sobre cómo te sentiste.",
  },
  {
    icon: Repeat,
    title: "5. Repite tu último registro",
    body: "El botón 'Repetir' copia automáticamente el peso, las repeticiones y las notas de tu último registro para ese ejercicio, para cuando entrenas igual que la sesión anterior.",
  },
  {
    icon: Trophy,
    title: "6. Marca tus récords personales",
    body: "Usa el botón 'PR' para anotar un intento máximo puntual, separado de tu registro normal. La app detecta automáticamente cuándo superas tu marca anterior y lo destaca con una insignia.",
  },
  {
    icon: Calendar,
    title: "7. Revisa tu historial",
    body: "En Historial puedes navegar el calendario y ver el detalle completo de cualquier día pasado, incluyendo cómo te sentiste ese día si hiciste el check-in de dificultad.",
  },
  {
    icon: TrendingUp,
    title: "8. Sigue tu progreso",
    body: "En Progreso puedes ver gráficas de cada ejercicio a lo largo del tiempo — si el mismo ejercicio aparece en varios días de tu semana, se combina automáticamente en una sola gráfica. Pasa el cursor sobre cualquier punto para ver el detalle completo de esa sesión.",
  },
  {
    icon: Smile,
    title: "9. Check-in diario de dificultad",
    body: "Cada día puedes calificar qué tan difícil sentiste tu entreno (escala de 1 a 10 con emojis) y dejar una nota de qué pasó. Se guarda junto a ese día en tu historial.",
  },
  {
    icon: Timer,
    title: "10. Cronómetro de descanso",
    body: "Actívalo manualmente entre series desde el ícono del cronómetro en la barra superior. Puedes elegir 60, 90 o 120 segundos, ajustarlo sobre la marcha, y te avisa con sonido y vibración cuando termina.",
  },
  {
    icon: ImageIcon,
    title: "11. Personaliza tus ejercicios",
    body: "Toca el ícono de cada ejercicio para ponerle una imagen — puedes elegir una de la galería de ejercicios comunes (cortesía de wger.de) o subir tu propia foto.",
  },
  {
    icon: Share2,
    title: "12. Comparte tu progreso",
    body: "Desde tu Perfil puedes generar un link público de solo lectura para compartir tu racha, entrenos del mes y avances por ejercicio, sin exponer tu cuenta ni tus datos personales.",
  },
  {
    icon: Download,
    title: "13. Exporta tus datos",
    body: "También desde Perfil puedes descargar un archivo con todo tu historial completo — rutinas, ejercicios y registros — por si quieres guardar una copia propia.",
  },
  {
    icon: LifeBuoy,
    title: "14. ¿No puedes acceder a tu cuenta?",
    body: "Si tu cuenta queda bloqueada por varios intentos fallidos de inicio de sesión, o tienes cualquier otro problema de acceso, usa el enlace '¿No puedes acceder a tu cuenta?' en la pantalla de inicio de sesión para contactarnos.",
  },
  {
    icon: MessageSquarePlus,
    title: "15. Reporta errores o comparte ideas",
    body: "Desde el botón 'Reportar' en la barra superior puedes avisarnos de un error, sugerir una mejora, o dejarnos cualquier comentario — sin salir de tu sesión. Lo revisamos y te contactamos si hace falta.",
  },
];

export function Guide() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Guía rápida</h1>
          <p className="text-muted-foreground mt-1">
            Todo lo que necesitas saber para empezar a usar la app.
          </p>
        </div>

        <div className="space-y-4">
          {SECTIONS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-secondary rounded-md p-4 flex gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">{title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="inline-block bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md text-sm hover:opacity-90"
        >
          Volver al Dashboard
        </Link>
      </main>
    </div>
  );
}

export default Guide;