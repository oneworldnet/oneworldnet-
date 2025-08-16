import { getRedis, setRedis } from './redis';

async function kvGet(key: string) {
	// Removed Vercel KV functions
}
async function kvSet(key: string, value: any) {
	// Removed Vercel KV functions
}

export default async function handler(req: any, res: any) {
	if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
	const { username, password, role } = req.body;
	if (!username || !password || !role) return res.status(400).json({ error: 'Missing fields' });
	try {
		let users: Array<{ username: string; password: string; role: string }> = await getRedis('users') || [];
		if (users.find((u: any) => u.username === username)) return res.status(409).json({ error: 'User exists' });
		users.push({ username, password, role });
		await setRedis('users', users);
		res.status(200).json({ success: true });
	} catch (e) {
		res.status(500).json({ error: 'Write error' });
	}
}
