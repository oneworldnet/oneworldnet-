import { createClient } from 'redis';

// تعريف بيئة Node
declare const process: any;

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const client = createClient({ url: redisUrl });
client.connect();

export async function getRedis(key: string, fallback: any = null): Promise<any> {
  const val = await client.get(key);
  if (val === null || val === undefined) return fallback;
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
}

export async function setRedis(key: string, value: any): Promise<void> {
  await client.set(key, JSON.stringify(value));
}
