// ملف مساعد للتعامل مع Vercel KV
import { kv } from '@vercel/kv';

export async function getKV(key: string, fallback: any = null) {
  const val = await kv.get(key);
  if (val === null || val === undefined) return fallback;
  return val;
}

export async function setKV(key: string, value: any) {
  await kv.set(key, value);
}
