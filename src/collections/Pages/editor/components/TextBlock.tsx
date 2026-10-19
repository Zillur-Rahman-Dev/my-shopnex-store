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
  typography?: TypographyStyle
  customClass?: string
  baseColor?: string
}

export const TextBlock: ComponentConfig<TextBlockProps> = {
  label: 'Text Paragraph',
  fields: {
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
    typography: {
      align: 'left',
      fontSize: 'text-base',
      fontWeight: 'font-normal',
      lineHeight: 'leading-relaxed',
    },
  },
  render: ({ text, align, typography, customClass, baseColor }) => {
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

    return (
      <p
        className={`${defaultTextColor} ${typographyClasses}`.trim()}
        style={finalStyle}
        dangerouslySetInnerHTML={{ __html: sanitizeRichText(text) }}
      />
    )
  },
}
