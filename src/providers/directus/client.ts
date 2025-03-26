import { createDirectus, rest, authentication } from '@directus/sdk'

export class DirectusProvider {
  private static client: any

  static init(config: { url: string }) {
    this.client = createDirectus(config.url)
      .with(rest())
      .with(authentication())
  }

  static getClient() {
    if (!this.client) throw new Error('Directus client not initialized')
    return this.client
  }
}