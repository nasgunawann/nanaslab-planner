// src/types/chat.ts
export type ChatRole = "user" | "assistant";

export interface UIMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export type ChatStatus = "ready" | "submitted" | "streaming" | "error";
