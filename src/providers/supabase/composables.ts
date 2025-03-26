import { SupabaseProvider } from './client'

export const SupabaseBackend = () => {
  const client = SupabaseProvider.getClient()

  return {
    auth() {
      return {
        async signInWithEmail(email: string, password: string) {
          return client.auth.signInWithPassword({ email, password })
        },
        async signUp(email: string, password: string) {
          return client.auth.signUp({ email, password })
        },
        async signOut() {
          return client.auth.signOut()
        }
      }
    },
    from(table: string) {
      return {
        async select<T = any>(columns = '*') {
          const { data, error } = await client.from(table).select(columns)
          if (error) throw error
          return data as T[]
        },
        async insert<T = any>(payload: T) {
          const { data, error } = await client.from(table).insert(payload)
          if (error) throw error
          return data
        },
        subscribe(callback: (payload: any) => void) {
          return client
            .channel('table-db-changes')
            .on(
              'postgres_changes',
              {
                event: '*',
                schema: 'public',
                table
              },
              payload => callback(payload)
            )
            .subscribe()
        }
      }
    },
    storage() {
      return {
        async upload(bucket: string, path: string, file: File) {
          const { data, error } = await client.storage
            .from(bucket)
            .upload(path, file)
          if (error) throw error
          return data
        }
      }
    }
  }
}