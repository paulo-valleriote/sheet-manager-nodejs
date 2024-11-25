-- AlterTable
ALTER TABLE "sheet_templates" ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "sheets" ADD COLUMN     "template_id" TEXT;

-- AddForeignKey
ALTER TABLE "sheets" ADD CONSTRAINT "sheets_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "sheet_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
