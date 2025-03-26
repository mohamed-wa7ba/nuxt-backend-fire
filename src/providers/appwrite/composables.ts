import { AppwriteProvider } from './client'

export const AppwriteBackend = () => {
  const account = AppwriteProvider.getAccount()
  const databases = AppwriteProvider.getDatabases()
  const storage = AppwriteProvider.getStorage()

  return {
    auth() {
      return {
        async signInWithEmail(email: string, password: string) {
          return account.createEmailSession(email, password)
        },
        async signOut() {
          return account.deleteSession('current')
        }
      }
    },
    from(collectionId: string) {
      return {
        async select<T = any>(databaseId: string = 'default') {
          return databases.listDocuments(databaseId, collectionId) as Promise<{
            documents: T[]
          }>
        },
        async insert<T = any>(payload: T, databaseId: string = 'default') {
          return databases.createDocument(databaseId, collectionId, 'unique()', payload)
        }
      }
    },
    storage() {
      return {
        async upload(bucketId: string, fileId: string, file: File) {
          return storage.createFile(bucketId, fileId, file)
        }
      }
    }
  }
}