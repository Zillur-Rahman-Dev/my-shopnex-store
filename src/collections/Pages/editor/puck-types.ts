import { Product } from "@/lib/products";

export type PuckProps = {
    ContainerBlock: {
        layout?: "flex-col" | "flex-row" | "grid-2" | "grid-3" | "grid-4";
        containerWidth?: "boxed" | "narrow" | "wide" | "full";
        paddingY?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
        paddingX?: "none" | "sm" | "md" | "lg";
        marginY?: "none" | "sm" | "md" | "lg";
        gap?: "none" | "sm" | "md" | "lg" | "xl";
        alignItems?: "stretch" | "start" | "center" | "end";
        justifyContent?: "start" | "center" | "between" | "around" | "end";
        background?: "transparent" | "white" | "muted" | "slate" | "primary-subtle" | "dark";
        borderStyle?: "none" | "subtle" | "card" | "pill";
        minHeight?: "auto" | "screen-half" | "screen-full";
    };
    HeadingBlock: {
        title: string;
        level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        align?: "left" | "center" | "right";
    };
    TextBlock: {
        text: string;
        align?: "left" | "center" | "right";
    };
    ButtonBlock: {
        text: string;
        href?: string;
        variant?:
            | "default"
            | "destructive"
            | "outline"
            | "secondary"
            | "ghost"
            | "link";
        size?: "default" | "sm" | "lg" | "icon";
    };
    HeaderBlock: {
        logoText: string;
        logoIcon?: string;
        navigationItems: Array<{ label: string; href: string }>;
        showSearch?: boolean;
        showCart?: boolean;
    };
    HeroSection: {
        title: string;
        subtitle: string;
        backgroundImage?: string;
        ctaText?: string;
        ctaLink?: string;
        secondaryCtaText?: string;
        secondaryCtaLink?: string;
        stats?: Array<{ value: string; label: string }>;
        heroImage?: string;
        badges?: Array<{
            text: string;
            position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
        }>;
    };
    LandingHeroSection: {
        title: string;
        highlightedWord?: string;
        subtitle: string;
        heroImage?: string;
        showImage?: boolean;
        buttons?: Array<{
            text: string;
            href: string;
            variant: "default" | "outline" | "ghost" | "link";
            size: "sm" | "default" | "lg";
            icon?: string;
        }>;
        showStats?: boolean;
        stats?: Array<{ value: string; label: string }>;
        showBadges?: boolean;
        badges?: Array<{
            text: string;
            position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
            variant: "primary" | "secondary" | "success" | "warning";
        }>;
    };
    ProductGrid: {
        title?: string;
        products: Product[];
        columns?: 2 | 3 | 4;
    };
    FeaturedProductsSection: {
        title?: string;
        subtitle?: string;
        viewAllText?: string;
        viewAllLink?: string;
        products: Product[];
        columns?: 2 | 3 | 4;
    };
    NewsletterSection: {
        title?: string;
        subtitle?: string;
        placeholder?: string;
        buttonText?: string;
        privacyText?: string;
    };
    FooterSection: {
        logoText: string;
        logoIcon?: string;
        description?: string;
        sections: Array<{
            title: string;
            links: Array<{ label: string; href: string }>;
        }>;
        copyrightText?: string;
    };
    FeatureCard: {
        title: string;
        description: string;
        icon?: string;
    };
    Spacer: {
        height: number;
    };
    Logo: {
        logoText: string;
        logoIcon?: string;
    };
    StatItem: {
        value: string;
        label: string;
        align?: "left" | "center" | "right";
    };
    Badge: {
        text: string;
        align?: "left" | "center" | "right";
        position?: "inline" | "top-right" | "bottom-left" | "top-left" | "bottom-right";
        variant?: "primary" | "secondary" | "success" | "warning" | "outline";
        size?: "sm" | "md" | "lg";
    };
    FaqSection: {
        badge?: string;
        title: string;
        subtitle?: string;
        items: Array<{ question: string; answer: string }>;
    };
    PricingSection: {
        badge?: string;
        title: string;
        subtitle?: string;
        plans: Array<{
            name: string;
            price: string;
            period?: string;
            description?: string;
            popular?: boolean;
            features: Array<{ text: string } | string>;
            ctaText: string;
            ctaLink: string;
        }>;
    };
    TestimonialSection: {
        badge?: string;
        title: string;
        subtitle?: string;
        items: Array<{
            name: string;
            role?: string;
            avatar?: string;
            rating?: number;
            content: string;
        }>;
    };
    CtaSection: {
        badge?: string;
        title: string;
        subtitle?: string;
        discountCode?: string;
        styleTheme?: "gradient" | "dark" | "primary";
        primaryButtonText?: string;
        primaryButtonLink?: string;
        secondaryButtonText?: string;
        secondaryButtonLink?: string;
    };
    SplitSection: {
        badge?: string;
        title: string;
        description?: string;
        image?: string;
        imagePosition?: 'left' | 'right';
        bullets?: Array<{ text: string } | string>;
        buttonText?: string;
        buttonLink?: string;
    };
};
