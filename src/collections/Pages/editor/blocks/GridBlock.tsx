'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'

export interface GridBlockProps {
  columns?: '1' | '2' | '3' | '4' | '6'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  containerWidth?: 'contained' | 'full'
  customClass?: string
}

export const GridBlock: ComponentConfig<GridBlockProps> = {
  label: 'Grid Layout (Drop Zone)',
  fields: {
    columns: {
      type: 'select',
      label: 'Columns (Desktop)',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns (Default)', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '6 Columns', value: '6' },
      ],
    },
    containerWidth: {
      type: 'select',
      label: 'Container Width',
      options: [
        { label: '📦 Contained Standard (1280px)', value: 'contained' },
        { label: '↔️ Full Width (Edge-to-Edge)', value: 'full' },
      ],
    },
    gap: {
      type: 'select',
      label: 'Gap Between Items',
      options: [
        { label: 'Small (12px)', value: 'sm' },
        { label: 'Medium (24px)', value: 'md' },
        { label: 'Large (36px)', value: 'lg' },
        { label: 'Extra Large (48px)', value: 'xl' },
      ],
    },
    alignItems: {
      type: 'select',
      label: 'Vertical Alignment',
      options: [
        { label: 'Stretch (Equal Height)', value: 'stretch' },
        { label: 'Top / Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom / End', value: 'end' },
      ],
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    columns: '3',
    containerWidth: 'contained',
    gap: 'md',
    alignItems: 'stretch',
    customClass: '',
  },
  render: ({
    columns = '3',
    containerWidth = 'contained',
    gap = 'md',
    alignItems = 'stretch',
    customClass = '',
    puck,
  }: any) => {
    const colMap: Record<string, string> = {
      '1': 'grid-cols-1',
      '2': 'grid-cols-1 md:grid-cols-2',
      '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      '6': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    }
    const colClasses = colMap[columns as string] || 'grid-cols-1 md:grid-cols-3'

    const gapMap: Record<string, string> = {
      sm: 'gap-3',
      md: 'gap-6',
      lg: 'gap-9',
      xl: 'gap-12',
    }
    const gapClasses = gapMap[gap as string] || 'gap-6'

    const alignMap: Record<string, string> = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    }
    const alignClasses = alignMap[alignItems as string] || 'items-stretch'

    const gridContainerClass = `grid w-full ${colClasses} ${gapClasses} ${alignClasses} ${customClass}`.trim()
    const widthClass =
      containerWidth === 'full'
        ? 'w-full px-4'
        : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

    return (
      <div className={`${widthClass} my-6`}>
        {puck?.renderDropZone ? (
          puck.renderDropZone({
            zone: 'default',
            className: gridContainerClass,
            minEmptyHeight: puck?.isEditing ? 120 : undefined,
          })
        ) : (
          <div className={gridContainerClass} />
        )}
      </div>
    )
  },
}
