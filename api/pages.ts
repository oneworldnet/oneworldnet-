// API للصفحات باستخدام Vercel KV
import { getRedis, setRedis } from './redis';

const PAGES_KEY = 'site_pages';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let pages = await getRedis(PAGES_KEY) || [];
      if (!Array.isArray(pages) || pages.length === 0) {
        pages = [{ title: 'الصفحة الرئيسية', desc: 'هذه صفحة تجريبية.' }];
        await setRedis(PAGES_KEY, pages);
      }
      res.status(200).json(pages);
    } catch (e) {
      res.status(500).json({ error: 'read error' });
    }
  } else if (req.method === 'POST') {
    try {
      await setRedis(PAGES_KEY, req.body);
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'write error' });
    }
  } else {
    res.status(405).json({ error: 'method not allowed' });
  }
}
