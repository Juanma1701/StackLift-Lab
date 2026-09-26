export interface RoutineTemplate {
  id: string;
  label: string;
  description: string;
  // día 1 a 5 → lista de nombres de grupos musculares para ese día (vacío = descanso)
  days: Record<number, string[]>;
}

export const ROUTINE_TEMPLATES: RoutineTemplate[] = [
  {
    id: "blank",
    label: "En blanco",
    description: "Empieza sin grupos musculares predefinidos.",
    days: { 1: [], 2: [], 3: [], 4: [], 5: [] },
  },
  {
    id: "ppl",
    label: "Push / Pull / Legs",
    description: "Empuje, jalón y pierna repetido dos veces por semana.",
    days: {
      1: ["Pecho", "Tríceps", "Hombro"],
      2: ["Espalda", "Bíceps", "Antebrazos"],
      3: ["Pierna"],
      4: ["Pecho", "Tríceps", "Hombro"],
      5: ["Espalda", "Bíceps", "Antebrazos"],
    },
  },
  {
    id: "upper-lower",
    label: "Upper / Lower",
    description: "Tren superior e inferior alternados, con un día extra de refuerzo.",
    days: {
      1: ["Pecho", "Espalda", "Hombro"],
      2: ["Cuádriceps", "Glúteo"],
      3: ["Brazos", "Hombro"],
      4: ["Femorales", "Glúteo"],
      5: ["Pecho", "Espalda"],
    },
  },
  {
    id: "full-body",
    label: "Full Body",
    description: "Cuerpo completo 3 veces por semana, con descanso entre sesiones.",
    days: {
      1: ["Pecho", "Espalda", "Pierna"],
      2: [],
      3: ["Hombro", "Brazos", "Pierna"],
      4: [],
      5: ["Pecho", "Espalda", "Pierna"],
    },
  },
];