import { defineNuxtModule, addImports } from '@nuxt/kit'
import { SupabaseProvider } from './providers/supabase/client.js'
import { FirebaseProvider } from './providers/firebase/client.js'
import { AppwriteProvider } from './providers/appwrite/client.js'
import { DirectusProvider } from './providers/directus/client.js'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export interface ModuleOptions {
  defaultProvider?: 'supabase' | 'firebase' | 'appwrite' | 'directus'
  supabase?: {
    url: string
    key: string
  }
  firebase?: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
  appwrite?: {
    endpoint: string
    projectId: string
  }
  directus?: {
    url: string
    token?: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-fire',
    configKey: 'NuxtFire',
  },
  defaults: {
    defaultProvider: 'supabase'
  },
  setup(options: ModuleOptions, nuxt: any) {
    const resolve = (path: string) => `${__dirname}/${path}`

    if (options.supabase) {
      SupabaseProvider.init(options.supabase)
    }
    
    if (options.firebase) {
      FirebaseProvider.init(options.firebase)
    }
    
    if (options.appwrite) {
      AppwriteProvider.init(options.appwrite)
    }
    
    if (options.directus) {
      DirectusProvider.init(options.directus)
    }

    addImports({
      name: 'useBackend',
      as: 'useBackend',
      from: resolve('runtime/composables/useBackend.js')
    })
  }
})