// src/lib/schemas/content.ts
import { z } from "zod";

export const ContentSchema = z.object({
  title: z.string().min(3),
  caption: z.string().optional(),
  tag: z.string().optional(),
  deadline: z.coerce.date().optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]),
  sosmed: z.enum(["INSTAGRAM", "TIKTOK", "YOUTUBE", "FACEBOOK", "TWITTER"]),
});

export type ContentInput = z.infer<typeof ContentSchema>;
