'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { Code2, Briefcase, Github, Sparkles, Calendar } from 'lucide-react';

interface SuggestionChipsProps {
  onSelect: (prompt: string) => void;
}

export default function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  const { t } = useLanguage();

  const suggestions = [
    {
      icon: Code2,
      label: t.suggestions.skills,
      prompt: t.suggestions.skillsPrompt,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'hover:border-blue-500/50'
    },
    {
      icon: Briefcase,
      label: t.suggestions.projects,
      prompt: t.suggestions.projectsPrompt,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'hover:border-violet-500/50'
    },
    {
      icon: Github,
      label: t.suggestions.github,
      prompt: t.suggestions.githubPrompt,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'hover:border-emerald-500/50'
    },
    {
      icon: Sparkles,
      label: t.suggestions.contact,
      prompt: t.suggestions.contactPrompt,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'hover:border-amber-500/50'
    },
    {
      icon: Calendar,
      label: t.suggestions.schedule,
      prompt: t.suggestions.schedulePrompt,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'hover:border-blue-500/50'
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 w-full max-w-md mx-auto px-4">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => onSelect(suggestion.prompt)}
            className={`group flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 ${suggestion.border} rounded-full transition-all duration-300 backdrop-blur-sm`}
          >
            <Icon className={`w-3 h-3 ${suggestion.color}`} />
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 group-hover:text-white whitespace-nowrap">
              {suggestion.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
