import fs from 'fs/promises';
import path from 'path';

const USERS_PATH = path.join(process.cwd(), 'backend', 'users.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ error: 'Missing fields' });
  try {
    const data = await fs.readFile(USERS_PATH, 'utf8');
    let users = JSON.parse(data);
    if (users.find(u => u.username === username)) return res.status(409).json({ error: 'User exists' });
    users.push({ username, password, role });
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), 'utf8');
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Write error' });
  }
}
