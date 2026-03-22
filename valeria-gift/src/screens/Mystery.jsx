import { useNavigate } from 'react-router-dom'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Mystery.module.css'

export default function Mystery() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <div className="eyebrow" style={{ animation: 'fadeUp 0.8s 0.1s ease both', opacity: 0 }}>
          You have received a
        </div>
        <h2 className={`serifDisplay ${s.headline}`}>
          Digital<br />Gift Card!.
        </h2>
        <div className={`topLine ${s.card}`} onClick={() => navigate('/note')}>
          <div className="corners">
            <span /><span /><span /><span />
          </div>
          <div className={s.cardBody}>
            <svg className="icon iconLg" viewBox="0 0 24 24">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            <div className={s.cardLabel}>Gift Card</div>
            <div className={s.cardHint}>Tap to reveal</div>
          </div>
        </div>
        <div className={s.hintLine}>Enjoy it!.</div>
      </div>
    </div>
  )
}
