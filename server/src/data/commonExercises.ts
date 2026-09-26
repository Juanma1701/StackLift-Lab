export interface CommonExercise {
  name: string; 
  searchTerm: string; 
}
export const COMMON_EXERCISES_BY_MUSCLE_GROUP: Record<string, CommonExercise[]> = {
  "Pecho": [
    { name: "press banca", searchTerm: "bench press" },
    { name: "press inclinado", searchTerm: "incline bench press" },
    { name: "pecho en máquina", searchTerm: "chest press machine" },
    { name: "aperturas en máquina", searchTerm: "chest fly" }, 
  ],
  "Tríceps": [
    { name: "extensión en polea", searchTerm: "tricep pushdown" },
    { name: "press francés", searchTerm: "skullcrusher" },
    { name: "fondos en banco", searchTerm: "tricep dip" }, 
  ],
  "Hombro": [
    { name: "press militar", searchTerm: "military press" }, 
    { name: "elevaciones laterales", searchTerm: "lateral raise" },
    { name: "hombro posterior", searchTerm: "rear delt fly" },
  ],
  "Espalda": [
    { name: "jalón al pecho", searchTerm: "lat pulldown" },
    { name: "remo con agarre abierto", searchTerm: "seated cable row wide grip" },
    { name: "remo con agarre cerrado", searchTerm: "seated cable row close grip" },
    { name: "remo en T", searchTerm: "rowing, T-bar" },
  ],
  "Bíceps": [
    { name: "curl en banco inclinado", searchTerm: "incline curl" },
    { name: "curl martillo", searchTerm: "hammer curl" },
    { name: "curl en máquina", searchTerm: "cable curl" },
    { name: "polea con agarre prono de pie", searchTerm: "cable curl" },
  ],
  "Antebrazos": [
    { name: "curl de muñeca", searchTerm: "wrist curl" },
    { name: "barra z con agarre prono de pie", searchTerm: "ez bar" },
  ],
  "Brazos": [
    { name: "curl con mancuernas", searchTerm: "dumbbell bicep curl" },
    { name: "extensión de tríceps con mancuerna", searchTerm: "tricep extension" },
  ],
  "Pierna": [
    { name: "sentadilla", searchTerm: "squat" },
    { name: "prensa", searchTerm: "leg press" },
    { name: "extensiones", searchTerm: "leg extension" },
    { name: "femorales", searchTerm: "leg curl" },
    { name: "pantorrillas", searchTerm: "standing calf raise" },
  ],
  "Cuádriceps": [
    { name: "sentadilla", searchTerm: "squat" },
    { name: "prensa", searchTerm: "leg press" },
    { name: "extensiones", searchTerm: "leg extension" },
    { name: "zancadas", searchTerm: "lunge" },
  ],
  "Femorales": [
    { name: "peso muerto rumano", searchTerm: "romanian deadlift" },
    { name: "curl femoral", searchTerm: "leg curl" },
    { name: "pantorrillas", searchTerm: "standing calf raise" },
    
  ],
  "Glúteo": [
    { name: "hip thrust", searchTerm: "hip thrust" },
    { name: "aductores", searchTerm: "hip adduction" },
    { name: "extensión de glúteos en polea", searchTerm: "glute kickback" }, 
    { name: "abducción en máquina", searchTerm: "Machine Hip Abduction" },
  ],
};