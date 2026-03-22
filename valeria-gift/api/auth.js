export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body

  // Secret lives server-side only — set GIFT_PASSWORD in Vercel env vars
  const secret = process.env.GIFT_PASSWORD || 'speakeasy'

  if (password === secret) {
    return res.status(200).json({ ok: true })
  }

  return res.status(401).json({ error: 'Invalid password' })
}
