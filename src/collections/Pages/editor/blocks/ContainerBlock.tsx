import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import { WidthControlField, RangeSliderField } from '../components/controls'

export interface ContainerWidthSetting {
  value: number
  unit: 'px' | '%'
}

export interface ContainerBlockProps {
  layout?: 'flex-col' | 'flex-row' | 'grid-2' | 'grid-3' | 'grid-4'
  containerWidth?:
    | 'boxed'
    | 'narrow'
    | 'wide'
    | 'full'
    | ContainerWidthSetting
    | string
  paddingY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string
  paddingX?: 'none' | 'sm' | 'md' | 'lg' | number | string
  marginY?: 'none' | 'sm' | 'md' | 'lg' | number | string
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | number | string
  alignItems?: 'stretch' | 'start' | 'center' | 'end'
  justifyContent?: 'start' | 'center' | 'between' | 'around' | 'end'
  background?: 'transparent' | 'white' | 'muted' | 'slate' | 'primary-subtle' | 'dark'
  borderStyle?: 'none' | 'subtle' | 'card' | 'pill'
  minHeight?: 'auto' | 'screen-half' | 'screen-full'
  customClass?: string
}

export const ContainerBlock: ComponentConfig<ContainerBlockProps> = {
  label: 'Container (Flex / Grid)',
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
      type: 'custom',
      render: ({ value, onChange }) => (
        <WidthControlField value={value as any} onChange={onChange} />
      ),
    },
    paddingY: {
      type: 'custom',
      render: ({ value, onChange }) => (
        <RangeSliderField
          label="Padding Y (Top & Bottom)"
          value={value as any}
          onChange={onChange}
          min={0}
          max={200}
          step={2}
          unit="px"
          defaultValue={56}
          description="Vertical internal spacing"
        />
      ),
    },
    paddingX: {
      type: 'custom',
      render: ({ value, onChange }) => (
        <RangeSliderField
          label="Padding X (Left & Right)"
          value={value as any}
          onChange={onChange}
          min={0}
          max={150}
          step={2}
          unit="px"
          defaultValue={24}
          description="Horizontal internal spacing"
        />
      ),
    },
    gap: {
      type: 'custom',
      render: ({ value, onChange }) => (
        <RangeSliderField
          label="Gap (Between Items)"
          value={value as any}
          onChange={onChange}
          min={0}
          max={100}
          step={2}
          unit="px"
          defaultValue={24}
          description="Spacing between child blocks"
        />
      ),
    },
    marginY: {
      type: 'custom',
      render: ({ value, onChange }) => (
        <RangeSliderField
          label="Margin Y (Outer Spacing)"
          value={value as any}
          onChange={onChange}
          min={0}
          max={150}
          step={2}
          unit="px"
          defaultValue={0}
          description="Vertical outer spacing"
        />
      ),
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
    customClass: {
      type: 'text',
      label: 'Custom Class (CSS Class / Tailwind)',
    },
  },
  defaultProps: {
    layout: 'flex-col',
    containerWidth: { value: 1280, unit: 'px' },
    paddingY: 56,
    paddingX: 24,
    marginY: 0,
    gap: 24,
    alignItems: 'stretch',
    justifyContent: 'start',
    background: 'transparent',
    borderStyle: 'none',
    minHeight: 'auto',
    customClass: '',
  },
  render: ({
    layout = 'flex-col',
    containerWidth = { value: 1280, unit: 'px' },
    paddingY = 56,
    paddingX = 24,
    marginY = 0,
    gap = 24,
    alignItems = 'stretch',
    justifyContent = 'start',
    background = 'transparent',
    borderStyle = 'none',
    minHeight = 'auto',
    customClass = '',
    puck,
  }: any) => {
    // 1. Container Width calculation
    const widthStyle: React.CSSProperties = {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }

    if (containerWidth && typeof containerWidth === 'object' && 'value' in containerWidth) {
      widthStyle.maxWidth = `${containerWidth.value}${containerWidth.unit || 'px'}`
    } else if (typeof containerWidth === 'string') {
      const widthMap: Record<string, string> = {
        boxed: '1280px',
        narrow: '896px',
        wide: '1536px',
        full: '100%',
      }
      widthStyle.maxWidth =
        widthMap[containerWidth] ||
        (containerWidth.endsWith('%') || containerWidth.endsWith('px')
          ? containerWidth
          : '1280px')
    } else if (typeof containerWidth === 'number') {
      widthStyle.maxWidth = `${containerWidth}px`
    } else {
      widthStyle.maxWidth = '1280px'
    }

    // 2. Padding Y calculation
    let pyPx = 56
    if (typeof paddingY === 'number') {
      pyPx = paddingY
    } else if (typeof paddingY === 'string') {
      const legacyPy: Record<string, number> = {
        none: 0,
        xs: 16,
        sm: 32,
        md: 56,
        lg: 80,
        xl: 112,
      }
      pyPx = legacyPy[paddingY] ?? (parseInt(paddingY, 10) || 56)
    }

    // 3. Padding X calculation
    let pxPx = 24
    if (typeof paddingX === 'number') {
      pxPx = paddingX
    } else if (typeof paddingX === 'string') {
      const legacyPx: Record<string, number> = {
        none: 0,
        sm: 16,
        md: 24,
        lg: 48,
      }
      pxPx = legacyPx[paddingX] ?? (parseInt(paddingX, 10) || 24)
    }

    // 4. Margin Y calculation
    let myPx = 0
    if (typeof marginY === 'number') {
      myPx = marginY
    } else if (typeof marginY === 'string') {
      const legacyMy: Record<string, number> = {
        none: 0,
        sm: 16,
        md: 32,
        lg: 64,
      }
      myPx = legacyMy[marginY] ?? (parseInt(marginY, 10) || 0)
    }

    // 5. Gap calculation
    let gapPx = 24
    if (typeof gap === 'number') {
      gapPx = gap
    } else if (typeof gap === 'string') {
      const legacyGap: Record<string, number> = {
        none: 0,
        sm: 12,
        md: 24,
        lg: 36,
        xl: 48,
      }
      gapPx = legacyGap[gap] ?? (parseInt(gap, 10) || 24)
    }

    // 6. Layout mode classes
    const layoutMap: Record<string, string> = {
      'flex-col': 'flex flex-col',
      'flex-row': 'flex flex-row flex-wrap',
      'grid-2': 'grid grid-cols-1 md:grid-cols-2',
      'grid-3': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'grid-4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    }
    const layoutClass = layoutMap[layout as string] || 'flex flex-col'

    // 7. Align items classes
    const alignMap: Record<string, string> = {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    }
    const alignClass = alignMap[alignItems as string] || 'items-stretch'

    // 8. Justify content classes
    const justifyMap: Record<string, string> = {
      start: 'justify-start',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      end: 'justify-end',
    }
    const justifyClass = justifyMap[justifyContent as string] || 'justify-start'

    // 9. Background styling
    const bgMap: Record<string, string> = {
      transparent: 'bg-transparent',
      white: 'bg-background text-foreground',
      muted: 'bg-muted/40 text-foreground',
      slate: 'bg-slate-50 dark:bg-slate-900/40 text-foreground',
      'primary-subtle': 'bg-primary/5 text-foreground',
      dark: 'bg-zinc-950 text-zinc-100',
    }
    const bgClass = bgMap[background as string] || 'bg-transparent'

    // 10. Border & Corner Radius
    const borderMap: Record<string, string> = {
      none: 'border-0 rounded-none',
      subtle: 'border border-border/60 rounded-xl',
      card: 'border border-border rounded-2xl shadow-sm',
      pill: 'border border-border rounded-3xl shadow-md',
    }
    const borderClass = borderMap[borderStyle as string] || 'border-0 rounded-none'

    // 11. Minimum height
    const minHeightMap: Record<string, string> = {
      auto: 'min-h-0',
      'screen-half': 'min-h-[50vh]',
      'screen-full': 'min-h-screen',
    }
    const minHeightClass = minHeightMap[minHeight as string] || 'min-h-0'

    // Section wrapper inline styles for padding and margin
    const sectionStyle: React.CSSProperties = {
      paddingTop: `${pyPx}px`,
      paddingBottom: `${pyPx}px`,
      paddingLeft: `${pxPx}px`,
      paddingRight: `${pxPx}px`,
      marginTop: `${myPx}px`,
      marginBottom: `${myPx}px`,
    }

    // Inner container inline styles for width and gap
    const innerStyle: React.CSSProperties = {
      ...widthStyle,
      gap: `${gapPx}px`,
    }

    // Combine inner layout classes
    const innerClasses = [
      'w-full',
      layoutClass,
      alignClass,
      justifyClass,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <section
        style={sectionStyle}
        className={`w-full transition-colors relative ${bgClass} ${borderClass} ${minHeightClass} ${customClass}`.trim()}
      >
        {puck?.renderDropZone ? (
          puck.renderDropZone({
            zone: 'default',
            className: innerClasses,
            style: innerStyle,
            minEmptyHeight: puck?.isEditing ? 96 : undefined,
          })
        ) : (
          <div className={innerClasses} style={innerStyle} />
        )}
      </section>
    )
  },
}
