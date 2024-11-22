/*
  Warnings:

  - You are about to drop the column `age` on the `sheets` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `sheets` table. All the data in the column will be lost.
  - You are about to drop the column `template_id` on the `sheets` table. All the data in the column will be lost.
  - Added the required column `pc_name` to the `sheets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sheets" DROP CONSTRAINT "sheets_template_id_fkey";

-- AlterTable
ALTER TABLE "sheets" DROP COLUMN "age",
DROP COLUMN "name",
DROP COLUMN "template_id",
ADD COLUMN     "pc_age" INTEGER,
ADD COLUMN     "pc_name" TEXT NOT NULL,
ADD COLUMN     "pc_role" TEXT,
ADD COLUMN     "pc_specie" TEXT,
ADD COLUMN     "sheet_template_id" TEXT,
ADD COLUMN     "template_values" JSONB;

-- CreateTable
CREATE TABLE "player_character_attributes" (
    "id" TEXT NOT NULL,
    "attributes_template_id" TEXT,
    "sheet_id" TEXT NOT NULL,
    "attributes_defined" JSONB NOT NULL,

    CONSTRAINT "player_character_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attributes_templates" (
    "id" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,

    CONSTRAINT "attributes_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_character_attributes_sheet_id_key" ON "player_character_attributes"("sheet_id");

-- AddForeignKey
ALTER TABLE "sheets" ADD CONSTRAINT "sheets_sheet_template_id_fkey" FOREIGN KEY ("sheet_template_id") REFERENCES "sheet_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_character_attributes" ADD CONSTRAINT "player_character_attributes_sheet_id_fkey" FOREIGN KEY ("sheet_id") REFERENCES "sheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_character_attributes" ADD CONSTRAINT "player_character_attributes_attributes_template_id_fkey" FOREIGN KEY ("attributes_template_id") REFERENCES "attributes_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
