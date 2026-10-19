'use client'

import React from 'react'
import { ComponentConfig } from '@puckeditor/core'

export interface FlexBlockProps {
  direction?: 'row' | 'col'
  containerWidth?: 'contained' | 'full'
  justify?: 'start' | 'center' | 'between' | 'around' | 'end'
  align?: 'start' | 'center' | 'end' | 'stretch'
  wrap?: 'wrap' | 'nowrap'
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  customClass?: string
}

export const FlexBlock: ComponentConfig<FlexBlockProps> = {
  label: 'Flex Layout (Drop Zone)',
  fields: {
    direction: {
      type: 'select',
      label: 'Flex Direction',
      options: [
        { label: '↔️ Row (Horizontal)', value: 'row' },
        { label: '↕️ Column (Vertical)', value: 'col' },
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
    justify: {
      type: 'select',
      label: 'Justify Content (Main Axis)',
      options: [
        { label: 'Start (Left)', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'Space Between', value: 'between' },
        { label: 'Space Around', value: 'around' },
        { label: 'End (Right)', value: 'end' },
      ],
    },
    align: {
      type: 'select',
      label: 'Align Items (Cross Axis)',
      options: [
        { label: 'Stretch (Full Height)', value: 'stretch' },
        { label: 'Center', value: 'center' },
        { label: 'Start (Top)', value: 'start' },
        { label: 'End (Bottom)', value: 'end' },
      ],
    },
    wrap: {
      type: 'radio',
      label: 'Wrap Items on Overflow',
      options: [
        { label: 'Wrap (Responsive)', value: 'wrap' },
        { label: 'No Wrap', value: 'nowrap' },
      ],
    },
    gap: {
      type: 'select',
      label: 'Item Gap',
      options: [
        { label: 'None (0px)', value: 'none' },
        { label: 'Small (12px)', value: 'sm' },
        { label: 'Medium (24px)', value: 'md' },
        { label: 'Large (36px)', value: 'lg' },
        { label: 'Extra Large (48px)', value: 'xl' },
      ],
    },
    customClass: { type: 'text', label: 'Custom CSS Class' },
  },
  defaultProps: {
    direction: 'row',
    containerWidth: 'contained',
    justify: 'start',
    align: 'center',
    wrap: 'wrap',
    gap: 'md',
    customClass: '',
  },
  render: ({
    direction = 'row',
    containerWidth = 'contained',
    justify = 'start',
    align = 'center',
    wrap = 'wrap',
    gap = 'md',
    customClass = '',
    puck,
  }: any) => {
    const dirClass = direction === 'col' ? 'flex-col' : 'flex-row'

    const justifyMap: Record<string, string> = {
      start: 'justify-start',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      end: 'justify-end',
    }
    const justifyClass = justifyMap[justify as string] || 'justify-start'

    const alignMap: Record<string, string> = {
      stretch: 'items-stretch',
      center: 'items-center',
      start: 'items-start',
      end: 'items-end',
    }
    const alignClass = alignMap[align as string] || 'items-center'

    const wrapClass = wrap === 'nowrap' ? 'flex-nowrap' : 'flex-wrap'

    const gapMap: Record<string, string> = {
      none: 'gap-0',
      sm: 'gap-3',
      md: 'gap-6',
      lg: 'gap-9',
      xl: 'gap-12',
    }
    const gapClass = gapMap[gap as string] || 'gap-6'

    const flexContainerClass = `flex w-full ${dirClass} ${justifyClass} ${alignClass} ${wrapClass} ${gapClass} ${customClass}`.trim()
    const widthClass =
      containerWidth === 'full'
        ? 'w-full px-4'
        : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

    return (
      <div className={`${widthClass} my-6`}>
        {puck?.renderDropZone ? (
          puck.renderDropZone({
            zone: 'default',
            className: flexContainerClass,
            minEmptyHeight: puck?.isEditing ? 96 : undefined,
          })
        ) : (
          <div className={flexContainerClass} />
        )}
      </div>
    )
  },
}
