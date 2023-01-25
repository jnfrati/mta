/*
  Warnings:

  - The values [LINK] on the enum `FileProvider` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FileProvider_new" AS ENUM ('S3', 'GOOGLE_DRIVE');
ALTER TABLE "File" ALTER COLUMN "provider" TYPE "FileProvider_new" USING ("provider"::text::"FileProvider_new");
ALTER TYPE "FileProvider" RENAME TO "FileProvider_old";
ALTER TYPE "FileProvider_new" RENAME TO "FileProvider";
DROP TYPE "FileProvider_old";
COMMIT;
