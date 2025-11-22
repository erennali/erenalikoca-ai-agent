'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Languages, FileDown, Github, Linkedin, ExternalLink } from 'lucide-react';
import MessageBubble from './message-bubble';
import TypingIndicator from './typing-indicator';
import SuggestionChips from './suggestion-chips';
import { useLanguage } from '@/contexts/language-context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const prevMessagesLengthRef = useRef(0);

  // Auto-scroll to bottom when new messages arrive (only when message count increases)
  const scrollToBottom = (force = false) => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;

    // Only auto-scroll if user is near bottom or force is true
    if (force || isNearBottom) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  };

  // Scroll only when new message is added (not during loading)
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      // New message added, scroll after a short delay to let content render
      setTimeout(() => {
        scrollToBottom(true);
      }, 300);
      prevMessagesLengthRef.current = messages.length;
    }
  }, [messages]);

  // Scroll when loading finishes (AI response complete)
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      setTimeout(() => {
        scrollToBottom(true);
      }, 500);
    }
  }, [isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language, // Send current language
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content:
          language === 'tr'
            ? `Üzgünüm, bir hata oluştu: ${error.message}. Lütfen tekrar deneyin.`
            : `Sorry, I encountered an error: ${error.message}. Please try again.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#030712] text-slate-200 font-sans selection:bg-violet-500/30">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Header - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 flex-shrink-0 w-full z-50 flex items-center justify-between px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-5 border-b border-white/10 bg-[#030712]/95 backdrop-blur-xl shadow-lg">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="relative group cursor-pointer transition-transform active:scale-95"
              title="Reset Chat"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-full flex items-center justify-center border border-white/10">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
            </button>
            <div>
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight flex items-center gap-2 sm:gap-3">
                {t.title}
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[8px] sm:text-[9px] text-violet-300 font-medium uppercase tracking-wider">
                  Beta
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <motion.a
                href="https://github.com/erennali"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/erenalikoca"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <div className="h-6 w-px bg-white/10 mx-1" />
            </div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all duration-200 group"
            >
              <Languages className="w-4 h-4 text-violet-400 group-hover:text-violet-300" />
              <span className="text-xs font-bold text-slate-300">
                {language === 'en' ? 'TR' : 'EN'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col h-full w-full max-w-7xl mx-auto shadow-2xl shadow-black/50 bg-[#030712]/50 backdrop-blur-sm border-x border-white/5"
      >

        {/* Messages Container - Scrollable area */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar pt-40 pb-48">
          <div className="min-h-full px-4 sm:px-8 pb-4 space-y-8 flex flex-col">
            <AnimatePresence mode="popLayout">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center flex-1 py-10 text-center px-4 pt-8 sm:pt-8"
                >
                  <div className="relative mb-8">
                    <div className="absolute -inset-6 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] flex items-center justify-center border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-violet-400" />
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                    {t.welcome}
                  </h2>
                  <p className="text-slate-400 mb-8 sm:mb-10 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                    {t.welcomeMessage}
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <motion.a
                      href="/ErenAliKoca_CV.pdf"
                      download="ErenAliKoca_CV.pdf"
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-white/5"
                    >
                      <FileDown className="w-5 h-5" />
                      {t.downloadCV}
                    </motion.a>
                    <motion.a
                      href="https://erenalikoca.com"
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-semibold text-sm sm:text-base transition-all backdrop-blur-sm"
                    >
                      <ExternalLink className="w-6 h-6" />
                      Portfolio
                    </motion.a>
                  </div>

                  <SuggestionChips onSelect={handleSuggestionClick} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full pt-8 sm:pt-10 md:pt-12"
                >
                  {messages.map((message, index) => (
                    <MessageBubble
                      key={index}
                      message={message.content}
                      isUser={message.role === 'user'}
                      index={index}
                    />
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl rounded-tl-none px-5 py-4">
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} className="h-4 flex-shrink-0" />
          </div>
        </div>
      </motion.div>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex-shrink-0 p-3 sm:p-4 md:p-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#030712] via-[#030712]/95 to-transparent pt-6 sm:pt-8 md:pt-10 z-40 border-t border-white/5 backdrop-blur-xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative flex items-end gap-2 sm:gap-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-2 sm:p-3 shadow-2xl shadow-violet-500/5 ring-1 ring-white/5 focus-within:ring-violet-500/50 focus-within:border-violet-500/50 transition-all duration-300">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 outline-none resize-none max-h-40 px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base"
              rows={1}
              disabled={isLoading}
            />
            <div className="pb-1.5 pr-1.5">
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg shadow-violet-600/20"
              >
                <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-xs text-slate-600 font-medium">
              Designed by Eren Ali Koca
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
