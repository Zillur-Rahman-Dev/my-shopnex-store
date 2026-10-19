'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import { Separator } from '@/components/ui/separator'

export interface SeparatorBlockProps {
  label?: string
  styleType?: 'line' | 'gradient' | 'dashed' | 'dotted'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  width?: 'full' | 'half' | 'third'
  customClass?: string
}

export const SeparatorBlock: ComponentConfig<SeparatorBlockProps> = {
  label: 'Separator / Section Divider',
  fields: {
    label: { type: 'text', label: 'Center Text / Icon Label (Optional)' },
    styleType: {
      type: 'select',
      label: 'Divider Style',
      options: [
        { label: 'Subtle Line', value: 'line' },
        { label: 'Gradient Fade', value: 'gradient' },
        { label: 'Dashed Line', value: 'dashed' },
        { label: 'Dotted Line', value: 'dotted' },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Vertical Spacing',
      options: [
        { label: 'Small (16px)', value: 'sm' },
        { label: 'Medium (32px)', value: 'md' },
        { label: 'Large (64px)', value: 'lg' },
        { label: 'Extra Large (96px)', value: 'xl' },
      ],
    },
    width: {
      type: 'select',
      label: 'Divider Width',
      options: [
        { label: 'Full Width (100%)', value: 'full' },
        { label: 'Half Width (50%)', value: 'half' },
        { label: 'One Third Width (33%)', value: 'third' },
      ],
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    label: '',
    styleType: 'gradient',
    spacing: 'md',
    width: 'full',
    customClass: '',
  },
  render: ({
    label = '',
    styleType = 'gradient',
    spacing = 'md',
    width = 'full',
    customClass = '',
  }) => {
    const spacingClasses = {
      sm: 'my-4',
      md: 'my-8',
      lg: 'my-16',
      xl: 'my-24',
    }[spacing] || 'my-8'

    const widthClasses = {
      full: 'w-full',
      half: 'w-1/2 mx-auto',
      third: 'w-1/3 mx-auto',
    }[width] || 'w-full'

    const lineClasses = {
      line: 'border-t border-border',
      gradient: 'h-[1px] bg-gradient-to-r from-transparent via-border to-transparent',
      dashed: 'border-t border-dashed border-border',
      dotted: 'border-t border-dotted border-border',
    }[styleType] || 'border-t border-border'

    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {label ? (
          <div className={`relative flex items-center justify-center ${spacingClasses} ${widthClasses} ${customClass}`.trim()}>
            <div className={`w-full ${lineClasses}`} />
            <span className="absolute bg-background px-4 text-xs uppercase tracking-wider font-medium text-muted-foreground">
              {label}
            </span>
          </div>
        ) : (
          <div className={`${spacingClasses} ${widthClasses} ${customClass}`.trim()}>
            <div className={lineClasses} />
          </div>
        )}
      </div>
    )
  },
}
