interface ModuleOptions {
    defaultProvider?: 'supabase' | 'firebase' | 'appwrite' | 'directus';
    supabase?: {
        url: string;
        key: string;
    };
    firebase?: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    };
    appwrite?: {
        endpoint: string;
        projectId: string;
    };
    directus?: {
        url: string;
        token?: string;
    };
}
declare const _default: NuxtModule<TOptions, TOptions, false>;

export { type ModuleOptions, _default as default };
