'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

export interface AvatarItem {
  src: string
  alt?: string
  fallback?: string
}

export interface AvatarGroupBlockProps {
  headline?: string
  subtext?: string
  ratingStars?: number
  align?: 'left' | 'center' | 'right'
  avatars: AvatarItem[]
  customClass?: string
}

export const AvatarGroupBlock: ComponentConfig<AvatarGroupBlockProps> = {
  label: 'Avatar Group & Social Proof',
  fields: {
    headline: { type: 'text', label: 'Headline / Social Proof Text' },
    subtext: { type: 'text', label: 'Rating & Reviews Subtext' },
    ratingStars: {
      type: 'select',
      label: 'Rating Stars',
      options: [
        { label: '5 Stars (★★★★★)', value: 5 },
        { label: '4.5 / 4 Stars (★★★★☆)', value: 4 },
        { label: 'No Stars', value: 0 },
      ],
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left Aligned', value: 'left' },
        { label: 'Center Aligned', value: 'center' },
        { label: 'Right Aligned', value: 'right' },
      ],
    },
    avatars: {
      type: 'array',
      label: 'Customer Avatars',
      getItemSummary: (item) => item.alt || 'Avatar',
      arrayFields: {
        src: { type: 'text', label: 'Avatar Image URL' },
        alt: { type: 'text', label: 'Customer Name / Alt Text' },
        fallback: { type: 'text', label: 'Initials (Fallback)' },
      },
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    headline: 'Loved by 25,000+ active shoppers',
    subtext: '4.9/5 average score from 2,400+ verified orders',
    ratingStars: 5,
    align: 'center',
    avatars: [
      {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        alt: 'Sarah M.',
        fallback: 'SM',
      },
      {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        alt: 'David K.',
        fallback: 'DK',
      },
      {
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        alt: 'Elena R.',
        fallback: 'ER',
      },
      {
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        alt: 'Marcus L.',
        fallback: 'ML',
      },
      {
        src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
        alt: 'Jessica T.',
        fallback: 'JT',
      },
    ],
    customClass: '',
  },
  render: ({
    headline = 'Loved by 25,000+ active shoppers',
    subtext = '4.9/5 average score from 2,400+ verified orders',
    ratingStars = 5,
    align = 'center',
    avatars = [],
    customClass = '',
  }) => {
    const alignClass =
      align === 'center'
        ? 'justify-center text-center'
        : align === 'right'
        ? 'justify-end text-right'
        : 'justify-start text-left'

    const flexDirClass = align === 'center' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'

    return (
      <div className={`w-full my-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center ${alignClass} ${customClass}`.trim()}>
        <div className={`flex items-center gap-4 ${flexDirClass}`}>
          {/* Avatar stack */}
          <div className="flex -space-x-3 overflow-hidden p-1">
            {avatars.map((av, idx) => (
              <Avatar
                key={idx}
                className="inline-block h-10 w-10 ring-2 ring-background border-2 border-background shadow-sm hover:scale-110 transition-transform"
              >
                <AvatarImage src={av.src} alt={av.alt || `Customer ${idx + 1}`} />
                <AvatarFallback>{av.fallback || 'CU'}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Text and stars */}
          <div className="space-y-1">
            {ratingStars > 0 && (
              <div className={`flex items-center gap-1 text-amber-500 ${align === 'center' ? 'justify-center sm:justify-start' : ''}`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < ratingStars
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-muted text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            )}
            {headline && (
              <p className="text-sm font-semibold text-foreground tracking-tight">
                {headline}
              </p>
            )}
            {subtext && (
              <p className="text-xs text-muted-foreground">
                {subtext}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  },
}
