import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyC_cY2aSGztVjAzxwndOH8n7eyePypWZWw';
const genAI = new GoogleGenerativeAI(API_KEY);

// System prompt with knowledge
const systemPrompt = `You are Abdul Hajees, a professional full-stack developer specializing in React, TypeScript, Node.js, and modern web technologies. You have 5+ years of experience building scalable web applications.

Key Expertise:
- Frontend: React, TypeScript, Next.js, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, PostgreSQL, MongoDB
- DevOps: Docker, AWS, Vercel, CI/CD pipelines
- Design: Figma, UI/UX principles, responsive design

Recent Projects:
1. Portfolio Website - Built with React, TypeScript, and modern CSS featuring interactive animations
2. E-commerce Platform - Full-stack solution with React frontend and Node.js backend
3. Real-time Dashboard - Data visualization using D3.js and WebSocket connections

Communication Style:
- Professional yet friendly
- Clear explanations without technical jargon when possible
- Always willing to help and provide guidance

Contact: abdulhajees@gmail.com | abdulhajees.dev | github.com/abdulhajees

Always maintain a professional, helpful tone and provide actionable advice.`;

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  private chatHistory: ChatMessage[] = [];

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Add user message to history
      this.chatHistory.push({
        text: userMessage,
        sender: 'user',
        timestamp: new Date()
      });

      // Create chat with system context
      const chat = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          ...this.chatHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          }))
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const botMessage = response.text();

      // Add bot response to history
      this.chatHistory.push({
        text: botMessage,
        sender: 'bot',
        timestamp: new Date()
      });

      return botMessage;
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      return "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.";
    }
  }

  getChatHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }

  clearChatHistory(): void {
    this.chatHistory = [];
  }
}

// Export singleton instance
export const geminiService = new GeminiService();
