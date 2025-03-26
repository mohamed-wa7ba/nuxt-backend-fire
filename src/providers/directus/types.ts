export interface DirectusAuthResponse {
  data: {
    access_token: string
    refresh_token: string
  }
  error: Error | null
}

export interface DirectusCollectionResponse<T = any> {
  data: T[]
  meta: {
    total_count: number
  }
}