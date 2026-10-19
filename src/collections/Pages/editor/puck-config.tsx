import { Config } from '@puckeditor/core'
import { PuckProps, RootProps } from './puck-types'
import { CustomCssEditorField } from './components/controls'

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

export const config: Config<PuckProps, RootProps> = {
  root: {
    fields: {
      title: { type: 'text', label: 'Page Title' },
      description: { type: 'textarea', label: 'Page Description' },
      handle: { type: 'text', label: 'URL Slug / Handle' },
      pageCSS: {
        type: 'custom',
        label: '📄 Page Custom CSS',
        render: ({ value, onChange }) => (
          <CustomCssEditorField
            label="📄 Page Custom CSS (Only this page)"
            value={value || ''}
            onChange={onChange}
            placeholder="/* Write CSS rules specifically for this page here...\n.hero-badge {\n  background: #3b82f6;\n  color: white;\n} */"
          />
        ),
      },
      globalCSS: {
        type: 'custom',
        label: '🌐 Main Custom CSS',
        render: ({ value, onChange }) => (
          <CustomCssEditorField
            label="🌐 Main Custom CSS (Entire Store / All Pages)"
            value={value || ''}
            onChange={onChange}
            isGlobal
            placeholder="/* Write Global CSS rules across the entire store here...\n.brand-button {\n  border-radius: 9999px;\n  box-shadow: 0 4px 14px rgba(0,0,0,0.1);\n} */"
          />
        ),
      },
    },
    render: ({ children, pageCSS, globalCSS }: any) => {
      return (
        <div className="twp">
          {globalCSS && (
            <style
              id="shopnex-main-global-css"
              dangerouslySetInnerHTML={{ __html: globalCSS }}
            />
          )}
          {pageCSS && (
            <style
              id="shopnex-page-custom-css"
              dangerouslySetInnerHTML={{ __html: pageCSS }}
            />
          )}
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
