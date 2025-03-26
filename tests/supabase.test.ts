import { describe, it, expect, vi, beforeAll } from 'vitest'
import { useBackend } from '../src/runtime/composables/useBackend'
import { SupabaseProvider } from '../src/providers/supabase/client'

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { user: { id: '1', email: 'test@example.com' } },
        error: null
      })
    },
    from: () => ({
      select: vi.fn().mockResolvedValue({
        data: [{ id: 1, title: 'Test Post' }],
        error: null
      })
    })
  })
}))

describe('Supabase Provider', () => {
  beforeAll(() => {
    SupabaseProvider.init({
      url: 'https://mock.supabase.co',
      key: 'mock-key'
    })
  })

  it('should authenticate user', async () => {
    const result = await useBackend('supabase')
      .auth()
      .signInWithEmail('test@example.com', 'password')
    
    expect(result.data.user?.email).toBe('test@example.com')
  })

  it('should fetch posts', async () => {
    const { data } = await useBackend('supabase')
      .from('posts')
      .select()
    
    expect(data).toHaveLength(1)
    expect(data[0].title).toBe('Test Post')
  })
})