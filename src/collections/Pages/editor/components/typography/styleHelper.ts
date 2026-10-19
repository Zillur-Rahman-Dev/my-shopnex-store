import type { TypographyStyle, SavedClassItem } from './types'

const CLIPBOARD_KEY = 'shopnex_typography_clipboard'
const SAVED_CLASSES_KEY = 'shopnex_saved_typography_classes'

/**
 * Copies a typography style object to local storage
 */
export const copyTypographyStyle = (style: TypographyStyle): boolean => {
  if (typeof window === 'undefined') return false
  try {
    localStorage.setItem(CLIPBOARD_KEY, JSON.stringify(style))
    return true
  } catch (err) {
    console.error('Failed to copy style:', err)
    return false
  }
}

/**
 * Pastes a typography style object from local storage
 */
export const pasteTypographyStyle = (): TypographyStyle | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CLIPBOARD_KEY)
    if (!raw) return null
    return JSON.parse(raw) as TypographyStyle
  } catch (err) {
    console.error('Failed to paste style:', err)
    return null
  }
}

/**
 * Retrieves all saved custom classes
 */
export const getSavedClasses = (): SavedClassItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(SAVED_CLASSES_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SavedClassItem[]
  } catch {
    return []
  }
}

/**
 * Saves a class definition into the saved classes registry
 */
export const saveClassDefinition = (className: string, style: TypographyStyle): boolean => {
  if (typeof window === 'undefined' || !className.trim()) return false
  try {
    const trimmed = className.trim()
    const current = getSavedClasses()
    const index = current.findIndex((item) => item.name.toLowerCase() === trimmed.toLowerCase())
    if (index >= 0) {
      current[index] = { name: trimmed, style }
    } else {
      current.push({ name: trimmed, style })
    }
    localStorage.setItem(SAVED_CLASSES_KEY, JSON.stringify(current))
    return true
  } catch (err) {
    console.error('Failed to save class definition:', err)
    return false
  }
}

/**
 * Resolves Tailwind and custom classes from typography settings
 */
export const resolveTypographyClasses = (
  typography?: TypographyStyle,
  defaultSizeClass: string = '',
  defaultWeightClass: string = ''
): string => {
  if (!typography) {
    return `${defaultSizeClass} ${defaultWeightClass}`.trim()
  }

  const {
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textTransform,
    align,
    customClass,
  } = typography

  const classes: string[] = []

  // Font Size
  if (fontSize && fontSize !== 'inherit') {
    classes.push(fontSize)
  } else if (defaultSizeClass) {
    classes.push(defaultSizeClass)
  }

  // Font Weight
  if (fontWeight && fontWeight !== 'inherit') {
    classes.push(fontWeight)
  } else if (defaultWeightClass) {
    classes.push(defaultWeightClass)
  }

  // Line Height
  if (lineHeight && lineHeight !== 'inherit') {
    classes.push(lineHeight)
  }

  // Letter Spacing
  if (letterSpacing && letterSpacing !== 'inherit') {
    classes.push(letterSpacing)
  }

  // Text Transform
  if (textTransform && textTransform !== 'none') {
    classes.push(textTransform)
  }

  // Text Align
  if (align) {
    classes.push(
      align === 'center'
        ? 'text-center'
        : align === 'right'
        ? 'text-right'
        : align === 'justify'
        ? 'text-justify'
        : 'text-left'
    )
  }

  // Custom User / Webflow class
  if (customClass) {
    classes.push(customClass.trim())
  }

  return classes.filter(Boolean).join(' ')
}

/**
 * Sanitizes rich text HTML allowing safe inline styles for colored letters/spans
 */
export const sanitizeRichText = (html?: any): string => {
  if (!html || typeof html !== 'string') {
    if (typeof html === 'number') return String(html)
    return ''
  }
  // Strip dangerous tags like <script>, <iframe>, <object>, <embed>, event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:[^"']*/gi, '')
}
