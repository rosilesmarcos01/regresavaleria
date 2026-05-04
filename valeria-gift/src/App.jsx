import { useEffect, useMemo, useState } from 'react'

/** Local midnight at the start of April 9, 2027 */
const TARGET = new Date(2027, 3, 9, 0, 0, 0, 0)

function pad(n) {
  return String(n).padStart(2, '0')
}

function diffParts(ms) {
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  const sec = Math.floor(ms / 1000)
  const days = Math.floor(sec / 86400)
  const hours = Math.floor((sec % 86400) / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = sec % 60
  return { days, hours, minutes, seconds, done: false }
}

export default function App() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = useMemo(
    () => diffParts(TARGET.getTime() - now),
    [now]
  )

  if (parts.done) {
    return (
      <main className="wrap">
        <p className="label">April 9, 2027</p>
        <h1 className="title">We are here.</h1>
      </main>
    )
  }

  return (
    <main className="wrap">
      <div
        className="grid"
        role="timer"
        aria-live="polite"
        aria-label="Time until April 9, 2027"
      >
        <div className="cell">
          <span className="num">{parts.days}</span>
          <span className="unit">days</span>
        </div>
        <div className="cell">
          <span className="num">{pad(parts.hours)}</span>
          <span className="unit">hours</span>
        </div>
        <div className="cell">
          <span className="num">{pad(parts.minutes)}</span>
          <span className="unit">minutes</span>
        </div>
        <div className="cell">
          <span className="num">{pad(parts.seconds)}</span>
          <span className="unit">seconds</span>
        </div>
      </div>
    </main>
  )
}
