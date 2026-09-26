import { Link } from "react-router-dom";
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
} from "lucide-react";

interface Section {
  icon: React.ElementType;
  title: string;
  body: string;
}

const SECTIONS: Section[] = [
  {
    icon: Dumbbell,
    title: "1. Crea tu rutina",
    body: "Ve al Dashboard y elige una plantilla (Push/Pull/Legs, Upper/Lower, Full Body) o empieza en blanco. Cada día de la semana se organiza en grupos musculares, y cada grupo en ejercicios. Puedes agregar, renombrar o eliminar grupos y ejercicios cuando quieras, y reordenarlos con las flechas.",
  },
  {
    icon: Copy,
    title: "2. Copia un día completo",
    body: "Si dos días de tu semana son iguales, no los armes desde cero: usa la opción de copiar día para duplicar todos los grupos y ejercicios de un día hacia otro en un clic.",
  },
  {
    icon: ClipboardList,
    title: "3. Registra tus entrenamientos",
    body: "Dentro de cada ejercicio, presiona 'Registrar' para anotar el peso y las repeticiones de cada serie — puedes poner un peso distinto por serie individual (drop sets) si lo necesitas, y agregar notas sobre cómo te sentiste.",
  },
  {
    icon: Repeat,
    title: "4. Repite tu último registro",
    body: "El botón 'Repetir' copia automáticamente el peso, las repeticiones y las notas de tu último registro para ese ejercicio, para cuando entrenas igual que la sesión anterior.",
  },
  {
    icon: Trophy,
    title: "5. Marca tus récords personales",
    body: "Usa el botón 'PR' para anotar un intento máximo puntual, separado de tu registro normal. La app detecta automáticamente cuándo superas tu marca anterior y lo destaca con una insignia.",
  },
  {
    icon: Calendar,
    title: "6. Revisa tu historial",
    body: "En Historial puedes navegar el calendario y ver el detalle completo de cualquier día pasado, incluyendo cómo te sentiste ese día si hiciste el check-in de dificultad.",
  },
  {
    icon: TrendingUp,
    title: "7. Sigue tu progreso",
    body: "En Progreso puedes ver gráficas de cada ejercicio a lo largo del tiempo — si el mismo ejercicio aparece en varios días de tu semana, se combina automáticamente en una sola gráfica. Pasa el cursor sobre cualquier punto para ver el detalle completo de esa sesión.",
  },
  {
    icon: Smile,
    title: "8. Check-in diario de dificultad",
    body: "Cada día puedes calificar qué tan difícil sintiéste tu entreno (escala de 1 a 10 con emojis) y dejar una nota de qué pasó. Se guarda junto a ese día en tu historial.",
  },
  {
    icon: Timer,
    title: "9. Cronómetro de descanso",
    body: "Actívalo manualmente entre series desde el ícono del cronómetro en la barra superior. Puedes elegir 60, 90 o 120 segundos, ajustarlo sobre la marcha, y te avisa con sonido y vibración cuando termina.",
  },
  {
    icon: ImageIcon,
    title: "10. Personaliza tus ejercicios",
    body: "Toca el ícono de cada ejercicio para ponerle una imagen — puedes elegir una de la galería de ejercicios comunes (cortesía de wger.de) o subir tu propia foto.",
  },
  {
    icon: Share2,
    title: "11. Comparte tu progreso",
    body: "Desde tu Perfil puedes generar un link público de solo lectura para compartir tu racha, entrenos del mes y avances por ejercicio, sin exponer tu cuenta ni tus datos personales.",
  },
  {
    icon: Download,
    title: "12. Exporta tus datos",
    body: "También desde Perfil puedes descargar un archivo con todo tu historial completo — rutinas, ejercicios y registros — por si quieres guardar una copia propia.",
  },
];

export function Guide() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
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
    </div>
  );
}

export default Guide;