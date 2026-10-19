'use client'

import React, { useState, useEffect } from 'react'
import { Puck } from '@puckeditor/core'
import { useField, useForm, useTheme } from '@payloadcms/ui'
import '@puckeditor/core/puck.css'
import { config } from '../editor/puck-config'
import { CustomCssEditorField } from '../editor/components/controls'
import './PuckEditor.scss'
import './dark-mode.css'

const initialData = {}

const PuckEditor = () => {
  const { value, setValue } = useField<any>({ path: 'page' })
  const { theme } = useTheme()
  const { value: title, setValue: setTitle } = useField<any>({
    path: 'title',
  })
  const { value: handle, setValue: setHandle } = useField<any>({
    path: 'handle',
  })
  const { submit } = useForm()

  const [isCssModalOpen, setIsCssModalOpen] = useState(false)
  const [activeCssTab, setActiveCssTab] = useState<'page' | 'global'>('page')

  // Auto-sync Main Global CSS from localStorage if empty on this page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGlobal = localStorage.getItem('shopnex_main_global_css')
      if (savedGlobal && !value?.root?.props?.globalCSS) {
        handleUpdateRootProp('globalCSS', savedGlobal)
      }
    }
  }, [])

  const save = () => {
    submit()
  }

  const onChange = (data: any) => {
    setValue(data)
    if (data.root?.props?.title !== title) {
      setTitle(data.root?.props?.title)
    }
    if (data.root?.props?.handle !== handle) {
      setHandle(data.root?.props?.handle)
    }
  }

  const handleUpdateRootProp = (key: 'pageCSS' | 'globalCSS', newCss: string) => {
    const updated = {
      ...(value || initialData),
      root: {
        ...(value?.root || {}),
        props: {
          ...(value?.root?.props || {}),
          [key]: newCss,
        },
      },
    }
    setValue(updated)
    if (key === 'globalCSS' && typeof window !== 'undefined') {
      try {
        localStorage.setItem('shopnex_main_global_css', newCss)
      } catch (err) {
        console.error('Failed to save global CSS:', err)
      }
    }
  }

  const currentPageCSS = value?.root?.props?.pageCSS || ''
  const currentGlobalCSS = value?.root?.props?.globalCSS || ''

  return (
    <div
      className={`twp h-screen w-full overflow-auto relative ${theme === 'dark' ? 'dark' : ''}`}
      data-theme={theme}
    >
      <Puck
        config={config}
        data={value || initialData}
        onPublish={save}
        onChange={onChange}
        overrides={{
          headerActions: () => (
            <div className="flex items-center gap-2 mr-2">
              <button
                type="button"
                onClick={() => setIsCssModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                title="Open Custom CSS Studio"
              >
                <span>🎨</span>
                <span>Custom CSS</span>
              </button>
            </div>
          ),
        }}
      />

      {/* Floating Custom CSS Modal */}
      {isCssModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="flex flex-col w-full max-w-3xl max-h-[90vh] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-base">🎨</span>
                <h3 className="text-sm font-bold text-slate-800">
                  Custom CSS Studio (Page &amp; Global Store)
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveCssTab('page')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                    activeCssTab === 'page'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📄 This Page CSS
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCssTab('global')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                    activeCssTab === 'global'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🌐 Main Global CSS
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsCssModalOpen(false)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                title="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeCssTab === 'page' ? (
                <div>
                  <div className="mb-2 rounded-md bg-blue-50 border border-blue-200 p-2.5 text-xs text-blue-800">
                    💡 <strong>This Page CSS:</strong> Rules written here will apply <strong>only to this specific page</strong>.
                  </div>
                  <CustomCssEditorField
                    label="Page Custom CSS"
                    value={currentPageCSS}
                    onChange={(css) => handleUpdateRootProp('pageCSS', css)}
                    placeholder="/* Write CSS specifically for this page here...\n.hero-badge {\n  background: #2563eb;\n  color: white;\n} */"
                  />
                </div>
              ) : (
                <div>
                  <div className="mb-2 rounded-md bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800">
                    🌐 <strong>Main Global CSS:</strong> Rules written here apply across <strong>the entire website / all pages</strong>.
                  </div>
                  <CustomCssEditorField
                    label="Main Global Custom CSS (All Pages)"
                    value={currentGlobalCSS}
                    onChange={(css) => handleUpdateRootProp('globalCSS', css)}
                    isGlobal
                    placeholder="/* Write Global CSS across the entire store here...\n.brand-button {\n  border-radius: 9999px;\n  box-shadow: 0 4px 14px rgba(0,0,0,0.1);\n} */"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
              <span className="text-[11px] text-slate-500">
                Tip: Apply your class name in any block&apos;s <strong>Custom Class</strong> field!
              </span>
              <button
                type="button"
                onClick={() => setIsCssModalOpen(false)}
                className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-xs"
              >
                ✓ Apply &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PuckEditor
