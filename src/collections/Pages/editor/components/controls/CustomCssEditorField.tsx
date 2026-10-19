'use client'

import React, { useState } from 'react'

export interface CustomCssEditorFieldProps {
  label: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  isGlobal?: boolean
}

const CSS_SNIPPETS = [
  {
    name: 'Glass Card',
    css: `.glass-card {
  background: rgba(255, 255, 255, 0.25) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08) !important;
}`,
  },
  {
    name: 'Neon Glow',
    css: `.neon-glow {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6) !important;
  transition: all 0.3s ease !important;
}
.neon-glow:hover {
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.9) !important;
  transform: translateY(-3px) !important;
}`,
  },
  {
    name: 'Hover Float',
    css: `.hover-float {
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}
.hover-float:hover {
  transform: translateY(-6px) !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
}`,
  },
  {
    name: 'Gradient Text',
    css: `.gradient-text {
  background: linear-gradient(135deg, #2563eb, #ec4899) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}`,
  },
  {
    name: 'Soft Pulse',
    css: `@keyframes pulseSlow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.03); }
}
.pulse-slow {
  animation: pulseSlow 3s infinite ease-in-out !important;
}`,
  },
]

export const CustomCssEditorField: React.FC<CustomCssEditorFieldProps> = ({
  label,
  value = '',
  onChange,
  placeholder,
  isGlobal = false,
}) => {
  const [copiedNotice, setCopiedNotice] = useState('')

  const insertSnippet = (snippetCss: string) => {
    const separator = value.trim() ? '\n\n' : ''
    const updated = (value || '').trim() + separator + snippetCss
    onChange(updated)
    setCopiedNotice('✅ Snippet inserted!')
    setTimeout(() => setCopiedNotice(''), 2500)
  }

  return (
    <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-800">{label}</span>
          {isGlobal && (
            <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-700">
              STORE-WIDE
            </span>
          )}
        </div>

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[10px] text-slate-400 hover:text-red-600 underline"
          >
            Clear CSS
          </button>
        )}
      </div>

      <p className="text-[10px] text-slate-500">
        Write CSS classes here (e.g. <code className="font-mono text-slate-700">.my-class &#123; ... &#125;</code>) then write the class name in any block&apos;s <strong>Custom Class</strong> field!
      </p>

      {/* Snippets Toolbar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-500">Quick Snippets:</span>
          {copiedNotice && <span className="text-[10px] font-bold text-emerald-600">{copiedNotice}</span>}
        </div>
        <div className="flex flex-wrap gap-1">
          {CSS_SNIPPETS.map((snip) => (
            <button
              key={snip.name}
              type="button"
              onClick={() => insertSnippet(snip.css)}
              className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-100 transition-colors shadow-2xs"
            >
              + {snip.name}
            </button>
          ))}
        </div>
      </div>

      {/* CSS Code Textarea */}
      <div className="relative rounded-md border border-slate-300 bg-slate-900 shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1 text-[10px] text-slate-400 font-mono">
          <span>CSS Code Editor</span>
          <span>{value ? `${value.split('\n').length} lines` : 'empty'}</span>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          placeholder={placeholder || '/* Write CSS rules here...\n.my-custom-class {\n  border: 2px solid #3b82f6;\n  border-radius: 12px;\n} */'}
          className="w-full bg-slate-900 p-3 font-mono text-xs text-emerald-400 placeholder-slate-600 focus:outline-hidden leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
