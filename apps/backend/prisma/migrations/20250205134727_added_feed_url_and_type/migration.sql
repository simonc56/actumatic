/*
  Warnings:

  - A unique constraint covering the columns `[feedUrl]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `feedType` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedUrl` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "feedType" TEXT NOT NULL,
ADD COLUMN     "feedUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Provider_feedUrl_key" ON "Provider"("feedUrl");
