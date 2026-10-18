import { ComponentConfig } from '@puckeditor/core'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

export interface TestimonialItem {
  name: string
  role?: string
  avatar?: string
  rating?: number
  content: string
}

export interface TestimonialSectionProps {
  badge?: string
  title: string
  subtitle?: string
  items: TestimonialItem[]
}

export const TestimonialSection: ComponentConfig<TestimonialSectionProps> = {
  label: 'Testimonials / Reviews',
  fields: {
    badge: { type: 'text', label: 'Badge' },
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'textarea', label: 'Subtitle' },
    items: {
      type: 'array',
      label: 'Customer Testimonials',
      getItemSummary: (item) => `${item.name} (${item.role || 'Customer'})`,
      arrayFields: {
        name: { type: 'text', label: 'Customer Name' },
        role: { type: 'text', label: 'Role / Verified Buyer' },
        avatar: { type: 'text', label: 'Avatar Image URL' },
        rating: {
          type: 'select',
          label: 'Star Rating',
          options: [
            { label: '5 Stars', value: 5 },
            { label: '4 Stars', value: 4 },
            { label: '3 Stars', value: 3 },
          ],
        },
        content: { type: 'textarea', label: 'Review Text' },
      },
    },
  },
  defaultProps: {
    badge: 'Real Feedback',
    title: 'Loved by Over 20,000+ Customers',
    subtitle: 'See what our verified customers have to say about their experience with our store.',
    items: [
      {
        name: 'Alex Turner',
        role: 'Verified Buyer, New York',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        content:
          'Absolutely blown away by the product quality. The delivery arrived 2 days earlier than expected, and customer service resolved my sizing question in minutes!',
      },
      {
        name: 'Sarah Jenkins',
        role: 'Tech Enthusiast, London',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        content:
          'Best shopping experience I have had all year. Premium packaging, spotless finish, and the checkout was seamless with Apple Pay. Will definitely order again.',
      },
      {
        name: 'Michael Chen',
        role: 'Product Designer, Toronto',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        content:
          'The attention to detail is noticeable the second you unbox it. Great materials and feels like a luxury item at a completely fair price.',
      },
    ],
  },
  render: ({ badge, title, subtitle, items = [] }) => (
    <section className="py-16 md:py-24 bg-background">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <Card
              key={idx}
              className="border border-border/60 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <CardContent className="p-6 sm:p-8 space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "{item.content}"
                </p>

                {/* Author Info */}
                <div className="pt-4 flex items-center gap-3 border-t border-border/40">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{item.name}</div>
                    {item.role && (
                      <div className="text-xs text-muted-foreground">{item.role}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  ),
}
