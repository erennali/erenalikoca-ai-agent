'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Globe, FileText, ExternalLink, ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function ContactCard() {
  const { language } = useLanguage();

  const contacts = [
    {
      icon: Mail,
      label: language === 'tr' ? 'Email Gönder' : 'Send Email',
      value: 'eren_ali_koca@hotmail.com',
      href: 'mailto:eren_ali_koca@hotmail.com',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Phone,
      label: language === 'tr' ? 'Ara' : 'Call',
      value: '+90 505 091 09 00',
      href: 'tel:+905050910900',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'erenalikoca',
      href: 'https://www.linkedin.com/in/erenalikoca',
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'erennali',
      href: 'https://github.com/erennali',
      color: 'from-gray-700 to-gray-900',
    },
    {
      icon: Globe,
      label: 'Medium',
      value: '@erenali',
      href: 'https://erenali.medium.com',
      color: 'from-slate-600 to-slate-800',
    },
    {
      icon: FileText,
      label: language === 'tr' ? 'CV İndir' : 'Download CV',
      value: 'PDF',
      href: '/ErenAliKoca_CV.pdf',
      download: true,
      color: 'from-violet-600 to-purple-600',
    },
    {
      icon: Calendar,
      label: language === 'tr' ? 'Görüşme Planla' : 'Schedule a Call',
      value: language === 'tr' ? 'Calendly' : 'Calendly',
      href: 'https://calendly.com/erenalikoca/meet',
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400">
            <Mail className="w-4 h-4" />
          </span>
          {language === 'tr' ? 'İletişim Kanalları' : 'Contact Channels'}
        </h3>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          {language === 'tr' ? 'Müsait' : 'Available'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.download ? '_blank' : contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              download={contact.download ? 'ErenAliKoca_CV.pdf' : undefined}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden flex items-center gap-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 border border-white/5 hover:border-violet-500/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${contact.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 z-10">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-violet-300 transition-colors font-semibold">
                  {contact.label}
                </p>
                <p className="text-xs sm:text-sm font-medium text-white truncate group-hover:text-white/90">
                  {contact.value}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
