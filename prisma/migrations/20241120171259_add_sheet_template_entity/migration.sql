/*
  Warnings:

  - Added the required column `owner` to the `sheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sheets" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isEditable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "owner" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "sheet_templates" (
    "id" TEXT NOT NULL,
    "children" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sheet_templates_pkey" PRIMARY KEY ("id")
);
