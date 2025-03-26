import { DirectusProvider } from './client'

export const DirectusBackend = () => {
  const client = DirectusProvider.getClient()

  return {
    auth() {
      return {
        async signInWithEmail(email: string, password: string) {
          return client.login(email, password)
        },
        async signOut() {
          return client.logout()
        }
      }
    },
    from(collection: string) {
      return {
        async select<T = any>() {
          return client.items(collection).readByQuery() as Promise<{ data: T[] }>
        },
        async insert<T = any>(payload: T) {
          return client.items(collection).createOne(payload)
        }
      }
    }
  }
}