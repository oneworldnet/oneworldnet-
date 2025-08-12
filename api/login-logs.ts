const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key: string) {
	const res = await fetch(`${KV_URL}/get/${key}`, {
		headers: { Authorization: `Bearer ${KV_TOKEN}` }
	});
	if (!res.ok) return null;
	return await res.json();
}

export default async function handler(req: any, res: any) {
	if (req.method === 'GET') {
		try {
			const logs = await kvGet('login-logs') || [];
			res.status(200).json(logs);
		} catch (e) {
			res.status(500).json({ error: 'Read error' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
