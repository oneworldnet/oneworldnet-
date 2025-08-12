import * as fs from 'fs';
import * as path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const USERS_PATH = path.join(process.cwd(), 'backend', 'users.json');
const LOGS_PATH = path.join(process.cwd(), 'backend', 'login-logs.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const data = fs.readFileSync(USERS_PATH, 'utf8');
      const users = JSON.parse(data);
      const user = users.find((u: any) => u.username === username && u.password === password);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      // سجل الدخول
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const log = { username, ip, date: new Date().toISOString() };
      let logs: any[] = [];
      try {
        const logsData = fs.readFileSync(LOGS_PATH, 'utf8');
        logs = JSON.parse(logsData);
      } catch {}
      logs.unshift(log);
      fs.writeFileSync(LOGS_PATH, JSON.stringify(logs.slice(0,1000), null, 2), 'utf8');
      res.status(200).json({ success: true, user: { username, role: user.role } });
    } catch (e) {
      res.status(500).json({ error: 'Read error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
