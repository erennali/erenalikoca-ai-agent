'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Languages, FileDown, Github, Linkedin, ExternalLink, Calendar } from 'lucide-react';
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
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when new messages arrive (only when message count increases)
  const scrollToBottom = (force = false, delay = 300) => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;

    // Only auto-scroll if user is near bottom or force is true
    if (force || isNearBottom) {
      // Clear any existing scroll timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        scrollTimerRef.current = setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          } else {
            // Fallback: scroll container directly
            container.scrollTop = container.scrollHeight;
          }
          scrollTimerRef.current = null;
        }, delay);
      });
    }
  };

  // Scroll only when new message is added
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      // New message added, scroll after a short delay to let content render
      // But skip if loading (typing indicator scroll will handle it)
      if (!isLoading) {
        scrollToBottom(true, 300);
      }
      prevMessagesLengthRef.current = messages.length;
    }
  }, [messages, isLoading]);

  // Scroll when loading starts (typing indicator appears)
  useEffect(() => {
    if (isLoading && messagesContainerRef.current) {
      const container = messagesContainerRef.current;

      // Aggressive scroll function that tries multiple times
      const forceScroll = () => {
        if (container) {
          // Direct scroll to bottom - most reliable method
          container.scrollTop = container.scrollHeight;
        }
      };

      // Try immediately
      forceScroll();

      // Use requestAnimationFrame for next frame
      requestAnimationFrame(() => {
        forceScroll();
        requestAnimationFrame(() => {
          forceScroll();
        });
      });

      // Also try with delays to catch typing indicator after animation completes
      const timers = [
        setTimeout(forceScroll, 200),
        setTimeout(forceScroll, 400),
        setTimeout(forceScroll, 600),
        setTimeout(forceScroll, 800),
        setTimeout(forceScroll, 1000),
      ];

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
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
      <header className="fixed top-0 left-0 right-0 flex-shrink-0 w-full z-50 flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-white/10 bg-[#030712]/95 backdrop-blur-xl shadow-lg">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="relative group cursor-pointer transition-transform active:scale-95"
              title="Reset Chat"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-slate-900 rounded-full flex items-center justify-center border border-white/10">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
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
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar pt-20 pb-32">
          <div className="min-h-full px-3 sm:px-6 pb-4 space-y-4 flex flex-col">
            <AnimatePresence mode="popLayout">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center flex-1 py-6 text-center px-4 pt-4 sm:pt-6"
                >
                  <div className="relative mb-5">
                    <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[1.5rem] flex items-center justify-center border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-violet-400" />
                    </div>
                  </div>

                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                    {t.welcome}
                  </h2>
                  <p className="text-slate-400 mb-6 sm:mb-8 max-w-xl text-xs sm:text-sm leading-relaxed">
                    {t.welcomeMessage}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <motion.a
                      href="/ErenAliKoca_CV.pdf"
                      download="ErenAliKoca_CV.pdf"
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md shadow-white/5"
                    >
                      <FileDown className="w-4 h-4" />
                      {t.downloadCV}
                    </motion.a>
                    <motion.a
                      href="https://calendly.com/erenalikoca/meet"
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20"
                    >
                      <Calendar className="w-4 h-4" />
                      {t.suggestions.schedule}
                    </motion.a>
                    <motion.a
                      href="https://erenalikoca.com"
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium text-xs sm:text-sm transition-all backdrop-blur-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Portfolio
                    </motion.a>
                  </div>

                  <SuggestionChips onSelect={handleSuggestionClick} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-3 sm:gap-4 w-full pt-4 sm:pt-6"
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
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      {/* AI Avatar for Typing */}
                      <div className="flex-shrink-0 relative">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center shadow-md">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#030712]"></div>
                      </div>

                      {/* Typing Bubble */}
                      <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl rounded-tl-sm px-3 py-2.5 shadow-sm">
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
      <div className="fixed bottom-0 left-0 right-0 flex-shrink-0 p-2 sm:p-3 md:p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#030712] via-[#030712]/95 to-transparent pt-4 sm:pt-6 z-40 border-t border-white/5 backdrop-blur-xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative flex items-end gap-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 sm:p-2 shadow-xl shadow-violet-500/5 ring-1 ring-white/5 focus-within:ring-violet-500/50 focus-within:border-violet-500/50 transition-all duration-300">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 outline-none resize-none max-h-32 px-3 py-2.5 sm:px-4 sm:py-3 text-sm"
              rows={1}
              disabled={isLoading}
            />
            <div className="pb-1.5 pr-1.5">
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md shadow-violet-600/20"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-slate-600 font-medium">
              Designed by Eren Ali Koca
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
