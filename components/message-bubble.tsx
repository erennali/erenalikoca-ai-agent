'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { User, Bot, Sparkles } from 'lucide-react';
import ContactCard from './contact-card';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  index: number;
}

export default function MessageBubble({
  message,
  isUser,
  index,
}: MessageBubbleProps) {
  // Detect if message contains contact-related keywords
  const shouldShowContactCard = !isUser && (
    message.toLowerCase().includes('iletişim') ||
    message.toLowerCase().includes('contact') ||
    message.toLowerCase().includes('email') ||
    message.toLowerCase().includes('mail') ||
    message.toLowerCase().includes('telefon') ||
    message.toLowerCase().includes('phone') ||
    message.toLowerCase().includes('ulaş') ||
    message.toLowerCase().includes('reach out') ||
    message.toLowerCase().includes('get in touch')
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex items-start gap-3 sm:gap-5 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 relative">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shadow-lg ${isUser
          ? 'bg-gradient-to-br from-violet-600 to-blue-600'
          : 'bg-slate-800 border border-white/10'
          }`}>
          {isUser ? (
            <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          ) : (
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-violet-400" />
          )}
        </div>
        {!isUser && (
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#030712]"></div>
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[92%] sm:max-w-[85%] md:max-w-[80%]`}>
        <div
          className={`relative px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 rounded-3xl shadow-sm ${isUser
            ? 'bg-gradient-to-br from-violet-600/90 to-blue-600/90 text-white rounded-tr-sm backdrop-blur-sm'
            : 'bg-white/5 text-slate-200 rounded-tl-sm border border-white/5 backdrop-blur-md'
            }`}
        >
          {isUser ? (
            <p className="text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message}</p>
          ) : (
            <div className="prose prose-invert prose-xs sm:prose-sm md:prose-base max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-3 last:mb-0 leading-relaxed text-xs sm:text-sm text-slate-300">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-white text-xs sm:text-sm md:text-base">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-900/50 text-violet-300 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-white/5">
                      {children}
                    </code>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 my-3 marker:text-violet-500">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 my-3 marker:text-violet-500">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-xs sm:text-sm text-slate-300">{children}</li>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-violet-400 hover:text-violet-300 underline decoration-violet-400/30 hover:decoration-violet-300 transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-bold text-white text-sm sm:text-base md:text-lg mt-4 mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-violet-500 rounded-full inline-block"></span>
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-3 border-violet-500/30 pl-4 my-3 italic text-xs sm:text-sm text-slate-400">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Show interactive contact card if AI mentions contact info */}
        {shouldShowContactCard && (
          <div className="mt-6">
            <ContactCard />
          </div>
        )}

        {/* Timestamp or Status (Optional) */}
        <div className={`mt-2 flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </motion.div>
  );
}
