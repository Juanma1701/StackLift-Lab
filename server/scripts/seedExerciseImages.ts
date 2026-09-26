import "dotenv/config";
import { prisma } from "../src/config/prisma";
import { COMMON_EXERCISES_BY_MUSCLE_GROUP } from "../src/data/commonExercises";

const WGER_LANGUAGE_ENGLISH = 2;

const MANUAL_MATCHES: Record<string, number> = {
  "press banca": 73,
  "remo con agarre abierto": 1119,
  "curl martillo": 1567,
  "fondos en banco": 197,
  "curl en banco inclinado": 1448,
  "barra z con agarre prono de pie": 94,
  "extensión de tríceps con mancuerna": 1336,
  "curl en máquina": 1109,
  "abducción en máquina": 1748,
  "extensión de glúteos en polea": 1131,
  "remo en T": 513,
};

interface WgerTranslation {
  baseId: number;
  name: string;
}

async function fetchLicenseNames(): Promise<Record<number, string>> {
  const res = await fetch("https://wger.de/api/v2/license/?format=json&limit=50");
  const data: any = await res.json();
  const map: Record<number, string> = {};
  for (const lic of data.results ?? []) {
    map[lic.id] = lic.short_name || lic.full_name || `license-${lic.id}`;
  }
  return map;
}

// Ya NO descarga el archivo — guarda directo la URL de wger.de como imageUrl.
// wger aloja las imágenes permanentemente, así que no hace falta rehospedarlas
// (y evita el problema de que Railway no tiene el archivo en su propio disco).
async function fetchMainImage(baseId: number): Promise<any | null> {
  const infoRes = await fetch(`https://wger.de/api/v2/exerciseinfo/${baseId}/?format=json`);
  const info: any = await infoRes.json();
  const images = info.images ?? [];
  return images.find((img: any) => img.is_main) || images[0] || null;
}

async function saveTemplate(
  name: string,
  baseId: number,
  mainImage: any,
  licenseNames: Record<number, string>
) {
  const data = {
    exerciseName: name,
    imageUrl: mainImage.image, // URL absoluta de wger.de
    license: licenseNames[mainImage.license] ?? `license-${mainImage.license}`,
    licenseTitle: mainImage.license_title || null,
    licenseAuthor: mainImage.license_author || null,
    licenseAuthorUrl: mainImage.license_author_url || null,
    sourceUrl: `https://wger.de/en/exercise/${baseId}/view/`,
  };

  const existing = await prisma.exerciseImageTemplate.findFirst({ where: { exerciseName: name } });
  if (existing) {
    await prisma.exerciseImageTemplate.update({ where: { id: existing.id }, data });
    console.log(`  ✔ Actualizado: "${name}"`);
  } else {
    await prisma.exerciseImageTemplate.create({ data });
    console.log(`  ✔ Guardado: "${name}"`);
  }
}

async function fetchAllEnglishTranslations(): Promise<WgerTranslation[]> {
  const all: WgerTranslation[] = [];
  let url: string | null =
    `https://wger.de/api/v2/exercise-translation/?language=${WGER_LANGUAGE_ENGLISH}&limit=100&format=json`;

  while (url) {
    const res = await fetch(url);
    const data: any = await res.json();
    for (const item of data.results ?? []) {
      if (item.name && item.exercise) all.push({ baseId: item.exercise, name: item.name });
    }
    url = data.next;
    await new Promise((r) => setTimeout(r, 200));
  }

  return all;
}

function findCandidates(searchTerm: string, list: WgerTranslation[]): WgerTranslation[] {
  const term = searchTerm.toLowerCase();
  const exact = list.filter((e) => e.name.toLowerCase() === term);
  const contains = list.filter((e) => e.name.toLowerCase().includes(term) && !exact.includes(e));
  const reverseContains = list.filter(
    (e) => term.includes(e.name.toLowerCase()) && !exact.includes(e) && !contains.includes(e)
  );
  return [...exact, ...contains, ...reverseContains].slice(0, 15);
}

async function processAutomatic(licenseNames: Record<number, string>, wgerTranslations: WgerTranslation[]) {
  const allExercises = Object.values(COMMON_EXERCISES_BY_MUSCLE_GROUP).flat();
  const uniqueByName = new Map(allExercises.map((e) => [e.name, e]));
  console.log(`Tu catálogo: ${uniqueByName.size} ejercicios distintos.`);

  for (const { name, searchTerm } of uniqueByName.values()) {
    if (MANUAL_MATCHES[name]) {
      console.log(`  ↷ "${name}" tiene override manual, se procesa en el paso manual`);
      continue;
    }

    const already = await prisma.exerciseImageTemplate.findFirst({ where: { exerciseName: name } });
    if (already) {
      console.log(`  ⏭  Ya existe plantilla para "${name}"`);
      continue;
    }

    const candidates = findCandidates(searchTerm, wgerTranslations);
    if (candidates.length === 0) {
      console.warn(`  ✗ Sin coincidencia en wger para "${name}" (buscado como "${searchTerm}")`);
      continue;
    }

    let saved = false;
    for (const candidate of candidates) {
      const mainImage = await fetchMainImage(candidate.baseId);
      if (!mainImage) continue; // prueba el siguiente candidato

      console.log(`Guardando "${name}" → wger: "${candidate.name}" (base id ${candidate.baseId})`);
      await saveTemplate(name, candidate.baseId, mainImage, licenseNames);
      saved = true;
      break;
    }

    if (!saved) {
      console.warn(`  ✗ Ninguno de los ${candidates.length} candidatos para "${name}" tiene imagen en wger`);
    }

    await new Promise((r) => setTimeout(r, 300));
  }
}

async function processManual(licenseNames: Record<number, string>) {
  for (const [name, baseId] of Object.entries(MANUAL_MATCHES)) {
    if (!baseId) {
      console.warn(`  ⚠ Falta el base_id para "${name}" en MANUAL_MATCHES`);
      continue;
    }

    const mainImage = await fetchMainImage(baseId);
    if (!mainImage) {
      console.warn(`  ✗ base_id ${baseId} ("${name}") tampoco tiene imágenes en wger`);
      continue;
    }

    await saveTemplate(name, baseId, mainImage, licenseNames);
    await new Promise((r) => setTimeout(r, 300));
  }
}

async function main() {
  console.log("Descargando catálogo de licencias...");
  const licenseNames = await fetchLicenseNames();

  console.log("Descargando catálogo completo de traducciones en inglés (una sola vez)...");
  const wgerTranslations = await fetchAllEnglishTranslations();
  console.log(`Catálogo de wger: ${wgerTranslations.length} ejercicios en inglés.`);

  console.log("\n== Paso 1: matching automático ==");
  await processAutomatic(licenseNames, wgerTranslations);

  console.log("\n== Paso 2: matches manuales ==");
  await processManual(licenseNames);

  await prisma.$disconnect();
}

main().catch(console.error);