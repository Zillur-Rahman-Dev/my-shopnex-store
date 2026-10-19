'use client'

import React from 'react'

export interface RangeSliderFieldProps {
  label: string
  value?: number | string
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  defaultValue?: number
  description?: string
}

export const RangeSliderField: React.FC<RangeSliderFieldProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = 'px',
  defaultValue = 0,
  description,
}) => {
  // Parse legacy string or number safely
  const numericValue = typeof value === 'number' ? value : parseInt(String(value || defaultValue), 10) || defaultValue

  return (
    <div className="space-y-1.5 rounded-md border border-slate-200 bg-slate-50/70 p-2.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-slate-700">{label}</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={numericValue}
            onChange={(e) => {
              const val = Number(e.target.value)
              onChange(isNaN(val) ? defaultValue : val)
            }}
            className="w-14 rounded border border-slate-300 bg-white px-1.5 py-0.5 text-right font-mono text-xs focus:border-slate-500 focus:outline-hidden"
          />
          <span className="text-[10px] font-medium text-slate-500">{unit}</span>
        </div>
      </div>

      {description && <p className="text-[10px] text-slate-400">{description}</p>}

      {/* Range Slider Bar */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[9px] font-mono text-slate-400">{min}{unit}</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numericValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-slate-900 transition-all hover:bg-slate-300"
        />
        <span className="text-[9px] font-mono text-slate-400">{max}{unit}</span>
      </div>
    </div>
  )
}
