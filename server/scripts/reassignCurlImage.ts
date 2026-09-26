import "dotenv/config";
import { prisma } from "../src/config/prisma";

// Uso único: mueve la imagen que hoy tiene "curl militar" hacia "curl en máquina"
// (la imagen blanca que tenía "curl en máquina" antes no correspondía a ese
// ejercicio, así que se descarta). Corre esto UNA vez, antes de correr
// seedExerciseImages.ts para traer la imagen nueva de "curl martillo".

async function main() {
  const curlMilitar = await prisma.exerciseImageTemplate.findFirst({ where: { exerciseName: "curl militar" } });

  if (!curlMilitar) {
    console.warn('No se encontró ninguna plantilla con exerciseName = "curl militar". Nada que mover.');
    await prisma.$disconnect();
    return;
  }

  const curlMaquina = await prisma.exerciseImageTemplate.findFirst({ where: { exerciseName: "curl en máquina" } });

  const data = {
    exerciseName: "curl en máquina",
    imageUrl: curlMilitar.imageUrl,
    license: curlMilitar.license,
    licenseTitle: curlMilitar.licenseTitle,
    licenseAuthor: curlMilitar.licenseAuthor,
    licenseAuthorUrl: curlMilitar.licenseAuthorUrl,
    sourceUrl: curlMilitar.sourceUrl,
  };

  if (curlMaquina) {
    await prisma.exerciseImageTemplate.update({ where: { id: curlMaquina.id }, data });
    console.log('✔ "curl en máquina" actualizado con la imagen que tenía "curl militar".');
  } else {
    await prisma.exerciseImageTemplate.create({ data });
    console.log('✔ Creada plantilla "curl en máquina" con la imagen que tenía "curl militar".');
  }

  await prisma.exerciseImageTemplate.delete({ where: { id: curlMilitar.id } });
  console.log('✔ Eliminada la plantilla vieja de "curl militar".');

  await prisma.$disconnect();
}

main().catch(console.error);