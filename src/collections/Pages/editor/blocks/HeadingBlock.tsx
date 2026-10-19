import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import {
  type TypographyStyle,
  TypographyControlField,
  RichTextInputField,
  resolveTypographyClasses,
  sanitizeRichText,
} from '../components/typography'

export interface HeadingBlockProps {
  title: string
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  align?: 'left' | 'center' | 'right' | 'justify'
  containerWidth?: 'contained' | 'fluid'
  typography?: TypographyStyle
  customClass?: string
  baseColor?: string
}

const DEFAULT_LEVEL_SIZES: Record<string, string> = {
  h1: 'text-4xl md:text-5xl',
  h2: 'text-3xl md:text-4xl',
  h3: 'text-2xl md:text-3xl',
  h4: 'text-xl md:text-2xl',
  h5: 'text-lg md:text-xl',
  h6: 'text-base md:text-lg',
}

const VALID_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
  label: 'Heading (H1 - H6)',
  fields: {
    level: {
      type: 'select',
      label: 'Heading Tag',
      options: [
        { label: 'H1 - Main Title', value: 'h1' },
        { label: 'H2 - Section Title', value: 'h2' },
        { label: 'H3 - Subsection Title', value: 'h3' },
        { label: 'H4 - Small Heading', value: 'h4' },
        { label: 'H5 - Minor Heading', value: 'h5' },
        { label: 'H6 - Smallest Heading', value: 'h6' },
      ],
    },
    containerWidth: {
      type: 'select',
      label: 'Container Width',
      options: [
        { label: '📦 Contained Standard (1280px)', value: 'contained' },
        { label: '↔️ Fluid / Inherit (For Cards & Grids)', value: 'fluid' },
      ],
    },
    title: {
      type: 'custom',
      render: ({ value, onChange }) => (
        <RichTextInputField
          value={value}
          onChange={onChange}
          label="Heading Content (Color 1, 2, or any letters/words)"
          placeholder="e.g. Welcome to ShopNex Mega Store"
          rows={3}
        />
      ),
    },
    typography: {
      type: 'custom',
      render: ({ value, onChange }) => (
        <TypographyControlField value={value || {}} onChange={onChange} />
      ),
    },
  },
  defaultProps: {
    title: 'Your Heading Here',
    level: 'h2',
    containerWidth: 'contained',
    typography: {
      align: 'left',
      fontWeight: 'font-bold',
      lineHeight: 'leading-tight',
      fontSize: 'inherit',
    },
  },
  render: ({ title, level, align, containerWidth = 'contained', typography, customClass, baseColor }) => {
    const safeLevel = (level && VALID_LEVELS.includes(level as any) ? level : 'h2') as (typeof VALID_LEVELS)[number]
    const Heading = safeLevel
    const defaultSize = DEFAULT_LEVEL_SIZES[safeLevel] || 'text-3xl'

    // Combine legacy props if existing with typography object
    const mergedTypography: TypographyStyle = {
      ...typography,
      align: typography?.align || align || 'left',
      customClass: typography?.customClass || customClass || '',
      baseColor: typography?.baseColor || baseColor,
    }

    const typographyClasses = resolveTypographyClasses(mergedTypography, defaultSize, 'font-bold')
    const finalStyle = mergedTypography.baseColor ? { color: mergedTypography.baseColor } : undefined
    const widthWrapper =
      containerWidth === 'fluid'
        ? 'w-full'
        : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

    return (
      <div className={widthWrapper}>
        <Heading
          className={typographyClasses}
          style={finalStyle}
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(title) }}
        />
      </div>
    )
  },
}
