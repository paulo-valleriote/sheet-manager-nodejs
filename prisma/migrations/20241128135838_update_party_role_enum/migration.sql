/*
  Warnings:

  - The values [MASTER] on the enum `PartyRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PartyRole_new" AS ENUM ('DUNGEON_MASTER', 'PLAYER');
ALTER TABLE "role_of_parties" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "role_of_parties" ALTER COLUMN "role" TYPE "PartyRole_new" USING ("role"::text::"PartyRole_new");
ALTER TYPE "PartyRole" RENAME TO "PartyRole_old";
ALTER TYPE "PartyRole_new" RENAME TO "PartyRole";
DROP TYPE "PartyRole_old";
ALTER TABLE "role_of_parties" ALTER COLUMN "role" SET DEFAULT 'PLAYER';
COMMIT;
