import "dotenv/config";
import { prisma } from "../src/config/prisma";

async function main() {
  const result = await prisma.exerciseImageTemplate.deleteMany({});
  console.log("Registros eliminados:", result.count);
  await prisma.$disconnect();
}

main().catch(console.error);