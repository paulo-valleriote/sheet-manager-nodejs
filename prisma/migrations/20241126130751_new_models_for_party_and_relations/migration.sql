-- CreateEnum
CREATE TYPE "PartyRole" AS ENUM ('MASTER', 'PLAYER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "party_id" TEXT;

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "img_url" TEXT,
    "max_size" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "dungeon_master_id" TEXT NOT NULL,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_of_parties" (
    "id" TEXT NOT NULL,
    "party_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "PartyRole" NOT NULL DEFAULT 'PLAYER',

    CONSTRAINT "role_of_parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_of_parties" (
    "id" TEXT NOT NULL,
    "party_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "character_of_parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PartyToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PartyToUser_AB_unique" ON "_PartyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PartyToUser_B_index" ON "_PartyToUser"("B");

-- AddForeignKey
ALTER TABLE "role_of_parties" ADD CONSTRAINT "role_of_parties_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_of_parties" ADD CONSTRAINT "role_of_parties_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_of_parties" ADD CONSTRAINT "character_of_parties_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_of_parties" ADD CONSTRAINT "character_of_parties_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartyToUser" ADD CONSTRAINT "_PartyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "parties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartyToUser" ADD CONSTRAINT "_PartyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
