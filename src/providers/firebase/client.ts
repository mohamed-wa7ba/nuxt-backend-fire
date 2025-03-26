import { initializeApp, FirebaseApp, getApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

export class FirebaseProvider {
  private static app: FirebaseApp
  private static auth: Auth
  private static firestore: Firestore
  private static storage: FirebaseStorage

  static init(config: any) {
    this.app = initializeApp(config)
    this.auth = getAuth(this.app)
    this.firestore = getFirestore(this.app)
    this.storage = getStorage(this.app)
  }

  static getAuth() {
    if (!this.auth) throw new Error('Firebase auth not initialized')
    return this.auth
  }

  static getFirestore() {
    if (!this.firestore) throw new Error('Firestore not initialized')
    return this.firestore
  }

  static getStorage() {
    if (!this.storage) throw new Error('Firebase storage not initialized')
    return this.storage
  }
}