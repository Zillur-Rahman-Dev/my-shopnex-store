'use client'

import React, { useState, useEffect } from 'react'
import type { TypographyStyle, SavedClassItem } from './types'
import {
  copyTypographyStyle,
  pasteTypographyStyle,
  getSavedClasses,
  saveClassDefinition,
} from './styleHelper'

interface TypographyControlFieldProps {
  value?: TypographyStyle
  onChange: (value: TypographyStyle) => void
}

const PRESET_COLORS = [
  '#000000',
  '#1e293b',
  '#475569',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#10b981',
  '#2563eb',
  '#8b5cf6',
  '#ffffff',
]

export const TypographyControlField: React.FC<TypographyControlFieldProps> = ({
  value = {},
  onChange,
}) => {
  const [notification, setNotification] = useState<string>('')
  const [savedClasses, setSavedClasses] = useState<SavedClassItem[]>([])
  const [classNameInput, setClassNameInput] = useState<string>(value.customClass || '')

  useEffect(() => {
    setSavedClasses(getSavedClasses())
  }, [])

  useEffect(() => {
    setClassNameInput(value.customClass || '')
  }, [value.customClass])

  const notify = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 2500)
  }

  const handleCopy = () => {
    const ok = copyTypographyStyle(value)
    if (ok) notify('📋 Style copied to clipboard!')
  }

  const handlePaste = () => {
    const pasted = pasteTypographyStyle()
    if (pasted) {
      onChange({ ...value, ...pasted })
      notify('📌 Style pasted successfully!')
    } else {
      notify('⚠️ No copied style found!')
    }
  }

  const handleSaveClass = () => {
    if (!classNameInput.trim()) {
      notify('⚠️ Enter a class name first!')
      return
    }
    const cleanName = classNameInput.trim().replace(/\s+/g, '-')
    saveClassDefinition(cleanName, { ...value, customClass: cleanName })
    setSavedClasses(getSavedClasses())
    onChange({ ...value, customClass: cleanName })
    notify(`💾 Saved class "${cleanName}"!`)
  }

  const handleSelectClass = (selectedName: string) => {
    setClassNameInput(selectedName)
    const found = savedClasses.find((c) => c.name === selectedName)
    if (found) {
      onChange({ ...found.style, customClass: selectedName })
      notify(`⚡ Loaded class "${selectedName}"!`)
    } else {
      onChange({ ...value, customClass: selectedName })
    }
  }

  const updateProp = <K extends keyof TypographyStyle>(key: K, val: TypographyStyle[K]) => {
    onChange({
      ...value,
      [key]: val,
    })
  }

  return (
    <div className="space-y-3.5 rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs">
      {/* 1. Header with Copy / Paste Actions */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            ⚙️ Typography Control Bar
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="text-[11px] font-medium px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            title="Copy all styles from this block"
          >
            📋 Copy Style
          </button>
          <button
            type="button"
            onClick={handlePaste}
            className="text-[11px] font-medium px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            title="Paste copied styles onto this block"
          >
            📌 Paste Style
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="text-[11px] font-semibold text-center py-1 px-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded animate-fade-in">
          {notification}
        </div>
      )}

      {/* 2. Custom Class / Reusable Class System (Webflow / Elementor style) */}
      <div className="rounded-md border border-slate-200 bg-slate-50/70 p-2.5 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-slate-700">
            🏷️ Custom Class (Reusable Style)
          </label>
          <span className="text-[10px] text-slate-400">Reuse on any element</span>
        </div>

        <div className="flex items-center gap-1.5">
          <input
            list="saved-classes-list"
            type="text"
            value={classNameInput}
            onChange={(e) => handleSelectClass(e.target.value)}
            placeholder="e.g. promo-heading, hero-title"
            className="flex-1 text-xs px-2 py-1.5 border border-slate-300 rounded bg-white font-mono focus:outline-hidden focus:border-slate-500"
          />
          <datalist id="saved-classes-list">
            {savedClasses.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </datalist>

          <button
            type="button"
            onClick={handleSaveClass}
            className="text-xs px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded transition-colors shadow-xs whitespace-nowrap"
            title="Save current typography settings under this class name"
          >
            Save Class
          </button>
        </div>

        {savedClasses.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-1">
            <span className="text-[10px] text-slate-500">Quick Classes:</span>
            {savedClasses.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleSelectClass(item.name)}
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                  value.customClass === item.name
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                .{item.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Base Line Color (Color Picker for the whole text) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-slate-700">🎨 Base Text Color</label>
          {value.baseColor && (
            <button
              type="button"
              onClick={() => updateProp('baseColor', undefined)}
              className="text-[10px] text-slate-400 hover:text-slate-600 underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 p-1.5 border border-slate-200 rounded-md bg-slate-50/50">
          <input
            type="color"
            value={value.baseColor?.startsWith('#') ? value.baseColor : '#000000'}
            onChange={(e) => updateProp('baseColor', e.target.value)}
            className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0.5"
            title="Pick base text color"
          />
          <input
            type="text"
            value={value.baseColor || ''}
            onChange={(e) => updateProp('baseColor', e.target.value)}
            placeholder="#000000 or inherit"
            className="w-24 text-xs font-mono px-2 py-1 border border-slate-200 rounded bg-white"
          />
          <div className="flex items-center gap-1 border-l pl-2 border-slate-200 flex-1 overflow-x-auto">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => updateProp('baseColor', c)}
                className={`w-4 h-4 rounded-full border transition-transform ${
                  value.baseColor?.toLowerCase() === c.toLowerCase()
                    ? 'scale-125 border-slate-900 ring-1 ring-slate-400'
                    : 'border-slate-300 hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
                title={`Set base color ${c}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Font Size & Weight Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Font Size</label>
          <select
            value={value.fontSize || 'inherit'}
            onChange={(e) => updateProp('fontSize', e.target.value)}
            className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-hidden focus:border-slate-500"
          >
            <option value="inherit">Default (Inherit)</option>
            <option value="text-xs">XS (12px)</option>
            <option value="text-sm">Small (14px)</option>
            <option value="text-base">Base (16px)</option>
            <option value="text-lg">Large (18px)</option>
            <option value="text-xl">XL (20px)</option>
            <option value="text-2xl">2XL (24px)</option>
            <option value="text-3xl">3XL (30px)</option>
            <option value="text-4xl">4XL (36px)</option>
            <option value="text-5xl">5XL (48px)</option>
            <option value="text-6xl">6XL (60px)</option>
            <option value="text-7xl">7XL (72px)</option>
            <option value="text-8xl">8XL (96px)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Font Weight</label>
          <select
            value={value.fontWeight || 'inherit'}
            onChange={(e) => updateProp('fontWeight', e.target.value)}
            className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-hidden focus:border-slate-500"
          >
            <option value="inherit">Default</option>
            <option value="font-light">Light (300)</option>
            <option value="font-normal">Normal (400)</option>
            <option value="font-medium">Medium (500)</option>
            <option value="font-semibold">Semi-Bold (600)</option>
            <option value="font-bold">Bold (700)</option>
            <option value="font-extrabold">Extra-Bold (800)</option>
            <option value="font-black">Black (900)</option>
          </select>
        </div>
      </div>

      {/* 5. Line Height & Letter Spacing Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Line Height</label>
          <select
            value={value.lineHeight || 'inherit'}
            onChange={(e) => updateProp('lineHeight', e.target.value)}
            className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-hidden focus:border-slate-500"
          >
            <option value="inherit">Default</option>
            <option value="leading-none">None (1.0)</option>
            <option value="leading-tight">Tight (1.25)</option>
            <option value="leading-snug">Snug (1.375)</option>
            <option value="leading-normal">Normal (1.5)</option>
            <option value="leading-relaxed">Relaxed (1.625)</option>
            <option value="leading-loose">Loose (2.0)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Letter Spacing</label>
          <select
            value={value.letterSpacing || 'inherit'}
            onChange={(e) => updateProp('letterSpacing', e.target.value)}
            className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-hidden focus:border-slate-500"
          >
            <option value="inherit">Default</option>
            <option value="tracking-tighter">Tighter (-0.05em)</option>
            <option value="tracking-tight">Tight (-0.025em)</option>
            <option value="tracking-normal">Normal (0)</option>
            <option value="tracking-wide">Wide (0.025em)</option>
            <option value="tracking-wider">Wider (0.05em)</option>
            <option value="tracking-widest">Widest (0.1em)</option>
          </select>
        </div>
      </div>

      {/* 6. Text Transform & Alignment Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Transform</label>
          <select
            value={value.textTransform || 'none'}
            onChange={(e) => updateProp('textTransform', e.target.value as any)}
            className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-hidden focus:border-slate-500"
          >
            <option value="none">None</option>
            <option value="uppercase">UPPERCASE</option>
            <option value="lowercase">lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Alignment</label>
          <div className="grid grid-cols-4 gap-1">
            {(['left', 'center', 'right', 'justify'] as const).map((alignOption) => (
              <button
                key={alignOption}
                type="button"
                onClick={() => updateProp('align', alignOption)}
                className={`py-1 text-[10px] font-medium rounded border capitalize transition-colors ${
                  value.align === alignOption
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {alignOption === 'justify' ? 'Just' : alignOption}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
