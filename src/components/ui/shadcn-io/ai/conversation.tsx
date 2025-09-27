"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ConversationProps = React.HTMLAttributes<HTMLDivElement>;

export const Conversation = ({
  className,
  children,
  ...props
}: ConversationProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Auto scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [children, isAtBottom]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    setIsAtBottom(isBottom);
  };

  return (
    <div
      className={cn("relative flex-1 overflow-hidden", className)}
      {...props}
    >
      <ScrollArea className="h-full w-full" onScroll={handleScroll}>
        <div className="p-4 space-y-4">
          {children}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      {!isAtBottom && (
        <Button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full shadow"
          size="icon"
          variant="outline"
          onClick={() =>
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ArrowDownIcon className="size-4" />
        </Button>
      )}
    </div>
  );
};

export const ConversationContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-4", className)} {...props} />
);
