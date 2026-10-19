'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, Info, Sparkles } from 'lucide-react'

export interface TooltipBlockProps {
  mode?: 'tooltip' | 'card'
  triggerText: string
  badgeText?: string
  content: string
  cardTitle?: string
  cardImageUrl?: string
  align?: 'left' | 'center' | 'right'
  customClass?: string
}

export const TooltipBlock: ComponentConfig<TooltipBlockProps> = {
  label: 'Tooltip & Info Card (Hover)',
  fields: {
    mode: {
      type: 'select',
      label: 'Hover Presentation',
      options: [
        { label: 'Compact Tooltip Pill', value: 'tooltip' },
        { label: 'Rich Popover Card', value: 'card' },
      ],
    },
    triggerText: { type: 'text', label: 'Trigger Text' },
    badgeText: { type: 'text', label: 'Badge Label (Optional)' },
    cardTitle: { type: 'text', label: 'Card Title (For Card Mode)' },
    content: { type: 'textarea', label: 'Tooltip / Card Description' },
    cardImageUrl: { type: 'text', label: 'Image URL (For Card Mode, Optional)' },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    mode: 'card',
    triggerText: 'Certified Grade-A Sustainable Leather',
    badgeText: 'Verified',
    cardTitle: '100% Eco-Tanned Leather',
    content: 'Tanned in gold-certified Italian tanneries using natural bark extracts. 0% harsh chromium salts.',
    cardImageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=180&fit=crop',
    align: 'center',
    customClass: '',
  },
  render: ({
    mode = 'card',
    triggerText = 'Certified Grade-A Sustainable Leather',
    badgeText = 'Verified',
    cardTitle = '100% Eco-Tanned Leather',
    content = 'Tanned in gold-certified Italian tanneries using natural bark extracts.',
    cardImageUrl = '',
    align = 'center',
    customClass = '',
  }) => {
    const alignClass =
      align === 'center'
        ? 'justify-center text-center'
        : align === 'right'
        ? 'justify-end text-right'
        : 'justify-start text-left'

    return (
      <div className={`w-full my-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex ${alignClass} ${customClass}`.trim()}>
        {mode === 'tooltip' ? (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted text-xs font-medium text-foreground cursor-help transition-colors">
                  <Info className="h-3.5 w-3.5 text-primary" />
                  <span>{triggerText}</span>
                  {badgeText && (
                    <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                      {badgeText}
                    </Badge>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-center">
                <p>{content}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <HoverCard openDelay={200} closeDelay={150}>
            <HoverCardTrigger asChild>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/80 bg-card hover:border-primary/50 text-sm font-medium text-foreground cursor-pointer shadow-sm transition-all group">
                <Sparkles className="h-4 w-4 text-primary group-hover:rotate-12 transition-transform" />
                <span>{triggerText}</span>
                {badgeText && (
                  <Badge variant="default" className="text-[10px] h-4 px-1.5 font-normal">
                    {badgeText}
                  </Badge>
                )}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              {cardImageUrl && (
                <div className="overflow-hidden rounded-lg mb-3 h-28 bg-muted">
                  <img
                    src={cardImageUrl}
                    alt={cardTitle || 'Preview'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {cardTitle && (
                <h5 className="font-semibold text-sm text-foreground mb-1">
                  {cardTitle}
                </h5>
              )}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {content}
              </p>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    )
  },
}
