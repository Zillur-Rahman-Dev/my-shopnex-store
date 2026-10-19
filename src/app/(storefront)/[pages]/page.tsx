import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageByHandle } from '@/lib/puck-pages'
import { PuckRender } from '@/collections/Pages/editor/client-render'
import { generateMetadata as generateSEOMetadata, generatePageJsonLd } from '@/lib/seo'
import { seoConfig } from '@/lib/seo-config'

interface DynamicPageProps {
  params: Promise<{ pages: string }>
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const slug = (await params).pages
  const page = await getPageByHandle({ handle: slug })

  if (!page) {
    return {
      title: 'Page Not Found | ShopNex',
      description: 'The requested page could not be found.',
    }
  }

  return generateSEOMetadata({
    title: page.title,
    description: page.description || undefined,
    url: `${seoConfig.siteUrl}/${slug}`,
  })
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const slug = (await params).pages
  const page = await getPageByHandle({ handle: slug })

  if (!page) return notFound()

  const structuredData = generatePageJsonLd({
    title: page.title,
    description: page.description || undefined,
    url: `${seoConfig.siteUrl}/${slug}`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PuckRender data={page.page as any} />
    </>
  )
}
