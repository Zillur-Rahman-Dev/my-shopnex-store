'use client'

import React, { useState } from 'react'
import { ComponentConfig } from '@puckeditor/core'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export interface TabItem {
  label: string
  value: string
  content: string
  badge?: string
}

export interface TabsBlockProps {
  title?: string
  subtitle?: string
  styleVariant?: 'default' | 'pills' | 'underline'
  items: TabItem[]
  customClass?: string
}

export const TabsBlock: ComponentConfig<TabsBlockProps> = {
  label: 'Tabs (Content Switcher)',
  fields: {
    title: { type: 'text', label: 'Section Title (Optional)' },
    subtitle: { type: 'textarea', label: 'Subtitle (Optional)' },
    styleVariant: {
      type: 'select',
      label: 'Tabs Style',
      options: [
        { label: 'Default / Soft Background', value: 'default' },
        { label: 'Pills (Full Rounded)', value: 'pills' },
        { label: 'Underline / Minimal', value: 'underline' },
      ],
    },
    items: {
      type: 'array',
      label: 'Tab Items',
      getItemSummary: (item) => item.label || 'Tab',
      arrayFields: {
        label: { type: 'text', label: 'Tab Title' },
        value: { type: 'text', label: 'Tab Identifier (Unique)' },
        badge: { type: 'text', label: 'Badge / Tag (Optional)' },
        content: { type: 'textarea', label: 'Tab Content' },
      },
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    title: 'Explore By Features',
    subtitle: 'Switch between tabs to learn more about specifications, warranty, and customer reviews.',
    styleVariant: 'default',
    items: [
      {
        label: '✨ Highlights',
        value: 'highlights',
        badge: 'Popular',
        content:
          'Our flagship collection is crafted from eco-friendly premium materials designed for long-lasting durability, exceptional comfort, and modern elegance.',
      },
      {
        label: '⚙️ Specifications',
        value: 'specs',
        content:
          'Dimensions: 140 x 70 x 15 mm\nWeight: 180g\nBattery: Up to 36 hours continuous use\nCompatibility: iOS, Android, macOS & Windows\nConnectivity: Bluetooth 5.3 & Ultra-Low Latency Wireless',
      },
      {
        label: '🛡️ Warranty & Support',
        value: 'warranty',
        badge: '2 Years',
        content:
          'Enjoy full peace of mind with our 2-Year Hassle-Free Global Warranty. If anything breaks or malfunctions, we will repair or replace it free of charge.',
      },
    ],
    customClass: '',
  },
  render: ({
    title = '',
    subtitle = '',
    styleVariant = 'default',
    items = [],
    customClass = '',
  }) => {
    const validItems = items.length > 0 ? items : [
      {
        label: 'Tab 1',
        value: 'tab-1',
        content: 'Content goes here.',
      },
    ]

    const listStyle =
      styleVariant === 'pills'
        ? 'rounded-full p-1.5 bg-muted/80 border border-border/50'
        : styleVariant === 'underline'
        ? 'bg-transparent border-b border-border rounded-none p-0 gap-6'
        : 'rounded-xl p-1 bg-muted'

    return (
      <div className={`w-full my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${customClass}`.trim()}>
        {(title || subtitle) && (
          <div className="text-center mb-8 max-w-2xl mx-auto">
            {title && (
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <Tabs defaultValue={validItems[0]?.value || 'tab-1'} className="w-full">
          <div className="flex justify-center mb-6 overflow-x-auto pb-2">
            <TabsList className={listStyle}>
              {validItems.map((tab, idx) => {
                const tabValue = tab.value || `tab-${idx}`
                return (
                  <TabsTrigger
                    key={tabValue}
                    value={tabValue}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                      styleVariant === 'pills' ? 'rounded-full' : ''
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                        {tab.badge}
                      </Badge>
                    )}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {validItems.map((tab, idx) => {
            const tabValue = tab.value || `tab-${idx}`
            return (
              <TabsContent
                key={tabValue}
                value={tabValue}
                className="rounded-2xl border border-border/70 bg-card p-6 md:p-8 shadow-sm transition-all animate-in fade-in-50"
              >
                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground whitespace-pre-line leading-relaxed">
                  {tab.content}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    )
  },
}
