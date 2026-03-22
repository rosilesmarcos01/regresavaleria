import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Auth.module.css'

export default function Auth() {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit() {
    const pwd = value.trim().toLowerCase()
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      })
      // 404 means API isn't running (local dev) — fall back to client check
      if (res.status === 404) {
        if (pwd === 'speakeasy') {
          sessionStorage.setItem('vg_auth', 'true')
          navigate('/mystery')
        } else {
          setError(true)
          setValue('')
          setTimeout(() => setError(false), 2800)
        }
        return
      }
      if (res.ok) {
        sessionStorage.setItem('vg_auth', 'true')
        navigate('/mystery')
      } else {
        setError(true)
        setValue('')
        setTimeout(() => setError(false), 2800)
      }
    } catch {
      // network error fallback
      if (pwd === 'speakeasy') {
        sessionStorage.setItem('vg_auth', 'true')
        navigate('/mystery')
      } else {
        setError(true)
        setValue('')
        setTimeout(() => setError(false), 2800)
      }
    }
  }

  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <div className={`eyebrow ${s.eyebrow}`}>Private Access</div>
        <h1 className={`serifDisplay ${s.title}`}>
          You need the<br />password<br />to get access this content.
        </h1>
        <div className={s.divider} />
        <input
          className={s.input}
          type="password"
          placeholder="••••••••••"
          autoComplete="off"
          spellCheck="false"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <div className={`${s.error} ${error ? s.errorShow : ''}`}>
          Wrong password. Try again.
        </div>
        <div className={`${s.hintBubble} ${hintOpen ? s.hintBubbleShow : ''}`}>
          Al Capone knew the word. So do you.
        </div>
        <button className="btnGhost" style={{ marginTop: '2rem' }} onClick={handleSubmit}>
          Enter
        </button>
        <button className={s.hintBtn} onClick={() => setHintOpen(h => !h)}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {hintOpen ? 'Hide hint' : 'Need a hint?'}
        </button>
      </div>
    </div>
  )
}
