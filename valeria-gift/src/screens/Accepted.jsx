import { useEffect } from 'react'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Accepted.module.css'

function launchConfetti() {
  const colors = ['#4a8c62', '#2d5c3e', '#f2ede4', '#c8bfb0', '#162b1e', '#a8c4b2']
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const el = document.createElement('div')
      el.className = 'confettiPiece'
      const size = Math.random() * 8 + 4
      const duration = Math.random() * 2.5 + 2
      el.style.cssText = `
        left: ${Math.random() * 100}vw;
        width: ${Math.random() > 0.5 ? size * 1.9 : size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation-duration: ${duration}s;
        animation-delay: ${Math.random() * 0.8}s;
        opacity: ${Math.random() * 0.5 + 0.5};
      `
      document.getElementById('root').appendChild(el)
      setTimeout(() => el.remove(), (duration + 1.2) * 1000)
    }, i * 18)
  }
}

export default function Accepted() {
  useEffect(() => { launchConfetti() }, [])

  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <div className={s.iconWrap}>
          <svg className="icon iconLg" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2 className={`serifDisplay ${s.title}`}>
          Thank you!<br />See you then.
        </h2>
        <p className={s.msg}>
          Tuesday the 24th.<br />
          <em>5:00 PM</em> &mdash; Transportation included.<br /><br />
          Thank you for using regresavaleria.com<br />
        </p>
      </div>
    </div>
  )
}
