import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import {
  type TypographyStyle,
  TypographyControlField,
  RichTextInputField,
  resolveTypographyClasses,
  sanitizeRichText,
} from './typography'

export interface TextBlockProps {
  text: string
  align?: 'left' | 'center' | 'right' | 'justify'
  containerWidth?: 'contained' | 'fluid'
  typography?: TypographyStyle
  customClass?: string
  baseColor?: string
}

export const TextBlock: ComponentConfig<TextBlockProps> = {
  label: 'Text Paragraph',
  fields: {
    containerWidth: {
      type: 'select',
      label: 'Container Width',
      options: [
        { label: '📦 Contained Standard (1280px)', value: 'contained' },
        { label: '↔️ Fluid / Inherit (For Cards & Grids)', value: 'fluid' },
      ],
    },
    text: {
      type: 'custom',
      render: ({ value, onChange }) => (
        <RichTextInputField
          value={value}
          onChange={onChange}
          label="Paragraph Content (Color 1, 2, or any letters/words)"
          placeholder="Add your paragraph text here, highlight any letters or words to color them..."
          rows={4}
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
    text: 'Add your paragraph text here.',
    containerWidth: 'contained',
    typography: {
      align: 'left',
      fontSize: 'text-base',
      fontWeight: 'font-normal',
      lineHeight: 'leading-relaxed',
    },
  },
  render: ({ text, align, containerWidth = 'contained', typography, customClass, baseColor }) => {
    // Combine legacy props if existing with typography object
    const mergedTypography: TypographyStyle = {
      ...typography,
      align: typography?.align || align || 'left',
      customClass: typography?.customClass || customClass || '',
      baseColor: typography?.baseColor || baseColor,
    }

    const typographyClasses = resolveTypographyClasses(
      mergedTypography,
      'text-base md:text-lg',
      'font-normal'
    )

    const finalStyle = mergedTypography.baseColor
      ? { color: mergedTypography.baseColor }
      : undefined

    const defaultTextColor = !mergedTypography.baseColor ? 'text-slate-600 dark:text-slate-300' : ''
    const widthWrapper =
      containerWidth === 'fluid'
        ? 'w-full'
        : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

    return (
      <div className={widthWrapper}>
        <p
          className={`${defaultTextColor} ${typographyClasses}`.trim()}
          style={finalStyle}
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(text) }}
        />
      </div>
    )
  },
}
