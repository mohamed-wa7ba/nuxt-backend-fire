export interface AppwriteAuthResponse {
  userId: string
  sessionId: string
  error: Error | null
}

export interface AppwriteDocumentList<T = any> {
  documents: T[]
  total: number
}

export interface AppwriteStorageResponse {
  fileId: string
  error: Error | null
}