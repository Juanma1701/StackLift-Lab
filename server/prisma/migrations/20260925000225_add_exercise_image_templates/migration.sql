-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "imageLicenseAuthor" TEXT,
ADD COLUMN     "imageLicenseUrl" TEXT,
ADD COLUMN     "imageSource" TEXT,
ADD COLUMN     "imageSourceUrl" TEXT;

-- CreateTable
CREATE TABLE "ExerciseImageTemplate" (
    "id" TEXT NOT NULL,
    "exerciseName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "licenseTitle" TEXT,
    "licenseAuthor" TEXT,
    "licenseAuthorUrl" TEXT,
    "sourceUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseImageTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExerciseImageTemplate_exerciseName_idx" ON "ExerciseImageTemplate"("exerciseName");
