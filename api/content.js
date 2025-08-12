import fs from 'fs/promises';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'backend', 'content.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(CONTENT_PATH, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (e) {
      res.status(500).json({ error: 'Read error' });
    }
  } else if (req.method === 'POST') {
    try {
      await fs.writeFile(CONTENT_PATH, JSON.stringify(req.body, null, 2), 'utf8');
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Write error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
