'use client'

import React from 'react'
import { Render } from '@puckeditor/core'
import { config } from './puck-config'

export interface PuckRenderProps {
  data: any
  metadata?: any
}

export function PuckRender({ data, metadata }: PuckRenderProps) {
  if (!data) return null
  return <Render config={config} data={data} metadata={metadata} />
}
