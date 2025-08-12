import * as fs from 'fs';
import * as path from 'path';
// import { NextApiRequest, NextApiResponse } from 'next';

const CONTENT_PATH = path.join(process.cwd(), 'backend', 'content.json');

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(CONTENT_PATH, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (e) {
      res.status(500).json({ error: 'Read error' });
    }
  } else if (req.method === 'POST') {
    try {
      fs.writeFileSync(CONTENT_PATH, JSON.stringify(req.body, null, 2), 'utf8');
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Write error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
