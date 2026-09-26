export interface CommonExercise {
  name: string; 
  searchTerm: string; 
}
export const COMMON_EXERCISES_BY_MUSCLE_GROUP: Record<string, CommonExercise[]> = {
  "Pecho": [
    { name: "press banca", searchTerm: "bench press" },
    { name: "press inclinado", searchTerm: "incline bench press" },
    { name: "pecho en máquina", searchTerm: "chest press machine" },
    { name: "aperturas en máquina", searchTerm: "chest fly" }, // antes: "pec deck"
  ],
  "Tríceps": [
    { name: "extensión en polea", searchTerm: "tricep pushdown" },
    { name: "press francés", searchTerm: "skullcrusher" },
    { name: "fondos en banco", searchTerm: "tricep dip" }, // antes: "bench dip"
  ],
  "Hombro": [
    { name: "press militar", searchTerm: "military press" }, // antes: "overhead press"
    { name: "elevaciones laterales", searchTerm: "lateral raise" },
    { name: "hombro posterior", searchTerm: "rear delt fly" },
  ],
  "Espalda": [
    { name: "jalón al pecho", searchTerm: "lat pulldown" },
    { name: "remo con agarre abierto", searchTerm: "seated cable row wide grip" },
    { name: "remo con agarre cerrado", searchTerm: "seated cable row close grip" },
    { name: "peso muerto", searchTerm: "deadlift" },
  ],
  "Bíceps": [
    { name: "curl en banco inclinado", searchTerm: "incline curl" }, // antes: "incline dumbbell curl"
    { name: "curl martillo", searchTerm: "hammer curl" }, // antes: "curl militar"
    { name: "curl en máquina", searchTerm: "cable curl" },
    { name: "polea con agarre prono de pie", searchTerm: "cable curl" },
  ],
  "Antebrazos": [
    { name: "curl de muñeca", searchTerm: "wrist curl" },
    { name: "barra z con agarre prono de pie", searchTerm: "ez bar" }, // antes: "ez bar curl"
  ],
  "Brazos": [
    { name: "curl con mancuernas", searchTerm: "dumbbell bicep curl" },
    { name: "extensión de tríceps con mancuerna", searchTerm: "tricep extension" }, // antes: "overhead tricep extension"
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
    { name: "hiperextensiones", searchTerm: "back extension" },
    { name: "pantorrillas", searchTerm: "standing calf raise" },
  ],
  "Glúteo": [
    { name: "hip thrust", searchTerm: "hip thrust" },
    { name: "aductores", searchTerm: "hip adduction" },
    { name: "patada de glúteo en polea", searchTerm: "glute kickback" },
  ],
};