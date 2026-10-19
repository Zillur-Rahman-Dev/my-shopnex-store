'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'

export interface RichTextBlockProps {
  content: string
  align?: 'left' | 'center' | 'right' | 'justify'
  maxWidth?: 'prose' | 'wide' | 'full'
  styleTheme?: 'default' | 'editorial' | 'card'
  customClass?: string
}

export const RichTextBlock: ComponentConfig<RichTextBlockProps> = {
  label: 'Rich Text / Formatted Content',
  fields: {
    content: {
      type: 'textarea',
      label: 'Content (Formatted text, paragraphs, or HTML)',
    },
    align: {
      type: 'select',
      label: 'Text Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Reading Width',
      options: [
        { label: 'Optimal Reading Width (65ch / Prose)', value: 'prose' },
        { label: 'Wide (900px)', value: 'wide' },
        { label: 'Full Width', value: 'full' },
      ],
    },
    styleTheme: {
      type: 'select',
      label: 'Box Style',
      options: [
        { label: 'Standard / Transparent', value: 'default' },
        { label: 'Editorial (Left Border Accent)', value: 'editorial' },
        { label: 'Card (Border & Background)', value: 'card' },
      ],
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    content: `<h2>The Philosophy of Sustainable Craftsmanship</h2>
<p>In a world of fast-moving throwaway goods, we believe in the longevity of objects. Each product we introduce is designed to endure years of everyday use without losing its refined appeal.</p>
<blockquote>"Quality is not an act, it is an enduring habit embedded in every stitch and curve."</blockquote>
<p>We source only traceable, responsibly produced materials from ethical suppliers across the globe:</p>
<ul>
  <li><strong>100% Recycled packaging</strong> designed with zero single-use plastics.</li>
  <li><strong>Closed-loop manufacturing</strong> ensuring minimum water waste.</li>
  <li><strong>Carbon-neutral shipping</strong> on all domestic and international shipments.</li>
</ul>`,
    align: 'left',
    maxWidth: 'prose',
    styleTheme: 'default',
    customClass: '',
  },
  render: ({
    content = '',
    align = 'left',
    maxWidth = 'prose',
    styleTheme = 'default',
    customClass = '',
  }) => {
    const alignClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    }[align] || 'text-left'

    const maxWidthClass = {
      prose: 'max-w-3xl mx-auto',
      wide: 'max-w-5xl mx-auto',
      full: 'w-full',
    }[maxWidth] || 'max-w-3xl mx-auto'

    const themeClass = {
      default: '',
      editorial: 'border-l-4 border-primary pl-6 md:pl-8',
      card: 'p-6 md:p-10 rounded-2xl border border-border bg-card shadow-sm',
    }[styleTheme] || ''

    return (
      <div className={`w-full my-6 ${maxWidthClass} ${customClass}`.trim()}>
        <div
          className={`prose prose-zinc dark:prose-invert max-w-none ${alignClass} ${themeClass} leading-relaxed`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  },
}
