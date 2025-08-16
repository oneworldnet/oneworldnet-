
import { getRedis, setRedis } from './redis';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
    const content = await getRedis('content') || {}; 
      res.status(200).json(content);
    } catch (e) {
      res.status(500).json({ error: 'Read error' });
    }
  } else if (req.method === 'POST') {
    try {
    await setRedis('content', req.body); 
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Write error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
