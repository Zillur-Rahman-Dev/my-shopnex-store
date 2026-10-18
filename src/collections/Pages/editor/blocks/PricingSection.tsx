import { ComponentConfig } from '@puckeditor/core'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import Link from 'next/link'

export interface PricingPlan {
  name: string
  price: string
  period?: string
  description?: string
  popular?: boolean
  features: string[]
  ctaText: string
  ctaLink: string
}

export interface PricingSectionProps {
  badge?: string
  title: string
  subtitle?: string
  plans: PricingPlan[]
}

export const PricingSection: ComponentConfig<PricingSectionProps> = {
  label: 'Pricing Section',
  fields: {
    badge: { type: 'text', label: 'Badge' },
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'textarea', label: 'Subtitle' },
    plans: {
      type: 'array',
      label: 'Pricing Tiers / Plans',
      getItemSummary: (item) => `${item.name} ($${item.price})` || 'Plan',
      arrayFields: {
        name: { type: 'text', label: 'Plan Name' },
        price: { type: 'text', label: 'Price' },
        period: { type: 'text', label: 'Billing Period (e.g. /month, one-time)' },
        description: { type: 'text', label: 'Description' },
        popular: {
          type: 'radio',
          label: 'Highlight as Popular',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
        features: {
          type: 'array',
          label: 'Included Features',
          getItemSummary: (item) => item || 'Feature',
          arrayFields: {
            text: { type: 'text', label: 'Feature description' },
          },
        },
        ctaText: { type: 'text', label: 'Button Text' },
        ctaLink: { type: 'text', label: 'Button Link' },
      },
    },
  },
  defaultProps: {
    badge: 'Simple Pricing',
    title: 'Choose the Right Plan for You',
    subtitle: 'Transparent pricing with no hidden fees. Upgrade or cancel anytime.',
    plans: [
      {
        name: 'Starter Bundle',
        price: '29',
        period: 'one-time',
        description: 'Essential items to get started with fast free shipping.',
        popular: false,
        features: ['1 Premium Core Product', 'Standard Shipping Included', '30-Day Return Guarantee', '24/7 Support'],
        ctaText: 'Get Started',
        ctaLink: '/products',
      },
      {
        name: 'Pro Complete Set',
        price: '79',
        period: 'one-time',
        description: 'Best value complete kit with extended warranty and extras.',
        popular: true,
        features: [
          'Full Bundle (3 Core Items)',
          'Express Priority Shipping',
          '2-Year Extended Warranty',
          'VIP Customer Concierge',
          'Free Accessories Kit',
        ],
        ctaText: 'Buy Pro Set',
        ctaLink: '/products',
      },
      {
        name: 'Ultimate Pack',
        price: '149',
        period: 'one-time',
        description: 'The complete luxury experience with all available add-ons.',
        popular: false,
        features: [
          'Everything in Pro Set',
          'Lifetime Product Warranty',
          'Next-Day Guaranteed Delivery',
          'Exclusive Gift Box Packing',
        ],
        ctaText: 'Order Ultimate',
        ctaLink: '/products',
      },
    ],
  },
  render: ({ badge, title, subtitle, plans = [] }) => (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-4 mb-14">
          {badge && (
            <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary">
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const isPopular = Boolean(plan.popular)
            return (
              <Card
                key={idx}
                className={`relative flex flex-col justify-between transition-all duration-300 hover:shadow-xl bg-card ${
                  isPopular
                    ? 'border-2 border-primary shadow-lg scale-105 z-10 md:-translate-y-2'
                    : 'border border-border/60 shadow-sm'
                }`}
              >
                {isPopular && (
                  <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 font-semibold text-xs tracking-wide shadow-md">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="p-6 pb-4 space-y-2">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  {plan.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  )}
                  <div className="pt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight text-foreground">
                      ${plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xs text-muted-foreground font-medium">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-2 flex-1">
                  <div className="border-t border-border/50 pt-4 space-y-2.5">
                    {Array.isArray(plan.features) &&
                      plan.features.map((feat: any, fIdx: number) => {
                        const featText = typeof feat === 'object' && feat !== null ? feat.text || '' : String(feat)
                        return (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs text-foreground/90">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{featText}</span>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href={plan.ctaLink || '/products'} className="w-full">
                    <Button
                      variant={isPopular ? 'default' : 'outline'}
                      size="lg"
                      className="w-full font-semibold shadow-sm"
                    >
                      {plan.ctaText || 'Choose Plan'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  ),
}
