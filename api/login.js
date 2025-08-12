import fs from 'fs/promises';
import path from 'path';

const USERS_PATH = path.join(process.cwd(), 'backend', 'users.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { username, password } = req.body;
  try {
    const data = await fs.readFile(USERS_PATH, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.status(200).json({ success: true, user: { username, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: 'Read error' });
  }
}
