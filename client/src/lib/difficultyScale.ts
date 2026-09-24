export interface DifficultyLevel {
  value: number;
  emoji: string;
  label: string;
}

export const DIFFICULTY_SCALE: DifficultyLevel[] = [
  { value: 1, emoji: "😄", label: "Excelente" },
  { value: 2, emoji: "🙂", label: "Muy bien" },
  { value: 3, emoji: "🙂", label: "Bien" },
  { value: 4, emoji: "😐", label: "Normal" },
  { value: 5, emoji: "😐", label: "Regular" },
  { value: 6, emoji: "😕", label: "Algo difícil" },
  { value: 7, emoji: "😣", label: "Difícil" },
  { value: 8, emoji: "😖", label: "Muy difícil" },
  { value: 9, emoji: "🥵", label: "Extenuante" },
  { value: 10, emoji: "🤕", label: "Al límite" },
];