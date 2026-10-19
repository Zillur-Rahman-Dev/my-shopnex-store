'use client'

import React, { useState } from 'react'
import { ComponentConfig } from '@puckeditor/core'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'

export interface CollapsibleTextBlockProps {
  title?: string
  previewText: string
  expandedText: string
  openLabel?: string
  closeLabel?: string
  customClass?: string
}

export const CollapsibleTextBlock: ComponentConfig<CollapsibleTextBlockProps> = {
  label: 'Collapsible / Read More Block',
  fields: {
    title: { type: 'text', label: 'Section Header (Optional)' },
    previewText: { type: 'textarea', label: 'Initial Visible Preview' },
    expandedText: { type: 'textarea', label: 'Hidden / Expanded Text' },
    openLabel: { type: 'text', label: 'Expand Button Text' },
    closeLabel: { type: 'text', label: 'Collapse Button Text' },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    title: 'Detailed Product Heritage & Materials',
    previewText:
      'Every item in our collection is meticulously hand-assembled in small batches. We collaborate with master artisans who bring four generations of leather-working expertise to deliver flawless craftsmanship.',
    expandedText:
      'Our full grain hides are ethically sourced from certified European tanneries using low-impact vegetable tannins. Over time, the surface develops a unique and rich patina that reflects your everyday journeys.\n\nAll seams are reinforced with bonded nylon thread tested to resist over 80 lbs of tension. We back every single piece with a lifetime repair guarantee.',
    openLabel: 'Read Full Story & Materials',
    closeLabel: 'Show Less',
    customClass: '',
  },
  render: ({
    title = '',
    previewText = '',
    expandedText = '',
    openLabel = 'Read Full Story & Materials',
    closeLabel = 'Show Less',
    customClass = '',
  }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="w-full my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-6 md:p-8 rounded-2xl border border-border/80 bg-card/60 shadow-sm ${customClass}`.trim()}>
        {title && (
          <h4 className="text-lg md:text-xl font-bold tracking-tight text-foreground mb-3">
            {title}
          </h4>
        )}

        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line leading-relaxed mb-4">
          {previewText}
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleContent className="space-y-2 overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line leading-relaxed pt-2 border-t border-border/60">
              {expandedText}
            </div>
          </CollapsibleContent>

          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
            >
              <span>{isOpen ? closeLabel : openLabel}</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </CollapsibleTrigger>
        </Collapsible>
        </div>
      </div>
    )
  },
}
