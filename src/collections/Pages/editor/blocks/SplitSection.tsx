import { ComponentConfig } from '@puckeditor/core'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export interface SplitSectionProps {
  badge?: string
  title: string
  description?: string
  image?: string
  imagePosition?: 'left' | 'right'
  bullets?: Array<{ text: string } | string>
  buttonText?: string
  buttonLink?: string
}

export const SplitSection: ComponentConfig<SplitSectionProps> = {
  label: 'Story / Image & Text Split',
  fields: {
    badge: { type: 'text', label: 'Badge' },
    title: { type: 'text', label: 'Title' },
    description: { type: 'textarea', label: 'Description' },
    image: { type: 'text', label: 'Image URL' },
    imagePosition: {
      type: 'radio',
      label: 'Image Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    bullets: {
      type: 'array',
      label: 'Feature Bullet Points',
      getItemSummary: (item: any) => (typeof item === 'string' ? item : item?.text || 'Point'),
      arrayFields: {
        text: { type: 'text', label: 'Bullet point text' },
      },
    },
    buttonText: { type: 'text', label: 'Button Text' },
    buttonLink: { type: 'text', label: 'Button Link' },
  },
  defaultProps: {
    badge: 'Crafted with Precision',
    title: 'Engineered for Performance and Built to Last',
    description:
      'We combine premium aerospace-grade materials with thoughtful ergonomic design to deliver an experience that exceeds expectations every single day.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    imagePosition: 'left',
    bullets: [
      { text: 'Ultra-durable military standard titanium alloy body' },
      { text: 'Up to 30 hours of continuous active battery life' },
      { text: 'Instant pairing with all iOS, Android, and Windows devices' },
      { text: 'IPX8 waterproof rating for complete peace of mind' },
    ],
    buttonText: 'Discover the Technology',
    buttonLink: '/products',
  },
  render: ({
    badge = 'Crafted with Precision',
    title = 'Engineered for Performance and Built to Last',
    description = 'We combine premium aerospace-grade materials with thoughtful ergonomic design.',
    image,
    imagePosition = 'left',
    bullets = [],
    buttonText = 'Discover More',
    buttonLink = '/products',
  }) => {
    const isImageLeft = imagePosition === 'left'
    const safeBullets = Array.isArray(bullets) ? bullets : []
    const displayImage =
      image ||
      '/modern-e-commerce-hero-image-with-shopping-bags-an.jpg'

    return (
      <section className="py-12 md:py-20 bg-background overflow-hidden w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image container */}
            <div
              className={`w-full overflow-hidden rounded-3xl bg-muted/30 border border-border/60 shadow-lg ${
                isImageLeft ? 'order-1' : 'order-1 lg:order-2'
              }`}
            >
              <img
                src={displayImage}
                alt={title || 'Product Story'}
                className="w-full h-72 sm:h-96 lg:h-[420px] object-cover"
              />
            </div>

            {/* Content container */}
            <div
              className={`space-y-6 ${
                isImageLeft ? 'order-2' : 'order-2 lg:order-1'
              }`}
            >
              {badge && (
                <div>
                  <span className="inline-flex py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {badge}
                  </span>
                </div>
              )}

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {title}
              </h2>

              {description && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}

              {safeBullets.length > 0 && (
                <div className="space-y-3 pt-1">
                  {safeBullets.map((b: any, idx: number) => {
                    const bulletText =
                      typeof b === 'string' ? b : b?.text || ''
                    if (!bulletText) return null

                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="rounded-full p-1 bg-primary/10 text-primary mt-0.5 shrink-0">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-foreground">
                          {bulletText}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              {buttonText && (
                <div className="pt-3">
                  <Button asChild size="lg" className="font-semibold shadow-md px-6 h-11">
                    <Link href={buttonLink || '/products'}>
                      {buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  },
}
