/*
  Warnings:

  - Added the required column `price` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `price` DOUBLE NOT NULL;
