import "dotenv/config";
import { prisma } from "../src/config/prisma";

async function main() {
  const exercises = await prisma.exercise.findMany({
    where: { imageSource: "template" },
  });

  console.log(`Encontrados ${exercises.length} ejercicios con imagen de plantilla asignada.`);

  let actualizados = 0;
  let sinPlantilla = 0;

  for (const exercise of exercises) {
    const template = await prisma.exerciseImageTemplate.findFirst({
      where: { exerciseName: { equals: exercise.name, mode: "insensitive" } },
    });

    if (!template) {
      console.warn(`  ✗ Sin plantilla encontrada para "${exercise.name}" (id: ${exercise.id})`);
      sinPlantilla++;
      continue;
    }

    await prisma.exercise.update({
      where: { id: exercise.id },
      data: {
        imageUrl: template.imageUrl,
        imageLicenseAuthor: template.licenseAuthor,
        imageLicenseUrl: template.licenseAuthorUrl,
        imageSourceUrl: template.sourceUrl,
      },
    });

    console.log(`  ✔ Resincronizado: "${exercise.name}"`);
    actualizados++;
  }

  console.log(`\nTotal actualizados: ${actualizados} | Sin plantilla: ${sinPlantilla}`);
  await prisma.$disconnect();
}

main().catch(console.error);