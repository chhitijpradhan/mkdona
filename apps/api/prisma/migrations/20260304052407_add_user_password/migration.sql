/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Existing rows are backfilled with a placeholder; those users must reset password to log in.
*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "password" TEXT NOT NULL DEFAULT '';
-- Remove default so new rows must supply password
ALTER TABLE "User" ALTER COLUMN "password" DROP DEFAULT;
