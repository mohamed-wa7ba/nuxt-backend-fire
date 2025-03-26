import { describe, it, expect, vi, beforeAll } from 'vitest'
import { useBackend } from '../src/runtime/composables/useBackend'
import { FirebaseProvider } from '../src/providers/firebase/client'

// Mock Firebase
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn()
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    signInWithEmailAndPassword: vi.fn().mockResolvedValue({
      user: { uid: '1', email: 'test@example.com' }
    })
  }))
}))

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn().mockResolvedValue({
    docs: [{
      id: '1',
      data: () => ({ title: 'Test Post' })
    }]
  })
}))

describe('Firebase Provider', () => {
  beforeAll(() => {
    FirebaseProvider.init({
      apiKey: 'mock-key',
      authDomain: 'mock.firebaseapp.com',
      projectId: 'mock-project'
    })
  })

  it('should authenticate user', async () => {
    const result = await useBackend('firebase')
      .auth()
      .signInWithEmail('test@example.com', 'password')
    
    expect(result.user?.email).toBe('test@example.com')
  })

  it('should fetch documents', async () => {
    const { docs } = await useBackend('firebase')
      .from('posts')
      .select()
    
    expect(docs).toHaveLength(1)
    expect(docs[0].data().title).toBe('Test Post')
  })
})