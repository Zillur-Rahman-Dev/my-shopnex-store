export interface TypographyStyle {
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  align?: 'left' | 'center' | 'right' | 'justify'
  baseColor?: string
  customClass?: string
}

export interface SavedClassItem {
  name: string
  style: TypographyStyle
}
