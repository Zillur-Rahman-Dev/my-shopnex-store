'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export interface ComparisonRow {
  feature: string
  basicVal: string
  proVal: string
  enterpriseVal?: string
}

export interface ComparisonTableBlockProps {
  title?: string
  subtitle?: string
  col1Title?: string
  col2Title?: string
  col2Badge?: string
  col3Title?: string
  rows: ComparisonRow[]
  customClass?: string
}

export const ComparisonTableBlock: ComponentConfig<ComparisonTableBlockProps> = {
  label: 'Feature & Product Comparison Table',
  fields: {
    title: { type: 'text', label: 'Section Title' },
    subtitle: { type: 'textarea', label: 'Section Subtitle' },
    col1Title: { type: 'text', label: 'Plan 1 Column Header' },
    col2Title: { type: 'text', label: 'Plan 2 Column Header (Highlighted)' },
    col2Badge: { type: 'text', label: 'Plan 2 Badge (e.g. Most Popular)' },
    col3Title: { type: 'text', label: 'Plan 3 Column Header' },
    rows: {
      type: 'array',
      label: 'Comparison Rows',
      getItemSummary: (item) => item.feature || 'Feature Row',
      arrayFields: {
        feature: { type: 'text', label: 'Feature Description' },
        basicVal: { type: 'text', label: 'Plan 1 Value ("yes", "no", or text)' },
        proVal: { type: 'text', label: 'Plan 2 Value ("yes", "no", or text)' },
        enterpriseVal: { type: 'text', label: 'Plan 3 Value ("yes", "no", or text)' },
      },
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    title: 'Compare Plans & Feature Matrix',
    subtitle: 'Choose the tier that matches your performance, support, and volume requirements.',
    col1Title: 'Starter',
    col2Title: 'Pro Performance',
    col2Badge: 'Recommended',
    col3Title: 'Enterprise Suite',
    rows: [
      {
        feature: 'Cloud Storage Capacity',
        basicVal: '15 GB',
        proVal: '250 GB',
        enterpriseVal: 'Unlimited',
      },
      {
        feature: 'Priority 24/7 Support',
        basicVal: 'no',
        proVal: 'yes',
        enterpriseVal: 'yes',
      },
      {
        feature: 'Custom Domain & SSL',
        basicVal: 'yes',
        proVal: 'yes',
        enterpriseVal: 'yes',
      },
      {
        feature: 'Advanced AI Analytics',
        basicVal: 'no',
        proVal: 'yes',
        enterpriseVal: 'yes',
      },
      {
        feature: 'Dedicated Account Manager',
        basicVal: 'no',
        proVal: 'no',
        enterpriseVal: 'yes',
      },
      {
        feature: 'Custom API Webhooks',
        basicVal: '10/day',
        proVal: '1,000/day',
        enterpriseVal: 'Unlimited',
      },
    ],
    customClass: '',
  },
  render: ({
    title = '',
    subtitle = '',
    col1Title = 'Starter',
    col2Title = 'Pro Performance',
    col2Badge = 'Recommended',
    col3Title = 'Enterprise Suite',
    rows = [],
    customClass = '',
  }) => {
    const renderCellContent = (val: string = '', isHighlighted = false) => {
      const lower = val.trim().toLowerCase()
      if (lower === 'yes' || lower === 'true' || lower === 'check') {
        return (
          <div className="flex justify-center">
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${isHighlighted ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
              <Check className="h-3.5 w-3.5" />
            </div>
          </div>
        )
      }
      if (lower === 'no' || lower === 'false' || lower === 'cross') {
        return (
          <div className="flex justify-center">
            <div className="h-6 w-6 rounded-full bg-muted/50 text-muted-foreground/40 flex items-center justify-center">
              <X className="h-3.5 w-3.5" />
            </div>
          </div>
        )
      }
      return <span className={`font-medium ${isHighlighted ? 'text-primary font-semibold' : 'text-foreground'}`}>{val}</span>
    }

    return (
      <div className={`w-full my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${customClass}`.trim()}>
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

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted/30">
                <TableHead className="w-2/5 p-4 text-left font-semibold text-foreground">
                  Feature
                </TableHead>
                <TableHead className="w-1/5 p-4 text-center font-semibold text-foreground">
                  {col1Title}
                </TableHead>
                <TableHead className="w-1/5 p-4 text-center font-bold text-primary bg-primary/5 border-x border-border/80">
                  <div className="flex flex-col items-center gap-1">
                    <span>{col2Title}</span>
                    {col2Badge && (
                      <Badge className="text-[10px] py-0 px-2 h-4 font-normal">
                        {col2Badge}
                      </Badge>
                    )}
                  </div>
                </TableHead>
                <TableHead className="w-1/5 p-4 text-center font-semibold text-foreground">
                  {col3Title}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-muted/40 transition-colors border-b border-border/50"
                >
                  <TableCell className="p-4 font-medium text-foreground text-sm">
                    {row.feature}
                  </TableCell>
                  <TableCell className="p-4 text-center text-sm">
                    {renderCellContent(row.basicVal, false)}
                  </TableCell>
                  <TableCell className="p-4 text-center text-sm bg-primary/5 border-x border-border/80">
                    {renderCellContent(row.proVal, true)}
                  </TableCell>
                  <TableCell className="p-4 text-center text-sm">
                    {renderCellContent(row.enterpriseVal, false)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  },
}
