'use client'

import React, { useRef, useState, useEffect } from 'react'
import { sanitizeRichText } from './styleHelper'

interface RichTextInputFieldProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  rows?: number
}

const PRESET_COLORS = [
  '#000000',
  '#64748b',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#10b981',
  '#2563eb',
  '#8b5cf6',
  '#ec4899',
]

export const RichTextInputField: React.FC<RichTextInputFieldProps> = ({
  value = '',
  onChange,
  label = 'Content (Supports Individual Letter/Word Colors)',
  placeholder = 'Type text here, highlight any letters or words to color them...',
  rows = 3,
}) => {
  const [highlightColor, setHighlightColor] = useState<string>('#ef4444')
  const [selectionNotice, setSelectionNotice] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Clear notice after 3 seconds
  useEffect(() => {
    if (selectionNotice) {
      const timer = setTimeout(() => setSelectionNotice(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [selectionNotice])

  const applyColorToSelection = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) {
      setSelectionNotice('⚠️ Please highlight/select 1 or more letters first!')
      return
    }

    const originalText = value || ''
    const selectedText = originalText.substring(start, end)

    if (!selectedText) {
      setSelectionNotice('⚠️ Please highlight/select 1 or more letters first!')
      return
    }

    const coloredSnippet = `<span style="color: ${highlightColor}">${selectedText}</span>`
    const updatedValue =
      originalText.substring(0, start) + coloredSnippet + originalText.substring(end)

    onChange(updatedValue)
    setSelectionNotice(`✅ Colored "${selectedText}" with ${highlightColor}`)

    // Keep focus
    setTimeout(() => {
      textarea.focus()
    }, 50)
  }

  const clearAllInlineColors = () => {
    if (!value) return
    // Remove span tags but keep inner text
    const cleanText = value.replace(/<span\s+style="color:\s*[^"]+">([\s\S]*?)<\/span>/gi, '$1')
    onChange(cleanText)
    setSelectionNotice('🧹 Removed all inline letter colors')
  }

  return (
    <div className="space-y-2.5 rounded-lg border border-slate-200 bg-slate-50/70 p-3 shadow-xs">
      {/* Header & Controls */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">{label}</label>
          {value && value.includes('<span') && (
            <button
              type="button"
              onClick={clearAllInlineColors}
              className="text-[11px] text-slate-500 hover:text-red-600 transition-colors underline"
              title="Remove color spans"
            >
              Clear Letter Colors
            </button>
          )}
        </div>

        {/* Letter Color Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-md bg-white border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500 mr-1">Letter Color:</span>

          {/* Color preview & picker */}
          <div className="relative flex items-center">
            <input
              type="color"
              value={highlightColor.startsWith('#') ? highlightColor : '#ef4444'}
              onChange={(e) => setHighlightColor(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border border-slate-300 p-0.5"
              title="Choose custom letter color"
            />
          </div>

          <input
            type="text"
            value={highlightColor}
            onChange={(e) => setHighlightColor(e.target.value)}
            className="w-16 text-[11px] font-mono px-1.5 py-0.5 border border-slate-200 rounded"
            placeholder="#ef4444"
          />

          {/* Preset Swatches */}
          <div className="flex items-center gap-1 ml-1 border-l pl-1.5 border-slate-200">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setHighlightColor(color)}
                className={`w-4 h-4 rounded-full border transition-transform ${
                  highlightColor.toLowerCase() === color.toLowerCase()
                    ? 'scale-125 border-slate-900 ring-1 ring-slate-400'
                    : 'border-slate-300 hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
                title={`Set color ${color}`}
              />
            ))}
          </div>

          {/* Apply Button */}
          <button
            type="button"
            onClick={applyColorToSelection}
            className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors shadow-xs"
            title="Highlight letters below and click to color"
          >
            🎨 Color Selected
          </button>
        </div>
      </div>

      {/* Status Notice */}
      {selectionNotice && (
        <div className="text-[11px] font-medium px-2 py-1 rounded bg-slate-200/70 text-slate-800">
          {selectionNotice}
        </div>
      )}

      {/* Textarea */}
      <div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full text-xs p-2 rounded-md border border-slate-300 bg-white font-mono focus:border-slate-500 focus:outline-hidden leading-relaxed"
        />
        <p className="text-[10px] text-slate-500 mt-0.5">
          💡 <strong>Tip:</strong> Select any 1 letter, 2 letters, or word above, then click &quot;Color Selected&quot;.
        </p>
      </div>

      {/* Live Preview */}
      <div className="p-2.5 rounded-md border border-dashed border-slate-300 bg-white">
        <div className="text-[10px] font-semibold uppercase text-slate-400 mb-1">Live Preview:</div>
        <div
          className="text-sm font-medium text-slate-900 break-words"
          dangerouslySetInnerHTML={{
            __html: sanitizeRichText(value) || '<span class="text-slate-400 italic">Empty text</span>',
          }}
        />
      </div>
    </div>
  )
}
