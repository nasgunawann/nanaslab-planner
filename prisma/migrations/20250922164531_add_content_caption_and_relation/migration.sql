/*
  Warnings:

  - Added the required column `contentId` to the `ScheduledPost` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `platform` on the `ScheduledPost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."ScheduledPost" DROP CONSTRAINT "ScheduledPost_generationId_fkey";

-- AlterTable
ALTER TABLE "public"."Content" ADD COLUMN     "caption" TEXT,
ADD COLUMN     "generationId" TEXT;

-- AlterTable
ALTER TABLE "public"."ScheduledPost" ADD COLUMN     "contentId" TEXT NOT NULL,
ALTER COLUMN "generationId" DROP NOT NULL,
DROP COLUMN "platform",
ADD COLUMN     "platform" "public"."SocialPlatform" NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ScheduledPost" ADD CONSTRAINT "ScheduledPost_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduledPost" ADD CONSTRAINT "ScheduledPost_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "public"."AIGeneration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Content" ADD CONSTRAINT "Content_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "public"."AIGeneration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
