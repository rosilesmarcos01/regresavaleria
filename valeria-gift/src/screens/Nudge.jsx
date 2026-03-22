import { useNavigate } from 'react-router-dom'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Nudge.module.css'

export default function Nudge() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <div className={s.iconWrap}>
          <svg className="icon iconLg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className={`serifDisplay ${s.title}`}>
          Hmm. That option<br />seems unavailable.
        </h2>
        <p className={s.text}>
          Turns out online ordering is{' '}
          <em>temporarily out of service</em>.<br /><br />
          What a coincidence. Your personal shopper,<br />
          however, is fully available and ready to go&hellip;
        </p>
        <button className="btnGhost" onClick={() => navigate('/certificate')}>
          Get a personal shopper &rarr;
        </button>
      </div>
    </div>
  )
}
