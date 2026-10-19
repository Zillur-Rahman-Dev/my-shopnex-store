'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

export interface TemplateBlockProps {
  templatePreset:
    | 'trust-badges'
    | 'feature-stats'
    | 'minimal-hero'
    | 'product-spotlight'
  title?: string
  subtitle?: string
  badge?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  imageUrl?: string
  customClass?: string
}

export const TemplateBlock: ComponentConfig<TemplateBlockProps> = {
  label: 'Pre-Built Templates & Presets',
  fields: {
    templatePreset: {
      type: 'select',
      label: 'Choose Section Preset',
      options: [
        { label: '🛡️ Trust & Guarantee Badges Bar', value: 'trust-badges' },
        { label: '⚡ Features Grid With Proof Stats', value: 'feature-stats' },
        { label: '🚀 Minimalist Hero & CTA', value: 'minimal-hero' },
        { label: '✨ Spotlight Product Feature Banner', value: 'product-spotlight' },
      ],
    },
    badge: { type: 'text', label: 'Badge / Tag (Optional)' },
    title: { type: 'text', label: 'Title / Headline' },
    subtitle: { type: 'textarea', label: 'Subtitle / Description' },
    imageUrl: { type: 'text', label: 'Image URL (For Spotlight/Hero)' },
    primaryButtonText: { type: 'text', label: 'Primary Button Label' },
    primaryButtonLink: { type: 'text', label: 'Primary Button Link' },
    secondaryButtonText: { type: 'text', label: 'Secondary Button Label' },
    secondaryButtonLink: { type: 'text', label: 'Secondary Button Link' },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    templatePreset: 'trust-badges',
    badge: 'Guaranteed Excellence',
    title: 'Why Thousands Trust Our Store',
    subtitle: 'From ethical production to doorstep delivery, every order is backed by world-class standards.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop',
    primaryButtonText: 'Explore Collection',
    primaryButtonLink: '/products',
    secondaryButtonText: 'Learn More',
    secondaryButtonLink: '/about',
    customClass: '',
  },
  render: ({
    templatePreset = 'trust-badges',
    badge = '',
    title = '',
    subtitle = '',
    imageUrl = '',
    primaryButtonText = 'Explore Collection',
    primaryButtonLink = '/products',
    secondaryButtonText = 'Learn More',
    secondaryButtonLink = '/about',
    customClass = '',
  }) => {
    // PRESET 1: TRUST BADGES BAR
    if (templatePreset === 'trust-badges') {
      const badges = [
        {
          icon: <Truck className="h-6 w-6 text-primary" />,
          title: 'Free Worldwide Shipping',
          desc: 'On all orders above $75 with live tracking',
        },
        {
          icon: <RotateCcw className="h-6 w-6 text-primary" />,
          title: '30-Day Easy Returns',
          desc: 'No-questions-asked refund policy',
        },
        {
          icon: <ShieldCheck className="h-6 w-6 text-primary" />,
          title: 'Secure Payment & Warranty',
          desc: '256-bit SSL encrypted checkout',
        },
        {
          icon: <Headphones className="h-6 w-6 text-primary" />,
          title: '24/7 Dedicated Support',
          desc: 'Direct human assistance anytime',
        },
      ]

      return (
        <div className="w-full my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className={`w-full p-6 md:p-8 rounded-2xl border border-border bg-card/60 shadow-sm ${customClass}`.trim()}>
            {(title || subtitle) && (
              <div className="text-center mb-8">
                {badge && (
                  <Badge variant="outline" className="mb-2 text-xs font-semibold">
                    {badge}
                  </Badge>
                )}
                {title && (
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/40 transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {b.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )
    }

    // PRESET 2: FEATURE STATS
    if (templatePreset === 'feature-stats') {
      const stats = [
        { number: '99.8%', label: 'Order Satisfaction', desc: 'Rated 5 stars by customers' },
        { number: '48h', label: 'Average Dispatch', desc: 'From warehouse to carrier' },
        { number: '150k+', label: 'Delivered Packages', desc: 'Across 45+ countries' },
      ]

      return (
        <div className="w-full my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className={`w-full p-8 md:p-12 rounded-3xl bg-muted/40 border border-border ${customClass}`.trim()}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              {badge && (
                <Badge className="mb-3 px-3 py-1 text-xs">
                  {badge}
                </Badge>
              )}
              <h3 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
                {title || 'Proven Impact & Performance'}
              </h3>
              {subtitle && (
                <p className="text-sm md:text-base text-muted-foreground mt-3 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-card border border-border text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl md:text-5xl font-black text-primary tracking-tight">
                    {s.number}
                  </span>
                  <h4 className="font-bold text-base text-foreground mt-3">
                    {s.label}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )
    }

    // PRESET 3: MINIMAL HERO
    if (templatePreset === 'minimal-hero') {
      return (
        <section className={`w-full my-12 py-12 md:py-20 px-6 text-center max-w-4xl mx-auto ${customClass}`.trim()}>
          {badge && (
            <Badge variant="secondary" className="mb-4 px-3.5 py-1 text-xs font-semibold gap-1.5 inline-flex items-center">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>{badge}</span>
            </Badge>
          )}

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
            {title || 'Simplicity, Elevated To An Art Form'}
          </h2>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            {subtitle || 'Discover timeless essentials built with uncompromised attention to every stitch, seam, and detail.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryButtonText && (
              <Button asChild size="lg" className="rounded-xl px-6 h-12 font-semibold shadow-md">
                <Link href={primaryButtonLink || '#'}>
                  <span>{primaryButtonText}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {secondaryButtonText && (
              <Button asChild variant="outline" size="lg" className="rounded-xl px-6 h-12 font-semibold">
                <Link href={secondaryButtonLink || '#'}>
                  {secondaryButtonText}
                </Link>
              </Button>
            )}
          </div>
        </section>
      )
    }

    // PRESET 4: PRODUCT SPOTLIGHT BANNER
    return (
      <div className="w-full my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className={`w-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm ${customClass}`.trim()}>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-8 md:p-12 lg:p-16 space-y-6">
              {badge && (
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs px-3 py-1">
                  {badge}
                </Badge>
              )}

              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {title || 'Engineered For Superior Comfort'}
              </h3>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {subtitle || 'Experience ergonomic balance and featherlight materials crafted for everyday excellence.'}
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Aerospace-grade ultra-light aluminium core',
                  'Hypoallergenic water-resistant protective coating',
                  'Full 2-year warranty with instant replacement',
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                {primaryButtonText && (
                  <Button asChild className="rounded-xl px-5 shadow-sm">
                    <Link href={primaryButtonLink || '#'}>
                      <span>{primaryButtonText}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {secondaryButtonText && (
                  <Button asChild variant="ghost" className="rounded-xl">
                    <Link href={secondaryButtonLink || '#'}>
                      {secondaryButtonText}
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="h-72 lg:h-full min-h-[380px] relative bg-muted">
              <img
                src={
                  imageUrl ||
                  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop'
                }
                alt={title || 'Product Spotlight'}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    )
  },
}
