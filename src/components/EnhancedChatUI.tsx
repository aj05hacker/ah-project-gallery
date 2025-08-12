import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, X, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { geminiService, ChatMessage } from '@/services/geminiService';

interface EnhancedChatUIProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedChatUI: React.FC<EnhancedChatUIProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = inputValue.trim();
      setInputValue('');
      setIsLoading(true);

      // Add user message to state
      const newMessages = [...messages, {
        text: userMessage,
        sender: 'user' as const,
        timestamp: new Date()
      }];
      setMessages(newMessages);

      try {
        const botResponse = await geminiService.sendMessage(userMessage);
        setMessages(prev => [...prev, {
          text: botResponse,
          sender: 'bot' as const,
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, {
          text: "I apologize, but I'm having trouble connecting to the AI service. Please try again.",
          sender: 'bot' as const,
          timestamp: new Date()
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClearChat = () => {
    geminiService.clearChatHistory();
    setMessages([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-24 right-6 w-96 h-[500px] bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50',
        'border border-border/50',
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-surface-1/50 to-surface-2/50 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by Gemini</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-12 h-12 text-muted-foreground mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-1">Welcome to AI Chat</h4>
            <p className="text-xs text-muted-foreground max-w-[200px]">
              Ask me anything about web development, my experience, or how I can help with your project.
            </p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-300',
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.sender === 'bot' && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            
            <div
              className={cn(
                'max-w-[70%] px-3 py-2 rounded-2xl text-sm leading-relaxed',
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
                  : 'bg-secondary/80 text-foreground rounded-bl-sm'
              )}
            >
              <div className="whitespace-pre-wrap">{message.text}</div>
              <div className={cn(
                'text-xs mt-1',
                message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-2 animate-in fade-in duration-300">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-secondary/80 text-foreground px-3 py-2 rounded-2xl rounded-bl-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-gradient-to-r from-surface-1/50 to-surface-2/50 rounded-b-2xl">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 bg-background/50 border border-border/50 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={cn(
              'p-2 rounded-xl transition-all duration-200',
              inputValue.trim() && !isLoading
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 shadow-lg'
                : 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedChatUI;
