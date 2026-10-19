'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ComponentConfig } from '@puckeditor/core'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export interface CarouselSlide {
  title: string
  subtitle?: string
  badge?: string
  imageUrl: string
  buttonText?: string
  buttonLink?: string
}

export interface CarouselBlockProps {
  slides: CarouselSlide[]
  aspectRatio?: 'banner' | 'video' | 'standard'
  showArrows?: boolean
  showDots?: boolean
  customClass?: string
}

export const CarouselBlock: ComponentConfig<CarouselBlockProps> = {
  label: 'Carousel / Banner Slider',
  fields: {
    aspectRatio: {
      type: 'select',
      label: 'Slide Aspect Ratio',
      options: [
        { label: 'Wide Banner (21:9)', value: 'banner' },
        { label: 'Video Display (16:9)', value: 'video' },
        { label: 'Standard Card (4:3)', value: 'standard' },
      ],
    },
    showArrows: {
      type: 'radio',
      label: 'Show Previous / Next Arrows',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showDots: {
      type: 'radio',
      label: 'Show Navigation Dots',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    slides: {
      type: 'array',
      label: 'Slides List',
      getItemSummary: (item) => item.title || 'Slide',
      arrayFields: {
        badge: { type: 'text', label: 'Badge / Tag' },
        title: { type: 'text', label: 'Slide Title' },
        subtitle: { type: 'textarea', label: 'Slide Subtitle / Description' },
        imageUrl: { type: 'text', label: 'Background Image URL' },
        buttonText: { type: 'text', label: 'Button Text (Optional)' },
        buttonLink: { type: 'text', label: 'Button Link (Optional)' },
      },
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    aspectRatio: 'video',
    showArrows: true,
    showDots: true,
    slides: [
      {
        badge: 'New Season 2026',
        title: 'Minimalist Artisan Collection',
        subtitle: 'Designed with precision engineering and sustainable materials for your modern lifestyle.',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
        buttonText: 'Discover Collection',
        buttonLink: '/products',
      },
      {
        badge: 'Best Seller',
        title: 'Crafted For Elegance & Everyday Comfort',
        subtitle: 'Explore our highest rated pieces loved by over 50,000 satisfied customers worldwide.',
        imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop',
        buttonText: 'Shop Best Sellers',
        buttonLink: '/products',
      },
      {
        badge: 'Special Promo',
        title: 'Premium Sound & Acoustic Gear',
        subtitle: 'Immerse yourself into studio-grade audio quality with zero distortion.',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
        buttonText: 'View Audio Gear',
        buttonLink: '/products',
      },
    ],
    customClass: '',
  },
  render: ({
    slides = [],
    aspectRatio = 'video',
    showArrows = true,
    showDots = true,
    customClass = '',
  }) => {
    const validSlides = slides.length > 0 ? slides : [
      {
        title: 'Sample Slide',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      },
    ]

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback(
      (index: number) => {
        if (emblaApi) emblaApi.scrollTo(index)
      },
      [emblaApi]
    )

    useEffect(() => {
      if (!emblaApi) return
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      }
      emblaApi.on('select', onSelect)
      return () => {
        emblaApi.off('select', onSelect)
      }
    }, [emblaApi])

    const heightClass =
      aspectRatio === 'banner'
        ? 'h-[360px] md:h-[460px]'
        : aspectRatio === 'standard'
        ? 'h-[440px] md:h-[560px]'
        : 'h-[400px] md:h-[520px]'

    return (
      <div className="w-full my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative w-full overflow-hidden rounded-2xl group ${customClass}`.trim()}>
          <div ref={emblaRef} className="overflow-hidden w-full">
          <div className="flex">
            {validSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`relative flex-[0_0_100%] min-w-0 ${heightClass} bg-muted flex items-center`}
              >
                {slide.imageUrl && (
                  <img
                    src={slide.imageUrl}
                    alt={slide.title || 'Slide image'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Content */}
                <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-2xl text-white">
                  {slide.badge && (
                    <Badge className="bg-primary/90 text-primary-foreground font-medium mb-3 px-3 py-1 text-xs">
                      {slide.badge}
                    </Badge>
                  )}
                  {slide.title && (
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 drop-shadow-sm">
                      {slide.title}
                    </h3>
                  )}
                  {slide.subtitle && (
                    <p className="text-sm md:text-base text-zinc-200 line-clamp-3 mb-6 max-w-lg leading-relaxed drop-shadow-sm">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.buttonText && (
                    <Link
                      href={slide.buttonLink || '#'}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-100 transition-colors shadow-lg"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow Navigation */}
        {showArrows && validSlides.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              aria-label="Previous Slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next Slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {showDots && validSlides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {validSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 transition-all rounded-full cursor-pointer ${
                  selectedIndex === idx
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    )
  },
}
