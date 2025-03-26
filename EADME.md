📦 Introduction
Nuxt Universal Backend is a powerful Nuxt.js module that provides seamless integration with multiple backend services including Supabase, Firebase, Appwrite, and Directus. It offers a unified API interface for all supported backends.

✨ Features
Multi-backend support: Single interface for Supabase, Firebase, Appwrite, and Directus

TypeScript ready: Full type definitions included

Auto-imports: Composable functions automatically available

Zero-config: Works with minimal configuration

🚀 Installation
Install the package:

bash
Copy
npm install nuxt-universal-backend
# or
yarn add nuxt-universal-backend
Add to your nuxt.config.ts:

typescript
Copy
export default defineNuxtConfig({
  modules: ['nuxt-universal-backend'],
  universalBackend: {
    defaultProvider: 'supabase', // or 'firebase', 'appwrite', 'directus'
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY
    }
    // Other provider configs...
  }
})
🔧 Configuration
Supported Backends:
typescript
Copy
interface ModuleOptions {
  defaultProvider?: 'supabase' | 'firebase' | 'appwrite' | 'directus'
  supabase?: {
    url: string
    key: string
  }
  firebase?: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
  appwrite?: {
    endpoint: string
    projectId: string
  }
  directus?: {
    url: string
    token?: string
  }
}
💻 Usage
Basic Usage
typescript
Copy
// Using the default provider
const { data } = await useBackend().from('posts').select()

// Specifying a provider
const { data } = await useBackend('firebase').from('users').select()
Authentication
typescript
Copy
// Sign in with email/password
const { user } = await useBackend().auth().signInWithEmail(email, password)

// Sign out
await useBackend().auth().signOut()
Real-time Subscriptions (Supabase)
typescript
Copy
const unsubscribe = useBackend().from('posts').subscribe((newPost) => {
  console.log('New post:', newPost)
})
📚 Examples
Fetching Data
typescript
Copy
// Get all posts
const { data: posts } = await useBackend().from('posts').select()

// Get single post
const { data: post } = await useBackend().from('posts').select().eq('id', 1)
Creating Data
typescript
Copy
const newPost = {
  title: 'Hello World',
  content: 'My first post'
}

const { data } = await useBackend().from('posts').insert(newPost)
🛠 Development
Clone the repository

Install dependencies:

bash
Copy
npm install
Build the module:

bash
Copy
npm run build
Run tests:

bash
Copy
npm run test
🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

📜 License
MIT