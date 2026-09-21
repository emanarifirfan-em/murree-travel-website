import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  PhoneCall, 
  Compass, 
  MapPin, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Bot,
  User,
  ExternalLink
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  model?: string;
  source?: string;
}

interface AiTravelConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchBooking: (details?: any) => void;
}

export const AiTravelConcierge: React.FC<AiTravelConciergeProps> = ({
  isOpen,
  onClose,
  onLaunchBooking
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: 'Good day. I am your Murree Classic Travel Concierge, connected directly to our headquarters at GPO Chowk, Bank Road. How may I assist your journey across Murree and the Galiyat today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const smartPrompts = [
    'Winter snowfall and road conditions?',
    'Romantic 3-day honeymoon package to Bhurban?',
    'Mukshpuri Top trek difficulty & best season?',
    'Toyota Prado 4x4 daily rental rate with driver?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Send to server-side Gemini endpoint with history context
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }))
        })
      });
      const data = await res.json();

      const assistantMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: data.reply || "Thank you. Our travel team at GPO Chowk is pleased to assist. Would you like to reserve a customized journey or speak on WhatsApp?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model,
        source: data.source
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Concierge API error:", err);
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: "I am having trouble connecting to live satellite telemetry right now. You can speak directly with our senior mountain travel team on WhatsApp at +92 321 5603396 or visit our desk at GPO Chowk, Bank Road, Murree.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4">
      <div className="relative w-full sm:max-w-xl h-[90vh] sm:h-[650px] bg-white border border-[#d6e2db] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn text-[#122319]">
        {/* Concierge Light Header */}
        <div className="px-5 py-4 bg-[#f8faf9] border-b border-[#e2ece6] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#183e2b] border border-[#b88a29] flex items-center justify-center text-[#f2ce79] shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-bold text-[#122319] tracking-tight">Murree AI Concierge</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#eaf2ed] border border-[#cbdad1] text-[9px] font-mono text-[#183e2b] font-bold">
                  GEMINI 3.8
                </span>
              </div>
              <div className="text-[11px] text-[#5e776a] flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#b88a29]" />
                <span>GPO Chowk Desk • Active Mountain Specialist</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#5e776a] hover:text-[#122319] bg-[#edf3f0] hover:bg-[#e2ece6] transition-colors cursor-pointer"
            aria-label="Close Concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body (Light Clean Background) */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm bg-[#ffffff]">
          {messages.map((m) => {
            const isBot = m.role === 'assistant';
            return (
              <div
                key={m.id}
                className={`flex items-start space-x-2.5 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs shadow-xs ${
                  isBot ? 'bg-[#183e2b] border border-[#b88a29] text-[#f2ce79]' : 'bg-[#edf3f0] text-[#183e2b]'
                }`}>
                  {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed shadow-xs ${
                  isBot
                    ? 'bg-[#f0f4f1] text-[#122319] rounded-tl-xs'
                    : 'bg-[#183e2b] text-white rounded-tr-xs'
                }`}>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    {m.text.split('\n').map((line, lIdx) => {
                      const trimmed = line.trim();
                      if (!trimmed) return <div key={lIdx} className="h-1" />;

                      // Render bold segments cleanly
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
                      const contentText = isBullet ? trimmed.replace(/^[-*]\s*/, '') : trimmed;

                      return (
                        <p key={lIdx} className={isBullet ? 'flex items-start space-x-1.5 my-0.5' : ''}>
                          {isBullet && <span className={isBot ? 'text-[#b88a29]' : 'text-[#f2ce79]'}>•</span>}
                          <span>
                            {parts.map((p, pIdx) => {
                              if (p.startsWith('**') && p.endsWith('**')) {
                                return (
                                  <strong 
                                    key={pIdx} 
                                    className={`font-semibold ${isBot ? 'text-[#0d1c13]' : 'text-white'}`}
                                  >
                                    {p.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return <span key={pIdx}>{p}</span>;
                            })}
                          </span>
                        </p>
                      );
                    })}
                  </div>

                  <div className={`flex items-center justify-end space-x-2 mt-1.5 text-[10px] ${
                    isBot ? 'text-[#7a9285]' : 'text-white/70'
                  }`}>
                    {isBot && m.source === 'gemini_realtime' && (
                      <span className="mr-auto text-[10px] text-[#183e2b] font-medium flex items-center space-x-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#b88a29]" />
                        <span>AI</span>
                      </span>
                    )}
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-2 text-[#5e776a] text-xs pl-9">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b88a29] animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#b88a29] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#b88a29] animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] text-[#5e776a] font-medium">Checking Murree alpine records...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Intelligent Quick Prompts (Light Pill Bar) */}
        <div className="px-4 py-2 bg-[#f8faf9] border-t border-[#e2ece6] flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-xs flex-shrink-0">
          {smartPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#eef5f1] border border-[#d2dfd7] hover:border-[#183e2b] text-[#244332] text-[11px] font-medium whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar & Action CTAs (Light Container) */}
        <div className="p-3.5 bg-[#f8faf9] border-t border-[#e2ece6] space-y-2.5 flex-shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask about snowfall, Bhurban luxury hotels, treks, 4x4 rates..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#cadad0] text-[#122319] placeholder:text-[#7f988b] focus:border-[#183e2b] focus:ring-1 focus:ring-[#183e2b] focus:outline-none text-xs"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#183e2b] hover:bg-[#23533a] text-white font-bold transition-all disabled:opacity-40 shadow-xs cursor-pointer"
              title="Send Message"
            >
              <Send className="w-4 h-4 text-[#f2ce79]" />
            </button>
          </form>

          {/* Direct WhatsApp & Booking Row */}
          <div className="flex items-center justify-between pt-1 text-xs px-1">
            <button
              onClick={() => {
                onClose();
                onLaunchBooking();
              }}
              className="text-[#a87920] hover:text-[#885f13] hover:underline flex items-center space-x-1 font-bold cursor-pointer"
            >
              <span>Book Journey</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent("Hello Murree Classic Travel, I was chatting with your AI Concierge and would like to speak directly with an agent.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#183e2b] hover:text-emerald-700 flex items-center space-x-1 font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#b88a29]" />
              <span>Talk to Human (+92 321 5603396)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
