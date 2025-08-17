// API للصفحات باستخدام Vercel KV
import { kv } from '@vercel/kv';

const PAGES_KEY = 'site_pages';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let pages = await kv.get(PAGES_KEY);
      if (!Array.isArray(pages) || pages.length === 0) {
        pages = [{ title: 'الصفحة الرئيسية', desc: 'هذه صفحة تجريبية.' }];
        await kv.set(PAGES_KEY, pages);
      }
      res.status(200).json(pages);
    } catch (e) {
      res.status(500).json({ error: 'read error' });
    }
  } else if (req.method === 'POST') {
    try {
      await kv.set(PAGES_KEY, req.body);
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'write error' });
    }
  } else {
    res.status(405).json({ error: 'method not allowed' });
  }
}
