-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."PostStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'POSTED', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."AssetType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterTable
ALTER TABLE "public"."Asset" ADD COLUMN     "type" "public"."AssetType" NOT NULL DEFAULT 'IMAGE';

-- AlterTable
ALTER TABLE "public"."ScheduledPost" ADD COLUMN     "captionOverride" TEXT,
ADD COLUMN     "status" "public"."PostStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "public"."Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AIGeneration" ADD CONSTRAINT "AIGeneration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduledPost" ADD CONSTRAINT "ScheduledPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduledPost" ADD CONSTRAINT "ScheduledPost_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "public"."AIGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
