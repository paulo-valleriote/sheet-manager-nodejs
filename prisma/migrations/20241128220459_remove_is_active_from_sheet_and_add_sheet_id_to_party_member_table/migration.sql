/*
  Warnings:

  - You are about to drop the column `isActive` on the `sheets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "role_of_parties" ADD COLUMN     "sheet_id" TEXT;

-- AlterTable
ALTER TABLE "sheets" DROP COLUMN "isActive";

-- AddForeignKey
ALTER TABLE "role_of_parties" ADD CONSTRAINT "role_of_parties_sheet_id_fkey" FOREIGN KEY ("sheet_id") REFERENCES "sheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
