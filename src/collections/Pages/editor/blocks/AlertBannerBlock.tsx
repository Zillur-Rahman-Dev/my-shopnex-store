'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Info, Bell, CheckCircle2, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export interface AlertBannerBlockProps {
  title: string
  description: string
  variant?: 'default' | 'info' | 'success' | 'warning' | 'destructive'
  iconType?: 'info' | 'bell' | 'check' | 'alert' | 'sparkles' | 'none'
  buttonText?: string
  buttonLink?: string
  customClass?: string
}

export const AlertBannerBlock: ComponentConfig<AlertBannerBlockProps> = {
  label: 'Alert & Notification Banner',
  fields: {
    title: { type: 'text', label: 'Banner Title / Headline' },
    description: { type: 'textarea', label: 'Message Content' },
    variant: {
      type: 'select',
      label: 'Alert Type & Color',
      options: [
        { label: 'Standard / Neutral', value: 'default' },
        { label: 'Informational (Blue)', value: 'info' },
        { label: 'Success / Completed (Emerald)', value: 'success' },
        { label: 'Warning / Notice (Amber)', value: 'warning' },
        { label: 'Urgent / Danger (Destructive)', value: 'destructive' },
      ],
    },
    iconType: {
      type: 'select',
      label: 'Icon',
      options: [
        { label: 'Information (i)', value: 'info' },
        { label: 'Notification Bell', value: 'bell' },
        { label: 'Checkmark Circle', value: 'check' },
        { label: 'Warning Triangle', value: 'alert' },
        { label: 'Sparkles / Promo', value: 'sparkles' },
        { label: 'None', value: 'none' },
      ],
    },
    buttonText: { type: 'text', label: 'Action Button Text (Optional)' },
    buttonLink: { type: 'text', label: 'Action Button URL (Optional)' },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    title: '🎉 Limited Flash Sale Active!',
    description: 'Use coupon code NEXTSTORE at checkout for an extra 15% discount on all seasonal items.',
    variant: 'info',
    iconType: 'sparkles',
    buttonText: 'Claim Discount',
    buttonLink: '/products',
    customClass: '',
  },
  render: ({
    title = '',
    description = '',
    variant = 'info',
    iconType = 'sparkles',
    buttonText = '',
    buttonLink = '',
    customClass = '',
  }) => {
    const renderIcon = () => {
      switch (iconType) {
        case 'info':
          return <Info className="h-5 w-5" />
        case 'bell':
          return <Bell className="h-5 w-5" />
        case 'check':
          return <CheckCircle2 className="h-5 w-5" />
        case 'alert':
          return <AlertTriangle className="h-5 w-5" />
        case 'sparkles':
          return <Sparkles className="h-5 w-5" />
        default:
          return null
      }
    }

    return (
      <div className={`w-full my-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${customClass}`.trim()}>
        <Alert variant={variant} className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 shadow-sm">
          <div className="flex items-start gap-3.5">
            {iconType !== 'none' && <div className="mt-0.5 shrink-0">{renderIcon()}</div>}
            <div className="space-y-1">
              {title && <AlertTitle className="text-base font-semibold">{title}</AlertTitle>}
              {description && (
                <AlertDescription className="text-sm leading-relaxed">
                  {description}
                </AlertDescription>
              )}
            </div>
          </div>

          {buttonText && (
            <div className="shrink-0 self-start md:self-center pl-8 md:pl-0">
              <Link
                href={buttonLink || '#'}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </Alert>
      </div>
    )
  },
}
