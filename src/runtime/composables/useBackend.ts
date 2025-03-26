import { SupabaseBackend } from '../../providers/supabase/composables'
import { FirebaseBackend } from '../../providers/firebase/composables'
import { AppwriteBackend } from '../../providers/appwrite/composables'
import { DirectusBackend } from '../../providers/directus/composables'
import { useRuntimeConfig } from '#imports'
import type { BackendProvider } from '../../types'

export const useBackend = <T extends BackendProvider>(provider?: T) => {
  const config = useRuntimeConfig().public.NuxtFire
  const selectedProvider = provider || config.defaultProvider || 'supabase'

  switch (selectedProvider) {
    case 'firebase':
      return FirebaseBackend()
    case 'appwrite':
      return AppwriteBackend()
    case 'directus':
      return DirectusBackend()
    default:
      return SupabaseBackend()
  }
}