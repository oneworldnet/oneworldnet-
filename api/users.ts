// ...existing code...

import { getRedis, setRedis } from './redis';

export default async function handler(req: any, res: any) {
	if (req.method === 'GET') {
		try {
			let users = await getRedis('users') || [];
			// إضافة مستخدم admin إذا لم يكن موجودًا
			if (!users.find((u: any) => u.username === 'admin')) {
				users.push({ username: 'admin', password: '123', role: 'admin' });
				await setRedis('users', users);
			}
			res.status(200).json(users);
		} catch (e) {
			res.status(500).json({ error: 'Read error' });
		}
	} else if (req.method === 'POST') {
		try {
			await setRedis('users', req.body);
			res.status(200).json({ success: true });
		} catch (e) {
			res.status(500).json({ error: 'Write error' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
