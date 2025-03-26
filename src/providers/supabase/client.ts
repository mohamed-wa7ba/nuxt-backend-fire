import { createClient, SupabaseClient } from '@supabase/supabase-js'

export class SupabaseProvider {
  private static instance: SupabaseClient

  static init(config: { url: string; key: string }) {
    this.instance = createClient(config.url, config.key)
  }

  static getClient() {
    if (!this.instance) {
      throw new Error('Supabase client not initialized')
    }
    return this.instance
  }
}