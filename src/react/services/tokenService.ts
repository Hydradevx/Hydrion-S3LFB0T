import { load } from '@tauri-apps/plugin-store';

let store = null as any;

// Check if we're running in Tauri environment
const isTauri = typeof window !== 'undefined' && (window as any).__TAURI__;

async function getStore() {
  if (!store) {
    if (isTauri) {
      store = await load('.auth.dat');
    } else {
      // To prevent errors when testing in browser or non-Tauri environment
      store = {
        set: (key: string, value: string) => {
          localStorage.setItem(key, value);
          return Promise.resolve();
        },
        get: (key: string) => {
          return Promise.resolve(localStorage.getItem(key));
        },
        delete: (key: string) => {
          localStorage.removeItem(key);
          return Promise.resolve();
        },
        save: () => Promise.resolve()
      };
    }
  }
  return store;
}

export async function saveToken(token: string) {
  const s = await getStore();
  await s.set('token', token);
  await s.save();
}

export async function getToken(): Promise<string | null> {
  const s = await getStore();
  const token = await s.get('token');
  return token ?? null;
}

export async function removeToken() {
  const s = await getStore();
  await s.delete('token');
  await s.save();
}
