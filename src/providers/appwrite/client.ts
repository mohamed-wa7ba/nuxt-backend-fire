import { Client, Account, Databases, Storage } from 'appwrite'

export class AppwriteProvider {
  private static client: Client
  private static account: Account
  private static databases: Databases
  private static storage: Storage

  static init(config: { endpoint: string; projectId: string }) {
    this.client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.projectId)
    
    this.account = new Account(this.client)
    this.databases = new Databases(this.client)
    this.storage = new Storage(this.client)
  }

  static getAccount() {
    if (!this.account) throw new Error('Appwrite account not initialized')
    return this.account
  }

  static getDatabases() {
    if (!this.databases) throw new Error('Appwrite databases not initialized')
    return this.databases
  }

  static getStorage() {
    if (!this.storage) throw new Error('Appwrite storage not initialized')
    return this.storage
  }
}