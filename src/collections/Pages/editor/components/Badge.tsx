import React from 'react'
import { ComponentConfig } from '@puckeditor/core'

export interface BadgeProps {
  text: string
  align?: 'left' | 'center' | 'right'
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'outline'
  position?: 'inline' | 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right'
  size?: 'sm' | 'md' | 'lg'
}

export const BadgeComponent = ({
  text = 'New Feature',
  align = 'center',
  variant = 'primary',
  position = 'inline',
  size = 'md',
}: BadgeProps) => {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-500 text-white',
    outline: 'border-2 border-primary text-primary bg-primary/5',
  }

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-4 py-1.5 font-semibold',
    lg: 'text-base px-5 py-2 font-bold',
  }

  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  // If floating is explicitly requested inside another component
  const isFloating = position && position !== 'inline'

  if (isFloating) {
    const positionClasses: Record<string, string> = {
      'top-right': 'absolute -top-3 -right-3 z-10',
      'bottom-left': 'absolute -bottom-3 -left-3 z-10',
      'top-left': 'absolute -top-3 -left-3 z-10',
      'bottom-right': 'absolute -bottom-3 -right-3 z-10',
    }

    return (
      <span
        className={`rounded-full shadow-lg ${variantClasses[variant] || variantClasses.primary} ${
          sizeClasses[size] || sizeClasses.sm
        } ${positionClasses[position] || ''}`}
      >
        {text}
      </span>
    )
  }

  // Standalone mode in Puck Editor
  return (
    <div className={`w-full py-4 flex ${alignClasses[align] || 'justify-center'}`}>
      <span
        className={`inline-flex items-center rounded-full shadow-sm transition-all ${
          sizeClasses[size] || sizeClasses.md
        } ${variantClasses[variant] || variantClasses.primary}`}
      >
        {text || 'Badge'}
      </span>
    </div>
  )
}

export const Badge: ComponentConfig<BadgeProps> = {
  label: 'Info Badge',
  render: BadgeComponent,
  fields: {
    text: {
      type: 'text',
      label: 'Badge Text',
    },
    align: {
      type: 'radio',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    variant: {
      type: 'select',
      label: 'Color Style',
      options: [
        { label: 'Primary Brand', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success Green', value: 'success' },
        { label: 'Warning Amber', value: 'warning' },
        { label: 'Outline Tag', value: 'outline' },
      ],
    },
    size: {
      type: 'radio',
      label: 'Badge Size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
  },
  defaultProps: {
    text: 'Special Offer',
    align: 'center',
    variant: 'primary',
    size: 'md',
    position: 'inline',
  },
}
