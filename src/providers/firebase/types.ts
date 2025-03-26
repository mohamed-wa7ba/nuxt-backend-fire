import { User } from 'firebase/auth'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

export interface FirebaseAuthResponse {
  user: User | null
  error: Error | null
}

export interface FirebaseCollection<T = DocumentData> {
  select(): Promise<{
    docs: QueryDocumentSnapshot<T>[]
    empty: boolean
    size: number
  }>
  insert(payload: T): Promise<{
    id: string
  }>
}

export interface FirebaseStorageResponse {
  ref: string
  error: Error | null
}