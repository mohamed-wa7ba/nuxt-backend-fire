import { PostgrestResponse } from '@supabase/supabase-js'

export interface SupabaseAuthResponse {
  data: {
    user: {
      id: string
      email: string
    } | null
    session: {
      access_token: string
      refresh_token: string
    } | null
  }
  error: Error | null
}

export interface SupabaseStorageResponse {
  data: {
    path: string
  }
  error: Error | null
}

export interface SupabaseTable<T = any> {
  select(columns?: string): Promise<PostgrestResponse<T>>
  insert(payload: T): Promise<PostgrestResponse<T>>
  subscribe(callback: (payload: any) => void): {
    unsubscribe: () => void
  }
}