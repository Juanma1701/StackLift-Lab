const TIMEZONE_OFFSET_HOURS = -5; // Colombia (UTC-5, sin horario de verano)

/**
 * Convierte un Date (timestamp UTC real) a la fecha calendario en Colombia,
 * en formato YYYY-MM-DD. Evita que registros hechos de noche "salten" al día siguiente.
 */
export function toLocalDateKey(date: Date): string {
  const shifted = new Date(date.getTime() + TIMEZONE_OFFSET_HOURS * 60 * 60 * 1000);
  return shifted.toISOString().split("T")[0];
}