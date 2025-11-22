'use client';

import { useLanguage } from '@/contexts/language-context';

export default function TypingIndicator() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center space-x-2 px-4 py-3 bg-slate-800 rounded-2xl rounded-bl-sm w-fit">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '1s' }}
        />
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: '150ms', animationDuration: '1s' }}
        />
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: '300ms', animationDuration: '1s' }}
        />
      </div>
      <span className="text-xs sm:text-sm text-slate-400">{t.typing}</span>
    </div>
  );
}
