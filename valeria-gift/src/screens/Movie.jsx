import { useNavigate } from 'react-router-dom'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Movie.module.css'

export default function Movie() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <div className={s.teaser}>Oh wait! &hellip;</div>
        <h2 className={`serifDisplay ${s.headline}`}>That's not all.</h2>
        <p className={s.sub}>You've also got this.</p>

        <div className={`topLine ${s.ticket}`}>
          <div className={s.ticketTop}>
            <div className={s.notchL} />
            <div className={s.notchR} />
            <div className={s.cinema}>Cin&eacute;polis &middot; Plaza Carso VIP</div>
            <div className={s.movie}>Proyecto Fin del Mundo</div>
            <div className={s.venue}>Hall 2 &nbsp;&middot;&nbsp; Seats F-8 &amp; F-9</div>
          </div>
          <div className={s.ticketBottom}>
            <div className={s.field}><label>Date</label><span>Mar 24</span></div>
            <div className={s.field}><label>Time</label><span>8:00 PM</span></div>
            <div className={s.field}><label>Format</label><span>VIP</span></div>
          </div>
        </div>

        <p className={s.closing}>*Tequesitos are also included.</p>
        <div style={{ animation: 'fadeUp 0.8s 1.1s ease both', opacity: 0, width: '100%', marginTop: '1.5rem' }}>
          <button className="btnGhost" onClick={() => navigate('/confirm')}>
            Continue &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
