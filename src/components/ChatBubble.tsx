
import React from 'react';
import { cn } from '@/lib/utils';
import './ChatBubble.css';

interface ChatBubbleProps {
  isOpen: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ isOpen }) => {
  return (
    <div
      className={cn(
        'absolute bottom-20 right-0 px-3 py-2 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-lg',
        'text-sm font-medium text-foreground whitespace-nowrap transition-all duration-300',
        'before:absolute before:top-full before:right-4 before:border-4 before:border-transparent before:border-t-border',
        'after:absolute after:top-full after:right-4 before:border-4 before:border-transparent before:border-t-background/95 after:translate-y-[-1px]',
        'opacity-0 scale-95 pointer-events-none'
      )}
    >
    </div>
  );
};

export default ChatBubble;
