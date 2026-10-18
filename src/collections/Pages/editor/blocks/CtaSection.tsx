import { ComponentConfig } from '@puckeditor/core'
import { Button } from '@/components/ui/button'
import { ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

export interface CtaSectionProps {
  badge?: string
  title: string
  subtitle?: string
  discountCode?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  styleTheme?: 'gradient' | 'dark' | 'primary'
}

export const CtaSection: ComponentConfig<CtaSectionProps> = {
  label: 'Call to Action / Promo Banner',
  fields: {
    badge: { type: 'text', label: 'Badge' },
    title: { type: 'text', label: 'Headline' },
    subtitle: { type: 'textarea', label: 'Subtext' },
    discountCode: { type: 'text', label: 'Promo / Coupon Code' },
    styleTheme: {
      type: 'select',
      label: 'Theme Style',
      options: [
        { label: 'Vibrant Gradient (Purple / Pink)', value: 'gradient' },
        { label: 'Deep Dark Charcoal', value: 'dark' },
        { label: 'Brand Indigo', value: 'primary' },
      ],
    },
    primaryButtonText: { type: 'text', label: 'Primary Button Label' },
    primaryButtonLink: { type: 'text', label: 'Primary Button Link' },
    secondaryButtonText: { type: 'text', label: 'Secondary Button Label' },
    secondaryButtonLink: { type: 'text', label: 'Secondary Button Link' },
  },
  defaultProps: {
    badge: 'Limited Time Offer',
    title: 'Get 25% Off Your First Order Today',
    subtitle: 'Upgrade your collection with our award-winning products. Free shipping on all orders over $50.',
    discountCode: 'WELCOME25',
    styleTheme: 'gradient',
    primaryButtonText: 'Shop the Collection',
    primaryButtonLink: '/products',
    secondaryButtonText: 'View Best Sellers',
    secondaryButtonLink: '/products',
  },
  render: ({
    badge = 'Limited Time Offer',
    title = 'Get 25% Off Your First Order Today',
    subtitle = 'Upgrade your collection with our award-winning products. Free shipping on all orders over $50.',
    discountCode = 'WELCOME25',
    styleTheme = 'gradient',
    primaryButtonText = 'Shop the Collection',
    primaryButtonLink = '/products',
    secondaryButtonText = 'View Best Sellers',
    secondaryButtonLink = '/products',
  }) => {
    const themeClasses = {
      gradient: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white',
      dark: 'bg-neutral-900 text-neutral-100 border border-neutral-800',
      primary: 'bg-indigo-700 text-white',
    }

    const currentThemeClass = themeClasses[styleTheme] || themeClasses.gradient

    return (
      <section className="py-12 md:py-16 w-full">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className={`relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 text-center shadow-xl ${currentThemeClass}`}
          >
            {/* Background ambient lighting */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative max-w-3xl mx-auto space-y-6">
              {badge && (
                <div className="inline-block">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm border border-white/20 shadow-sm">
                    {badge}
                  </span>
                </div>
              )}

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                {title}
              </h2>

              {subtitle && (
                <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                  {subtitle}
                </p>
              )}

              {discountCode && (
                <div className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-black/25 backdrop-blur-md border border-white/25 text-sm font-mono tracking-wider shadow-inner">
                  <Tag className="h-4 w-4" />
                  <span>
                    Use code: <strong className="font-bold underline text-white">{discountCode}</strong> at checkout
                  </span>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                {primaryButtonText && (
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-white text-neutral-900 hover:bg-neutral-100 font-bold px-8 shadow-lg text-base h-12 rounded-xl transition-all"
                  >
                    <Link href={primaryButtonLink || '/products'}>
                      {primaryButtonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}

                {secondaryButtonText && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 font-semibold px-8 text-base h-12 rounded-xl bg-transparent"
                  >
                    <Link href={secondaryButtonLink || '/products'}>
                      {secondaryButtonText}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
}
