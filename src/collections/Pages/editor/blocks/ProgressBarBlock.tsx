'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import { Progress } from '@/components/ui/progress'
import { Flame } from 'lucide-react'

export interface ProgressBarBlockProps {
  title?: string
  value: number
  showValueLabel?: boolean
  caption?: string
  colorTheme?: 'primary' | 'emerald' | 'amber' | 'rose'
  height?: 'sm' | 'md' | 'lg'
  showFireIcon?: boolean
  customClass?: string
}

export const ProgressBarBlock: ComponentConfig<ProgressBarBlockProps> = {
  label: 'Progress Bar / Stock Meter',
  fields: {
    title: { type: 'text', label: 'Progress Title / Label' },
    value: { type: 'number', label: 'Progress Percentage (0 - 100)' },
    showValueLabel: {
      type: 'radio',
      label: 'Show Percentage Text',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    caption: { type: 'text', label: 'Bottom Caption / Stock Note' },
    colorTheme: {
      type: 'select',
      label: 'Bar Color',
      options: [
        { label: 'Brand Theme Primary', value: 'primary' },
        { label: 'Emerald Green (Goal Achieved)', value: 'emerald' },
        { label: 'Amber Orange (Medium Stock)', value: 'amber' },
        { label: 'Rose Red (Almost Sold Out)', value: 'rose' },
      ],
    },
    height: {
      type: 'select',
      label: 'Thickness / Height',
      options: [
        { label: 'Thin (6px)', value: 'sm' },
        { label: 'Medium (12px)', value: 'md' },
        { label: 'Thick (18px)', value: 'lg' },
      ],
    },
    showFireIcon: {
      type: 'radio',
      label: 'Show Fire / Urgency Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    title: 'Almost Sold Out! Limited Batch Remaining',
    value: 82,
    showValueLabel: true,
    caption: '🔥 82% of batch already claimed. Hurry while supplies last!',
    colorTheme: 'rose',
    height: 'md',
    showFireIcon: true,
    customClass: '',
  },
  render: ({
    title = '',
    value = 82,
    showValueLabel = true,
    caption = '',
    colorTheme = 'rose',
    height = 'md',
    showFireIcon = true,
    customClass = '',
  }) => {
    const clampedValue = Math.min(100, Math.max(0, value))

    const heightClass = {
      sm: 'h-1.5',
      md: 'h-3',
      lg: 'h-4',
    }[height] || 'h-3'

    const colorStyle = {
      primary: '[&>div]:bg-primary',
      emerald: '[&>div]:bg-emerald-500',
      amber: '[&>div]:bg-amber-500',
      rose: '[&>div]:bg-rose-500',
    }[colorTheme] || '[&>div]:bg-primary'

    return (
      <div className="w-full my-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-5 rounded-2xl border border-border/70 bg-card/60 shadow-sm ${customClass}`.trim()}>
          {(title || showValueLabel) && (
            <div className="flex items-center justify-between mb-2 gap-2">
              <div className="flex items-center gap-1.5 font-medium text-sm text-foreground">
                {showFireIcon && <Flame className="h-4 w-4 text-rose-500 fill-rose-500 shrink-0" />}
                <span>{title}</span>
              </div>
              {showValueLabel && (
                <span className="text-xs font-bold text-foreground font-mono">
                  {clampedValue}%
                </span>
              )}
            </div>
          )}

          <Progress value={clampedValue} className={`${heightClass} ${colorStyle}`} />

          {caption && (
            <p className="mt-2 text-xs text-muted-foreground leading-normal">
              {caption}
            </p>
          )}
        </div>
      </div>
    )
  },
}
