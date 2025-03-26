import { FirebaseProvider } from './client'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const FirebaseBackend = () => {
  const auth = FirebaseProvider.getAuth()
  const firestore = FirebaseProvider.getFirestore()
  const storage = FirebaseProvider.getStorage()

  return {
    auth() {
      return {
        async signInWithEmail(email: string, password: string) {
          return signInWithEmailAndPassword(auth, email, password)
        },
        async signOut() {
          return auth.signOut()
        }
      }
    },
    from(collectionName: string) {
      const colRef = collection(firestore, collectionName)
      
      return {
        async select<T = any>() {
          const snapshot = await getDocs(colRef)
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[]
        },
        async insert<T = any>(payload: T) {
          return addDoc(colRef, payload)
        }
      }
    },
    storage() {
      return {
        async upload(path: string, file: File) {
          const storageRef = ref(storage, path)
          return uploadBytes(storageRef, file)
        }
      }
    }
  }
}