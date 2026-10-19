'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export interface VideoEmbedBlockProps {
  title?: string
  videoUrl: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9'
  caption?: string
  maxWidth?: 'compact' | 'medium' | 'full'
  customClass?: string
}

export const VideoEmbedBlock: ComponentConfig<VideoEmbedBlockProps> = {
  label: 'Video & Media Embed (Aspect Ratio)',
  fields: {
    title: { type: 'text', label: 'Video Title (Optional)' },
    videoUrl: {
      type: 'text',
      label: 'Video URL (YouTube embed/watch, Vimeo, or MP4 link)',
    },
    aspectRatio: {
      type: 'select',
      label: 'Aspect Ratio',
      options: [
        { label: 'Widescreen 16:9 (Standard Video)', value: '16/9' },
        { label: 'Ultrawide 21:9 (Cinematic)', value: '21/9' },
        { label: 'Square 1:1 (Social / Instagram)', value: '1/1' },
        { label: 'Standard 4:3 (Classic Display)', value: '4/3' },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Max Container Width',
      options: [
        { label: 'Compact (720px)', value: 'compact' },
        { label: 'Medium (960px)', value: 'medium' },
        { label: 'Full Width (1280px)', value: 'full' },
      ],
    },
    caption: { type: 'text', label: 'Bottom Caption / Subtitle (Optional)' },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    title: 'Watch Product Story & Unboxing',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    aspectRatio: '16/9',
    maxWidth: 'medium',
    caption: 'See our design team demonstrate hands-on durability tests and key highlights.',
    customClass: '',
  },
  render: ({
    title = '',
    videoUrl = '',
    aspectRatio = '16/9',
    maxWidth = 'medium',
    caption = '',
    customClass = '',
  }) => {
    // Format youtube watch URLs to embed URLs if needed
    let formattedUrl = videoUrl
    if (formattedUrl.includes('youtube.com/watch?v=')) {
      formattedUrl = formattedUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/')
    } else if (formattedUrl.includes('youtu.be/')) {
      formattedUrl = formattedUrl.replace('youtu.be/', 'youtube.com/embed/')
    }

    const ratioNumbers: Record<string, number> = {
      '16/9': 16 / 9,
      '21/9': 21 / 9,
      '1/1': 1,
      '4/3': 4 / 3,
    }
    const ratio = ratioNumbers[aspectRatio] || 16 / 9

    const maxWidthClass = {
      compact: 'max-w-2xl',
      medium: 'max-w-4xl',
      full: 'max-w-6xl',
    }[maxWidth] || 'max-w-4xl'

    const isDirectVideo =
      formattedUrl.endsWith('.mp4') ||
      formattedUrl.endsWith('.webm') ||
      formattedUrl.endsWith('.ogg')

    return (
      <div className={`w-full my-6 mx-auto ${maxWidthClass} ${customClass}`.trim()}>
        {title && (
          <h4 className="text-xl md:text-2xl font-bold tracking-tight text-foreground text-center mb-4">
            {title}
          </h4>
        )}

        <div className="overflow-hidden rounded-2xl border border-border shadow-lg bg-black">
          <AspectRatio ratio={ratio}>
            {isDirectVideo ? (
              <video
                src={formattedUrl}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={formattedUrl}
                title={title || 'Embedded Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </AspectRatio>
        </div>

        {caption && (
          <p className="mt-3 text-xs md:text-sm text-center text-muted-foreground">
            {caption}
          </p>
        )}
      </div>
    )
  },
}
