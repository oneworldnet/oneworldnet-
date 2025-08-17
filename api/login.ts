
import { getRedis, setRedis } from './redis';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const users = await getRedis('users') || [];
      const user = users.find((u: any) => u.username === username && u.password === password);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      // سجل الدخول
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const log = { username, ip, date: new Date().toISOString() };
      let logs = await getRedis('login-logs') || [];
      logs.unshift(log);
      logs = logs.slice(0, 1000);
      await setRedis('login-logs', logs);
      res.status(200).json({ success: true, user: { username, role: user.role } });
    } catch (e) {
      res.status(500).json({ error: 'Read error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
