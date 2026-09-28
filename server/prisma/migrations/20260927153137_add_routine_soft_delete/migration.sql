-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Routine_deletedAt_idx" ON "Routine"("deletedAt");
