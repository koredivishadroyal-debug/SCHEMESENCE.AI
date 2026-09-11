import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  User, 
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { getTranslation } from '../services/translations';

interface AiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialContextPrompt?: string | null;
}

export const AiChatbotModal: React.FC<AiChatbotModalProps> = ({
  isOpen,
  onClose,
  language,
  initialContextPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: language === 'Hindi'
        ? 'नमस्ते! मैं स्कीमसेंस एआई सलाहकार हूँ। आप किसी भी सरकारी योजना, पात्रता नियमों या आवश्यक दस्तावेजों के बारे में मुझसे पूछ सकते हैं।'
        : language === 'Telugu'
        ? 'నమస్కారం! నేను స్కీమ్‌సెన్స్ AI సలహాదారుని. కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ పథకాలు, అర్హత నిబంధనలు లేదా అవసరమైన పత్రాల గురించి మీరు నన్ను అడగవచ్చు.'
        : 'Welcome to the SchemeSense Official Advisory Console. You may inquire regarding eligibility thresholds, direct benefit transfers, documentary prerequisites, and authentic government application portals.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = (key: string) => getTranslation(key, language);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialContextPrompt && isOpen) {
      sendMessage(initialContextPrompt);
    }
  }, [initialContextPrompt, isOpen]);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'Telugu' ? 'te-IN' : language === 'Hindi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const speakMessage = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'Telugu' ? 'te-IN' : language === 'Hindi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Chatbot response error');
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || 'I am ready to help you navigate government schemes.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'I apologize for the delay. You can review verified scheme guidelines directly on official portals such as pmkisan.gov.in, scholarships.gov.in, or pmjay.gov.in.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF9F5] w-full max-w-2xl h-[90vh] max-h-[750px] rounded-3xl shadow-2xl border border-[#DFDACD] overflow-hidden flex flex-col">
        {/* Deep Forest / Charcoal Header */}
        <div className="px-6 py-5 bg-[#08110D] text-white flex items-center justify-between border-b border-[#155C45]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#155C45] flex items-center justify-center text-white border border-emerald-500/30">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg font-bold text-white tracking-tight">
                  SchemeSense Advisory Console
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#D88932]/20 text-[#D88932] border border-[#D88932]/30">
                  GovTech AI
                </span>
              </div>
              <p className="text-xs text-stone-300 font-mono flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Grounded in official ministry notifications</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close advisory console"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF9F5]">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                    isAi
                      ? 'bg-[#155C45] text-white'
                      : 'bg-[#08110D] text-white'
                  }`}
                >
                  {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div className="max-w-[85%] sm:max-w-[80%]">
                  {isAi && (
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-mono text-[#155C45] font-bold uppercase tracking-wider">
                        Grounded in Ministry Guidelines 2026
                      </span>
                    </div>
                  )}

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? 'bg-white border border-[#DFDACD] text-[#08110D] shadow-xs'
                        : 'bg-[#08110D] text-white font-medium'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Micro action bar */}
                  <div className={`flex items-center gap-3 mt-1.5 px-1 text-[11px] font-mono text-[#88908A] ${
                    isAi ? '' : 'justify-end'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {isAi && (
                      <button
                        onClick={() => speakMessage(msg.id, msg.text)}
                        className="hover:text-[#08110D] transition cursor-pointer flex items-center gap-1"
                        title="Listen to message"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${speakingMessageId === msg.id ? 'text-[#155C45] animate-bounce' : ''}`} />
                        <span>{speakingMessageId === msg.id ? 'Stop' : 'Listen'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#155C45] p-3 bg-white rounded-xl border border-[#DFDACD] max-w-fit">
              <Sparkles className="w-4 h-4 text-[#155C45] animate-spin" />
              <span>Analyzing official gazette notifications & rule criteria...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Editorial Prompt Chips */}
        <div className="px-4 py-2.5 bg-white border-t border-[#EAE6DB] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-mono text-[10px] font-bold text-[#6C746E] uppercase shrink-0">Inquire:</span>
          {[
            'Am I eligible for PM-KISAN?',
            'Schemes for women entrepreneurs in Telangana',
            'Documents needed for post-matric scholarship',
            'Ayushman Bharat 70+ enrolment procedure',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#08110D] border border-[#DFDACD] shrink-0 cursor-pointer transition text-left text-xs font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#EAE6DB]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                  : 'bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#545B56] border-[#DFDACD]'
              }`}
              title={isListening ? 'Listening...' : 'Voice Query'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? 'Listening to your speech...' : 'Type your scheme inquiry (e.g. age limits, subsidy amount, docs)...'}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#DFDACD] focus:border-[#155C45] focus:outline-hidden text-xs sm:text-sm text-[#08110D] bg-[#FAF9F5] font-medium"
            />

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#08110D] hover:bg-[#155C45] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[10px] font-mono text-[#88908A] text-center mt-2">
            Advisory responses are grounded in verified government notifications. Always complete submissions on official .gov.in portals.
          </p>
        </div>
      </div>
    </div>
  );
};
