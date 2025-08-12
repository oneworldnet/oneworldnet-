const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key: string) {
	const res = await fetch(`${KV_URL}/get/${key}`, {
		headers: { Authorization: `Bearer ${KV_TOKEN}` }
	});
	if (!res.ok) return null;
	return await res.json();
}
async function kvSet(key: string, value: any) {
	await fetch(`${KV_URL}/set/${key}`,
		{
			method: 'POST',
			headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
			body: JSON.stringify(value)
		}
	);
}

export default async function handler(req: any, res: any) {
	if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
	const { username, password, role } = req.body;
	if (!username || !password || !role) return res.status(400).json({ error: 'Missing fields' });
	try {
		let users = await kvGet('users') || [];
		if (users.find((u: any) => u.username === username)) return res.status(409).json({ error: 'User exists' });
		users.push({ username, password, role });
		await kvSet('users', users);
		res.status(200).json({ success: true });
	} catch (e) {
		res.status(500).json({ error: 'Write error' });
	}
}
