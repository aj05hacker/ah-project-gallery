import React, { useState, useEffect, useRef } from 'react';
import { Send, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import './ChatUI.css';

interface Message { text: string; sender: 'user' | 'bot'; timestamp: Date; }
interface ChatUIProps { isOpen: boolean; onClose: () => void; }

const ChatUI: React.FC<ChatUIProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [apiWarning, setApiWarning] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load knowledge base (from public)
  useEffect(() => {
    const load = async () => {
      try {
    const r = await fetch('/knowledge.txt'); // Ensure only public/knowledge.txt is used
        if (!r.ok) throw new Error('HTTP ' + r.status);
        setKnowledgeBase(await r.text());
      } catch (e) {
    setKnowledgeBase(''); // If not found, leave empty (no fallback)
      }
    };
    load();
  }, []);

  // Auto scroll & animate
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const timer = setTimeout(() => {
      document.querySelectorAll('.message-enter:not(.message-enter-active)')
        .forEach(el => el.classList.add('message-enter-active'));
    }, 40);
    return () => clearTimeout(timer);
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: "Hey there! 👋 I'm AH Assistant — built by Abdul to help you explore his work. Ask about projects, skills, experience, or how to reach him.", sender: 'bot', timestamp: new Date() }]);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen, messages.length]);

  // Detect mobile & lock scroll when open on mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = originalOverflow; };
    }
  }, [isMobile, isOpen]);

  // Use visualViewport to adapt to mobile keyboard height so input stays visible
  useEffect(() => {
    if (!isOpen) return;
    const vv: any = (window as any).visualViewport;
    if (!vv) return; // fallback handled by CSS 100dvh
    const handler = () => {
      // Use the smaller of layout viewport height or visualViewport height to avoid jump when keyboard closes
      setViewportHeight(vv.height);
    };
    vv.addEventListener('resize', handler);
    vv.addEventListener('scroll', handler);
    handler();
    return () => {
      vv.removeEventListener('resize', handler);
      vv.removeEventListener('scroll', handler);
    };
  }, [isOpen]);

  const getFallbackResponse = (raw: string) => {
    const m = raw.toLowerCase();
    if (/project|work|portfolio/.test(m)) return "Abdul's project gallery showcases web apps, AI experiments, and creative UI builds 🚀 — feel free to explore it above. Any specific type you're curious about?";
    if (/contact|email|hire/.test(m)) return "You can reach Abdul at me@abdulhajees.in or connect via LinkedIn (linkedin.com/in/abdulhajees). 📬";
    if (/skill|tech|stack|technology/.test(m)) return "He works with React, TypeScript, Node.js, Tailwind, modern UX patterns, plus clean backend services and practical AI integrations.";
    if (/hello|hi|hey/.test(m)) return "Hi! 👋 Ask me about Abdul's experience, stack, or a project area you're interested in.";
    return "I'm in fallback mode right now, but you can still ask about Abdul's skills, projects, or how to contact him.";
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || /demo-key|your_gemini_api_key_here|^\s*$/.test(apiKey)) {
      setApiWarning('Missing Gemini API key (VITE_GEMINI_API_KEY). Using fallback.');
      setUsingFallback(true);
      return getFallbackResponse(userMessage);
    }
    try {
      setUsingFallback(false);
    const prompt = `You are AH Assistant on Abdul Hajees' portfolio site. You were built by Abdul to help visitors learn about him. Never mention internal model names or providers (e.g. Gemini, OpenAI); just act as AH Assistant. Use ONLY the provided knowledge below when relevant; if something is missing, be transparent and suggest contacting him.\n\nKNOWLEDGE BASE (verbatim, can use HTML/CSS if user asks):\n${knowledgeBase.slice(0, 12000)}\n\nSTYLE & RULES:\n- Refer to Abdul in third person ("Abdul", "he").\n- Tone: concise, warm, professional, with a light friendly spark.\n- Up to 2 tasteful emojis max when they add clarity or warmth.\n- If unsure / missing data: state that and invite the user to email him (me@abdulhajees.in).\n- Avoid over-selling; answer directly first, then optionally one helpful suggestion.\n- Support markdown, HTML, and CSS in your answers.\n- If the user asks for styled output, you may use <style> tags or inline styles.\n\nUSER QUESTION: ${userMessage}\n\nProvide the best helpful answer now:`;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 256 }
        })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      let text = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join(' ').trim();
      if (!text) {
        if (data?.candidates?.[0]?.finishReason === 'SAFETY') {
          return 'That got filtered for safety. Could you rephrase? Maybe ask about Abdul\'s skills or a project area.';
        }
        throw new Error('Empty response');
      }
      // Light cleanup
      text = text.replace(/^\s+|\s+$/g, '').replace(/\*\*(.*?)\*\*/g, '$1');
      return text;
    } catch (e: any) {
      setApiWarning(e?.message || 'Gemini error');
      setUsingFallback(true);
      return getFallbackResponse(userMessage);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    const content = inputValue.trim();
    setInputValue('');
    const userMsg: Message = { text: content, sender: 'user', timestamp: new Date() };
    setMessages(m => [...m, userMsg]);
    setIsTyping(true);
    const reply = await generateAIResponse(content);
    // small natural delay
    setTimeout(() => {
      setMessages(m => [...m, { text: reply, sender: 'bot', timestamp: new Date() }]);
      setIsTyping(false);
    }, 400);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // Basic lightweight markdown renderer (supports code blocks, inline code, bold, italics, lists, links)
    // Render markdown, HTML, and CSS (dangerouslySetInnerHTML for bot)
    const renderBotResponse = (text: string) => {
      // If the response contains <html>, <body>, or <style> tags, render as-is
      // Otherwise, wrap in a <div> for markdown/HTML
      return <div className="whitespace-pre-wrap break-words prose prose-invert prose-p:my-2 prose-ul:my-2 prose-li:my-0 prose-pre:my-3 prose-code:text-[0.75rem] max-w-none" dangerouslySetInnerHTML={{ __html: text }} />;
    };

  const renderInline = (segment: string): React.ReactNode => {
    // links
    let html = segment
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|\s)_(.*?)_($|\s)/g, '$1<em>$2</em>$3')
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted/60 text-xs">$1</code>')
      .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline decoration-dotted hover:text-fuchsia-400">$1<\/a>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div
      className={cn(
        'fixed z-50',
        // Mobile full-screen styles
        isMobile
          ? 'inset-0 w-screen max-w-none h-[100dvh] rounded-none border-0 mx-0' // 100dvh for modern browsers
          : 'bottom-6 right-6 w-full max-w-sm sm:max-w-md lg:max-w-lg h-[500px] sm:h-[540px] mx-4 sm:mx-0 rounded-xl border',
        'bg-background/95 backdrop-blur-xl border-border shadow-2xl flex flex-col',
        'transition-all duration-500 ease-out z-50',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-background/40 before:to-background/20 before:rounded-xl before:-z-10',
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      )}
      style={{
        boxShadow: isOpen ? 'var(--shadow-elev)' : 'none',
        height: isMobile && viewportHeight ? `${viewportHeight}px` : undefined,
        // Safe-area padding for iOS
        paddingBottom: isMobile ? 'env(safe-area-inset-bottom)' : undefined
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <video src="/robot-active.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
          </div>
          <div className="leading-tight">
            <h3 className="font-semibold text-sm">AH Assistant</h3>
            <p className="text-[11px] text-muted-foreground flex items-center gap-2">
              <span className={usingFallback ? 'text-amber-500' : 'text-emerald-500'}>{usingFallback ? 'Fallback' : 'Live'}</span>
            </p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="w-8 h-8 rounded-full hover:bg-accent flex items-center justify-center transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      {apiWarning && (
        <div className="px-4 py-2 text-xs text-amber-500 border-b border-border/50 bg-amber-500/5">
          {apiWarning}
        </div>
      )}
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-none space-y-4 min-h-0"
        style={{
          // Ensure the scroll area doesn't get hidden behind the keyboard; subtract approximate input height on mobile with viewport override
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} className={cn('flex gap-3 message-enter', msg.sender === 'user' ? 'flex-row-reverse' : '')}>
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0',
              msg.sender === 'user' ? 'bg-gradient-to-br from-fuchsia-500 to-cyan-400' : 'bg-gradient-to-br from-blue-500 to-purple-600')}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <video src="/robot-active.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />}
            </div>
            <div className={cn('max-w-[75%] p-3 rounded-xl text-sm leading-relaxed',
              msg.sender === 'user'
                ? 'bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10 border border-fuchsia-500/20'
                : 'bg-muted/50 border border-border/50')}
            >
              {msg.sender === 'bot' ? (
                renderBotResponse(msg.text)
              ) : (
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              )}
              <time className="text-[10px] text-muted-foreground block mt-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <video src="/robot-active.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
            </div>
            <div className="bg-muted/50 border border-border/50 p-3 rounded-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '120ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '240ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        style={{
          position: isMobile ? 'sticky' : undefined,
          bottom: isMobile ? 0 : undefined,
          left: 0,
          right: 0,
          paddingBottom: isMobile ? 'calc(env(safe-area-inset-bottom) + 1rem)' : undefined
        }}
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={onKey}
            disabled={isTyping}
            className={cn('flex-1 px-3 py-2 bg-background border border-input rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm placeholder:text-muted-foreground',
              'disabled:opacity-50 disabled:cursor-not-allowed')}
            placeholder={isTyping ? 'AI is thinking…' : 'Ask about skills, projects…'}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
            className={cn('px-3 py-2 bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-white rounded-lg',
              'hover:from-fuchsia-600 hover:to-cyan-500 transition-all',
              'disabled:opacity-50 disabled:cursor-not-allowed')}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
