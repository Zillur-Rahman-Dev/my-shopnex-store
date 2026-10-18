import { admins, anyone } from '@/access/roles'
import { CollectionConfig } from 'payload'
import { groups } from '../groups'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: groups.design.name,
    useAsTitle: 'title',
    defaultColumns: ['title', 'handle', 'createdAt', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          // 'home' হ্যান্ডেল বা স্লাগ হলে রুট পাথ '/', অন্যথায় অন্যান্য হ্যান্ডেল অনুযায়ী পাথ নির্ধারণ করবে
          const path = doc.handle === 'home' ? '/' : `/${doc.handle}`

          // আপনার লাইভ সাইটের রিভ্যালিডেশন API-এ রিকোয়েস্ট পাঠানো
          const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
          await fetch(`${serverUrl}/api/revalidate?path=${path}`)

          console.log(`Cache cleared successfully for path: ${path}`)
        } catch (error) {
          console.error('Error clearing cache in afterChange hook:', error)
        }
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'New Page',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'handle',
          type: 'text',
          required: true,
          defaultValue: 'new-page',
        },
      ],
    },

    {
      name: 'page',
      type: 'json',
      required: true,
      admin: {
        components: {
          Field: '@/collections/Pages/components/PuckEditor',
        },
      },
    },
  ],
}
