import { useNavigate } from 'react-router-dom'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Choice.module.css'

export default function Choice() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <h2 className={`serifDisplay ${s.title}`}>
          How would you<br />like to use it?
        </h2>
        <p className={s.sub}>Choose your experience</p>
        <div className={s.cards}>
          <div className={s.card} onClick={() => navigate('/nudge')}>
            <div className={s.iconWrap}>
              <svg className="icon iconMd" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div className={s.cardTitle}>Order Online</div>
            <div className={s.cardDesc}>Shop zara.com at your own pace</div>
          </div>

          <div className={`${s.card} ${s.featured} topLine`} onClick={() => navigate('/certificate')}>
            <div className={s.badge}>Recommended</div>
            <div className={s.badgeShimmer} />
            <div className={s.iconWrap}>
              <svg className="icon iconMd" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className={s.cardTitle}>Personal Shopper</div>
            <div className={s.cardDesc}>A shopping experience designed just for you</div>
          </div>
        </div>
      </div>
    </div>
  )
}
