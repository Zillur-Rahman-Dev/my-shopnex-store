'use client'

import React from 'react'

export interface ContainerWidthValue {
  value: number
  unit: 'px' | '%'
}

export interface WidthControlFieldProps {
  value?: ContainerWidthValue | string
  onChange: (value: ContainerWidthValue) => void
}

export const WidthControlField: React.FC<WidthControlFieldProps> = ({
  value,
  onChange,
}) => {
  // Parse legacy string or object
  const parseValue = (): ContainerWidthValue => {
    if (!value) return { value: 1280, unit: 'px' }
    if (typeof value === 'object' && 'value' in value && 'unit' in value) {
      return value
    }
    // Handle legacy strings
    const str = String(value).toLowerCase()
    if (str === 'full' || str === '100%') return { value: 100, unit: '%' }
    if (str === 'narrow' || str === '896px') return { value: 896, unit: 'px' }
    if (str === 'wide' || str === '1536px') return { value: 1536, unit: 'px' }
    if (str === 'boxed' || str === '1280px') return { value: 1280, unit: 'px' }
    
    // Check if string ends with %
    if (str.endsWith('%')) {
      const num = parseInt(str, 10)
      return { value: isNaN(num) ? 100 : num, unit: '%' }
    }
    // Default to px
    const num = parseInt(str, 10)
    return { value: isNaN(num) ? 1280 : num, unit: 'px' }
  }

  const current = parseValue()
  const isPercent = current.unit === '%'

  const handleUnitToggle = (newUnit: 'px' | '%') => {
    if (newUnit === current.unit) return
    if (newUnit === '%') {
      onChange({ value: 100, unit: '%' })
    } else {
      onChange({ value: 1280, unit: 'px' })
    }
  }

  const min = isPercent ? 10 : 320
  const max = isPercent ? 100 : 1920
  const step = isPercent ? 1 : 10

  return (
    <div className="space-y-2 rounded-md border border-slate-200 bg-slate-50/70 p-2.5">
      {/* Top Header: Label & Unit Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-slate-700">Container Width</label>
        
        <div className="flex items-center gap-1.5">
          {/* Unit Toggle Buttons (PX vs %) */}
          <div className="inline-flex rounded-md border border-slate-300 bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => handleUnitToggle('px')}
              className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase transition-colors ${
                !isPercent
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PX
            </button>
            <button
              type="button"
              onClick={() => handleUnitToggle('%')}
              className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase transition-colors ${
                isPercent
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              %
            </button>
          </div>

          {/* Number Input */}
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={min}
              max={isPercent ? 100 : 2560}
              step={step}
              value={current.value}
              onChange={(e) => {
                const val = Number(e.target.value)
                onChange({
                  value: isNaN(val) ? (isPercent ? 100 : 1280) : val,
                  unit: current.unit,
                })
              }}
              className="w-16 rounded border border-slate-300 bg-white px-1.5 py-0.5 text-right font-mono text-xs focus:border-slate-500 focus:outline-hidden"
            />
            <span className="text-[10px] font-semibold text-slate-500">{current.unit}</span>
          </div>
        </div>
      </div>

      {/* Slider Bar Control */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[9px] font-mono text-slate-400">{min}{current.unit}</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={current.value}
          onChange={(e) =>
            onChange({
              value: Number(e.target.value),
              unit: current.unit,
            })
          }
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-slate-900 transition-all hover:bg-slate-300"
        />
        <span className="text-[9px] font-mono text-slate-400">{max}{current.unit}</span>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center gap-1 pt-0.5">
        <span className="text-[9px] text-slate-400">Quick:</span>
        {isPercent ? (
          <>
            {[50, 75, 90, 100].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => onChange({ value: pct, unit: '%' })}
                className={`rounded border px-1.5 py-0.5 text-[9px] font-mono transition-colors ${
                  current.value === pct
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {pct}%
              </button>
            ))}
          </>
        ) : (
          <>
            {[
              { label: '896px', val: 896 },
              { label: '1280px', val: 1280 },
              { label: '1536px', val: 1536 },
              { label: '1920px', val: 1920 },
            ].map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => onChange({ value: p.val, unit: 'px' })}
                className={`rounded border px-1.5 py-0.5 text-[9px] font-mono transition-colors ${
                  current.value === p.val
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
