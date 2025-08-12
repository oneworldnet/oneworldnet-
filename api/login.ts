
// استخدم مكتبة Vercel KV
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key: string) {
  const res = await fetch(`${KV_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` }
  });
  if (!res.ok) return null;
  return await res.json();
}
async function kvSet(key: string, value: any) {
  await fetch(`${KV_URL}/set/${key}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    }
  );
}

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const users = await kvGet('users') || [];
      const user = users.find((u: any) => u.username === username && u.password === password);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      // سجل الدخول
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const log = { username, ip, date: new Date().toISOString() };
      let logs = await kvGet('login-logs') || [];
      logs.unshift(log);
      logs = logs.slice(0, 1000);
      await kvSet('login-logs', logs);
      res.status(200).json({ success: true, user: { username, role: user.role } });
    } catch (e) {
      res.status(500).json({ error: 'Read error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
