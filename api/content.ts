
declare const process: any;
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key) {
  const res = await fetch(`${KV_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` }
  });
  if (!res.ok) return {};
  return await res.json();
}
async function kvSet(key, value) {
  await fetch(`${KV_URL}/set/${key}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    }
  );
}

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const content = await kvGet('content') || {};
      res.status(200).json(content);
    } catch (e) {
      res.status(500).json({ error: 'Read error' });
    }
  } else if (req.method === 'POST') {
    try {
      await kvSet('content', req.body);
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Write error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
