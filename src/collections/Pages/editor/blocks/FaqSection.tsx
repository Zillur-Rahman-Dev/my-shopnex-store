import { ComponentConfig } from '@puckeditor/core'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface FaqSectionProps {
  badge?: string
  title: string
  subtitle?: string
  items: Array<{ question: string; answer: string }>
}

export const FaqSection: ComponentConfig<FaqSectionProps> = {
  label: 'FAQ Section',
  fields: {
    badge: { type: 'text', label: 'Badge / Tag' },
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'textarea', label: 'Subtitle' },
    items: {
      type: 'array',
      label: 'Questions & Answers',
      getItemSummary: (item) => item.question || 'FAQ Item',
      arrayFields: {
        question: { type: 'text', label: 'Question' },
        answer: { type: 'textarea', label: 'Answer' },
      },
    },
  },
  defaultProps: {
    badge: 'Common Questions',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our products, delivery, and services.',
    items: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 3-5 business days. Express shipping is delivered within 1-2 business days.',
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day money-back guarantee. If you are not completely satisfied, return the product for a full refund.',
      },
      {
        question: 'Do you offer warranty on products?',
        answer: 'Yes, all our electronic and hardware products include a 1-year comprehensive warranty covering manufacturing defects.',
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order is shipped, you will receive an email confirmation with a tracking number and a link to monitor your shipment.',
      },
    ],
  },
  render: ({ badge, title, subtitle, items = [] }) => (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
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

        <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50 last:border-b-0 py-1">
                <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pt-1">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  ),
}
