// src/module.ts
import { defineNuxtModule, addImports } from "@nuxt/kit";

// src/providers/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
var SupabaseProvider = class {
  static instance;
  static init(config) {
    this.instance = createClient(config.url, config.key);
  }
  static getClient() {
    if (!this.instance) {
      throw new Error("Supabase client not initialized");
    }
    return this.instance;
  }
};

// src/providers/firebase/client.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
var FirebaseProvider = class {
  static app;
  static auth;
  static firestore;
  static storage;
  static init(config) {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }
  static getAuth() {
    if (!this.auth) throw new Error("Firebase auth not initialized");
    return this.auth;
  }
  static getFirestore() {
    if (!this.firestore) throw new Error("Firestore not initialized");
    return this.firestore;
  }
  static getStorage() {
    if (!this.storage) throw new Error("Firebase storage not initialized");
    return this.storage;
  }
};

// src/providers/appwrite/client.ts
import { Client, Account, Databases, Storage } from "appwrite";
var AppwriteProvider = class {
  static client;
  static account;
  static databases;
  static storage;
  static init(config) {
    this.client = new Client().setEndpoint(config.endpoint).setProject(config.projectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  static getAccount() {
    if (!this.account) throw new Error("Appwrite account not initialized");
    return this.account;
  }
  static getDatabases() {
    if (!this.databases) throw new Error("Appwrite databases not initialized");
    return this.databases;
  }
  static getStorage() {
    if (!this.storage) throw new Error("Appwrite storage not initialized");
    return this.storage;
  }
};

// src/providers/directus/client.ts
import { createDirectus, rest, authentication } from "@directus/sdk";
var DirectusProvider = class {
  static client;
  static init(config) {
    this.client = createDirectus(config.url).with(rest()).with(authentication());
  }
  static getClient() {
    if (!this.client) throw new Error("Directus client not initialized");
    return this.client;
  }
};

// src/module.ts
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __dirname = dirname(fileURLToPath(import.meta.url));
var module_default = defineNuxtModule({
  meta: {
    name: "nuxt-fire",
    configKey: "NuxtFire"
  },
  defaults: {
    defaultProvider: "supabase"
  },
  setup(options, nuxt) {
    const resolve = (path) => `${__dirname}/${path}`;
    if (options.supabase) {
      SupabaseProvider.init(options.supabase);
    }
    if (options.firebase) {
      FirebaseProvider.init(options.firebase);
    }
    if (options.appwrite) {
      AppwriteProvider.init(options.appwrite);
    }
    if (options.directus) {
      DirectusProvider.init(options.directus);
    }
    addImports({
      name: "useBackend",
      as: "useBackend",
      from: resolve("runtime/composables/useBackend.js")
    });
  }
});
export {
  module_default as default
};
