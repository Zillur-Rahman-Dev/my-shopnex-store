import { Config } from '@puckeditor/core'
import { PuckProps } from './puck-types'

// Import blocks (complex sections/layouts)
import {
  ContainerBlock,
  HeaderBlock,
  HeadingBlock,
  HeroSection,
  LandingHeroSection,
  ProductGrid,
  FeaturedProductsSection,
  FeatureCard,
  NewsletterSection,
  FooterSection,
  FaqSection,
  PricingSection,
  TestimonialSection,
  CtaSection,
  SplitSection,
} from './blocks'

// Import components (simple reusable elements)
import { TextBlock } from './components/TextBlock'
import { ButtonBlock } from './components/ButtonBlock'
import { Spacer } from './components/Spacer'
import { Logo } from './components/Logo'
import { StatItem } from './components/StatItem'
import { Badge } from './components/Badge'
import { AuthProvider } from '@/contexts/auth-context'

export const config: Config<PuckProps> = {
  root: {
    fields: {
      title: { type: 'text' },
      description: { type: 'textarea' },
      handle: { type: 'text' },
    },
    render: ({ children }) => {
      return (
        <div className="twp">
          <AuthProvider>{children}</AuthProvider>
        </div>
      )
    },
  },
  categories: {
    layout: {
      title: '🏗️ Sections & Banners',
      components: [
        'ContainerBlock',
        'HeroSection',
        'LandingHeroSection',
        'SplitSection',
        'CtaSection',
        'HeaderBlock',
        'FooterSection',
      ],
    },
    content: {
      title: '📝 Marketing & Shop Blocks',
      components: [
        'FeaturedProductsSection',
        'ProductGrid',
        'PricingSection',
        'FaqSection',
        'TestimonialSection',
        'FeatureCard',
        'NewsletterSection',
        'HeadingBlock',
      ],
    },
    elements: {
      title: '🔧 Components & Elements',
      components: ['TextBlock', 'ButtonBlock', 'Logo', 'StatItem', 'Badge', 'Spacer'],
    },
  },
  components: {
    // Layout & Section Blocks
    ContainerBlock,
    HeroSection,
    LandingHeroSection,
    SplitSection,
    CtaSection,
    HeaderBlock,
    FooterSection,
    // Marketing & Shop Blocks
    FeaturedProductsSection,
    ProductGrid,
    PricingSection,
    FaqSection,
    TestimonialSection,
    FeatureCard,
    NewsletterSection,
    HeadingBlock,
    // Elements
    TextBlock,
    ButtonBlock,
    Logo,
    StatItem,
    Badge,
    Spacer,
  },
}
