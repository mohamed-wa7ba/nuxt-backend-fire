export type BackendProvider = 'supabase' | 'firebase' | 'appwrite' | 'directus'

export interface BackendModuleOptions {
  defaultProvider?: BackendProvider
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