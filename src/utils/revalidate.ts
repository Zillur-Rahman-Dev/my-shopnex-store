import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Revalidates Next.js cache for pages when created, updated, or deleted in Payload CMS
 */
export function revalidatePage(handle?: string | null) {
  try {
    if (!handle || handle === 'home') {
      revalidatePath('/')
      revalidatePath('/', 'layout')
    } else {
      revalidatePath(`/${handle}`)
      revalidatePath('/[pages]', 'page')
      revalidatePath('/', 'layout')
    }

    revalidateTag('pages')
    if (handle) {
      revalidateTag(`page_${handle}`)
    }
  } catch (error) {
    console.error('Error revalidating page cache:', error)
  }
}

/**
 * Revalidates Next.js cache for products when created, updated, or deleted in Payload CMS
 */
export function revalidateProduct(id?: string | number | null) {
  try {
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath('/products', 'page')
    if (id) {
      revalidatePath(`/products/${id}`)
      revalidatePath('/products/[id]', 'page')
      revalidateTag(`product_${id}`)
    }
    revalidateTag('products')
  } catch (error) {
    console.error('Error revalidating product cache:', error)
  }
}

/**
 * Revalidates Next.js cache for collections/categories
 */
export function revalidateCategory(handle?: string | null) {
  try {
    revalidatePath('/')
    revalidatePath('/categories')
    revalidatePath('/products')
    revalidateTag('collections')
    if (handle) {
      revalidateTag(`collection_${handle}`)
    }
  } catch (error) {
    console.error('Error revalidating collection cache:', error)
  }
}
