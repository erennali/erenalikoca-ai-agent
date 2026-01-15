'use client';

import { useLanguage } from '@/contexts/language-context';

export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1.5 px-1 py-1">
      <div
        className="w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-bounce"
        style={{ animationDelay: '0ms', animationDuration: '0.8s' }}
      />
      <div
        className="w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-bounce"
        style={{ animationDelay: '200ms', animationDuration: '0.8s' }}
      />
      <div
        className="w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-bounce"
        style={{ animationDelay: '400ms', animationDuration: '0.8s' }}
      />
    </div>
  );
}
