import fs from 'fs/promises';
import path from 'path';

const USERS_PATH = path.join(process.cwd(), 'backend', 'users.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(USERS_PATH, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (e) {
      res.status(200).json([]);
    }
  } else if (req.method === 'POST') {
    try {
      await fs.writeFile(USERS_PATH, JSON.stringify(req.body, null, 2), 'utf8');
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Write error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
