import fs from 'fs/promises';
import path from 'path';

const LOGS_PATH = path.join(process.cwd(), 'backend', 'login-logs.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(LOGS_PATH, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (e) {
      res.status(200).json([]);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
