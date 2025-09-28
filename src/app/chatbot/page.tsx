"use client";
import {
  Conversation,
  ConversationContent,
} from "@/components/ui/shadcn-io/ai/conversation";
import { Loader } from "@/components/ui/shadcn-io/ai/loader";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/shadcn-io/ai/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ui/shadcn-io/ai/prompt-input";
import { Button } from "@/components/ui/button";
import { PaperclipIcon, RotateCcwIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { type FormEventHandler, useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";

type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
  isStreaming?: boolean;
};

const ChatRoom = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const greeting: ChatMessage = {
      id: nanoid(),
      content:
        "Halo 👋, saya siap membantu Anda. Apa yang ingin kita bahas hari ini?",
      role: "assistant",
      timestamp: Date.now(),
    };
    setMessages([greeting]);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: nanoid(),
      content: inputValue.trim(),
      role: "user",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const aiMessageId = nanoid();
    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        content: "",
        role: "assistant",
        timestamp: Date.now(),
        isStreaming: true,
      },
    ]);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      const fullReply = data.reply ?? "No reply";

      // Simulasi streaming bohongan
      let index = 0;
      const interval = setInterval(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  content: fullReply.slice(0, index),
                  isStreaming: index < fullReply.length,
                }
              : msg
          )
        );

        index++;
        if (index > fullReply.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 1); // kecepatan "mengetik" (ms per karakter)
    } catch (err) {
      console.error("❌ Error fetch:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          content: "⚠️ Sorry, something went wrong.",
          role: "assistant",
          timestamp: Date.now(),
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInputValue("");
    setIsTyping(false);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="overflow-hidden">
        <SiteHeader />
        <div className="flex h-[calc(100vh-var(--header-height))] overflow-hidden">
          {/* Chat area */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500" />
                    <span className="font-medium text-sm">AI Assistant</span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <span className="text-muted-foreground text-xs">
                    IBM Granite 3.3 Instruct
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-8 px-2"
                >
                  <RotateCcwIcon className="size-4" />
                  <span className="ml-1">Reset</span>
                </Button>
              </div>

              {/* Conversation */}
              <Conversation className="flex-1 overflow-y-auto">
                <ConversationContent className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-3">
                      <Message from={message.role}>
                        <MessageContent>
                          {message.isStreaming && message.content === "" ? (
                            <div className="flex items-center gap-2">
                              <Loader size={14} />
                              <span className="text-muted-foreground text-sm">
                                Thinking...
                              </span>
                            </div>
                          ) : (
                            message.content
                          )}
                        </MessageContent>
                        <MessageAvatar
                          src={
                            message.role === "user"
                              ? ""
                              : "https://nanasgunung.com/nanas.png"
                          }
                          name={message.role === "user" ? "User" : "AI"}
                        />
                      </Message>
                    </div>
                  ))}
                </ConversationContent>
              </Conversation>

              {/* Input */}
              <div className="border-t p-4">
                <PromptInput onSubmit={handleSubmit}>
                  <PromptInputTextarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything regarding your content plan..."
                    disabled={isTyping}
                  />
                  <PromptInputToolbar>
                    <PromptInputTools>
                      <PromptInputButton disabled={isTyping}>
                        <PaperclipIcon size={16} />
                      </PromptInputButton>
                    </PromptInputTools>
                    <PromptInputSubmit
                      disabled={!inputValue.trim() || isTyping}
                      status={isTyping ? "streaming" : "ready"}
                    />
                  </PromptInputToolbar>
                </PromptInput>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatRoom;
