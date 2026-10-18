import React from 'react'
import { ComponentConfig } from '@puckeditor/core'

export interface ContainerBlockProps {
  layout?: 'flex-col' | 'flex-row' | 'grid-2' | 'grid-3' | 'grid-4'
  containerWidth?: 'boxed' | 'narrow' | 'wide' | 'full'
  paddingY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  paddingX?: 'none' | 'sm' | 'md' | 'lg'
  marginY?: 'none' | 'sm' | 'md' | 'lg'
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  alignItems?: 'stretch' | 'start' | 'center' | 'end'
  justifyContent?: 'start' | 'center' | 'between' | 'around' | 'end'
  background?: 'transparent' | 'white' | 'muted' | 'slate' | 'primary-subtle' | 'dark'
  borderStyle?: 'none' | 'subtle' | 'card' | 'pill'
  minHeight?: 'auto' | 'screen-half' | 'screen-full'
}

export const ContainerBlock: ComponentConfig<ContainerBlockProps> = {
  label: '📦 Container (Flex / Grid)',
  fields: {
    layout: {
      type: 'select',
      label: 'Layout Mode',
      options: [
        { label: '↕️ Flex Column (Vertical Stack)', value: 'flex-col' },
        { label: '↔️ Flex Row (Horizontal Wrap)', value: 'flex-row' },
        { label: '⊞ Grid (2 Columns)', value: 'grid-2' },
        { label: '⊞ Grid (3 Columns)', value: 'grid-3' },
        { label: '⊞ Grid (4 Columns)', value: 'grid-4' },
      ],
    },
    containerWidth: {
      type: 'select',
      label: 'Container Width',
      options: [
        { label: 'Boxed (Standard - 1280px)', value: 'boxed' },
        { label: 'Narrow (Centered - 896px)', value: 'narrow' },
        { label: 'Wide (Large - 1536px)', value: 'wide' },
        { label: 'Full Width (100% Screen)', value: 'full' },
      ],
    },
    paddingY: {
      type: 'select',
      label: 'Padding Y (Vertical Spacing)',
      options: [
        { label: 'None (0px)', value: 'none' },
        { label: 'XS (16px)', value: 'xs' },
        { label: 'Small (32px)', value: 'sm' },
        { label: 'Medium (56px)', value: 'md' },
        { label: 'Large (80px)', value: 'lg' },
        { label: 'XL (112px)', value: 'xl' },
      ],
    },
    paddingX: {
      type: 'select',
      label: 'Padding X (Horizontal Spacing)',
      options: [
        { label: 'None (0px)', value: 'none' },
        { label: 'Small (16px)', value: 'sm' },
        { label: 'Medium (24px - Default)', value: 'md' },
        { label: 'Large (48px)', value: 'lg' },
      ],
    },
    marginY: {
      type: 'select',
      label: 'Margin Y (Outer Spacing)',
      options: [
        { label: 'None (0px)', value: 'none' },
        { label: 'Small (16px)', value: 'sm' },
        { label: 'Medium (32px)', value: 'md' },
        { label: 'Large (64px)', value: 'lg' },
      ],
    },
    gap: {
      type: 'select',
      label: 'Gap (Between Items)',
      options: [
        { label: 'None (0px)', value: 'none' },
        { label: 'Small (12px)', value: 'sm' },
        { label: 'Medium (24px - Default)', value: 'md' },
        { label: 'Large (36px)', value: 'lg' },
        { label: 'XL (48px)', value: 'xl' },
      ],
    },
    alignItems: {
      type: 'select',
      label: 'Align Items (Cross Axis)',
      options: [
        { label: 'Stretch (Full Size)', value: 'stretch' },
        { label: 'Start (Top / Left)', value: 'start' },
        { label: 'Center (Middle)', value: 'center' },
        { label: 'End (Bottom / Right)', value: 'end' },
      ],
    },
    justifyContent: {
      type: 'select',
      label: 'Justify Content (Main Axis)',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'Space Between', value: 'between' },
        { label: 'Space Around', value: 'around' },
        { label: 'End', value: 'end' },
      ],
    },
    background: {
      type: 'select',
      label: 'Background Style',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'White / Theme Surface', value: 'white' },
        { label: 'Muted Light Gray', value: 'muted' },
        { label: 'Soft Slate', value: 'slate' },
        { label: 'Brand Subtle Tint', value: 'primary-subtle' },
        { label: 'Dark Charcoal', value: 'dark' },
      ],
    },
    borderStyle: {
      type: 'select',
      label: 'Border & Rounded Corners',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Subtle Border (Rounded)', value: 'subtle' },
        { label: 'Card (Border + Shadow)', value: 'card' },
        { label: 'Pill / 3XL (Deep Rounded)', value: 'pill' },
      ],
    },
    minHeight: {
      type: 'select',
      label: 'Minimum Height',
      options: [
        { label: 'Auto (Content Height)', value: 'auto' },
        { label: 'Half Screen (50vh)', value: 'screen-half' },
        { label: 'Full Screen (100vh)', value: 'screen-full' },
      ],
    },
  },
  defaultProps: {
    layout: 'flex-col',
    containerWidth: 'boxed',
    paddingY: 'md',
    paddingX: 'md',
    marginY: 'none',
    gap: 'md',
    alignItems: 'stretch',
    justifyContent: 'start',
    background: 'transparent',
    borderStyle: 'none',
    minHeight: 'auto',
  },
  render: ({
    layout = 'flex-col',
    containerWidth = 'boxed',
    paddingY = 'md',
    paddingX = 'md',
    marginY = 'none',
    gap = 'md',
    alignItems = 'stretch',
    justifyContent = 'start',
    background = 'transparent',
    borderStyle = 'none',
    minHeight = 'auto',
    puck,
  }: any) => {
    // 1. Vertical padding classes
    const pyClass = {
      none: 'py-0',
      xs: 'py-4',
      sm: 'py-8',
      md: 'py-14',
      lg: 'py-20',
      xl: 'py-28',
    }[paddingY] || 'py-14'

    // 2. Horizontal padding classes
    const pxClass = {
      none: 'px-0',
      sm: 'px-4',
      md: 'px-6 md:px-8',
      lg: 'px-8 md:px-12',
    }[paddingX] || 'px-6 md:px-8'

    // 3. Margin vertical classes
    const myClass = {
      none: 'my-0',
      sm: 'my-4',
      md: 'my-8',
      lg: 'my-16',
    }[marginY] || 'my-0'

    // 4. Container max-width
    const widthClass = {
      boxed: 'max-w-7xl mx-auto',
      narrow: 'max-w-4xl mx-auto',
      wide: 'max-w-[1536px] mx-auto',
      full: 'w-full',
    }[containerWidth] || 'max-w-7xl mx-auto'

    // 5. Gap classes
    const gapClass = {
      none: 'gap-0',
      sm: 'gap-3',
      md: 'gap-6',
      lg: 'gap-9',
      xl: 'gap-12',
    }[gap] || 'gap-6'

    // 6. Layout mode classes
    const layoutClass = {
      'flex-col': 'flex flex-col',
      'flex-row': 'flex flex-row flex-wrap',
      'grid-2': 'grid grid-cols-1 md:grid-cols-2',
      'grid-3': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'grid-4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    }[layout] || 'flex flex-col'

    // 7. Align items classes
    const alignClass = {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    }[alignItems] || 'items-stretch'

    // 8. Justify content classes
    const justifyClass = {
      start: 'justify-start',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      end: 'justify-end',
    }[justifyContent] || 'justify-start'

    // 9. Background styling
    const bgClass = {
      transparent: 'bg-transparent',
      white: 'bg-background text-foreground',
      muted: 'bg-muted/40 text-foreground',
      slate: 'bg-slate-50 dark:bg-slate-900/40 text-foreground',
      'primary-subtle': 'bg-primary/5 text-foreground',
      dark: 'bg-zinc-950 text-zinc-100',
    }[background] || 'bg-transparent'

    // 10. Border & Corner Radius
    const borderClass = {
      none: 'border-0 rounded-none',
      subtle: 'border border-border/60 rounded-xl',
      card: 'border border-border rounded-2xl shadow-sm',
      pill: 'border border-border rounded-3xl shadow-md',
    }[borderStyle] || 'border-0 rounded-none'

    // 11. Minimum height
    const minHeightClass = {
      auto: 'min-h-0',
      'screen-half': 'min-h-[50vh]',
      'screen-full': 'min-h-screen',
    }[minHeight] || 'min-h-0'

    // Combine inner layout classes
    const innerClasses = [
      'w-full',
      widthClass,
      layoutClass,
      gapClass,
      alignClass,
      justifyClass,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <section
        className={`w-full transition-colors relative ${bgClass} ${borderClass} ${pyClass} ${pxClass} ${myClass} ${minHeightClass}`}
      >
        {puck?.isEditing ? (
          puck?.renderDropZone ? (
            puck.renderDropZone({
              zone: 'default',
              className: innerClasses,
              minEmptyHeight: 96,
            })
          ) : (
            <div className={innerClasses} />
          )
        ) : (
          <div className={innerClasses}>
            {puck?.renderDropZone ? (
              puck.renderDropZone({
                zone: 'default',
              })
            ) : null}
          </div>
        )}
      </section>
    )
  },
}
