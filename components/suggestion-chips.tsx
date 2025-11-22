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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl mx-auto px-4">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            onClick={() => onSelect(suggestion.prompt)}
            className={`group flex items-center gap-4 p-4 text-left bg-white/5 hover:bg-white/10 border border-white/5 ${suggestion.border} rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm`}
          >
            <div className={`p-3 rounded-xl ${suggestion.bg} ${suggestion.color} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                {suggestion.label}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 group-hover:text-slate-400">
                Click to ask
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
