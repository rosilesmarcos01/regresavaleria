import { useNavigate } from 'react-router-dom'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Reveal.module.css'

export default function Reveal() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <div className="eyebrow" style={{ animation: 'fadeUp 0.8s 0.1s ease both', opacity: 0 }}>
          Here you go
        </div>
        <h1 className={`serifDisplay ${s.name}`}>Valeria,</h1>
        <p className={s.sub}>this one's all yours.</p>
        <div className={`topLine ${s.card}`}>
          <div className={s.shine} />
          <div className="corners"><span /><span /><span /><span /></div>
          <div className={s.brand}>ZARA</div>
          <div className={s.tag}>Gift Card</div>
          <div className={s.amount}>$3,000</div>
          <div className={s.currency}>MXN</div>
        </div>
        <p className={s.msg}>Now decide how you'd like to use it.</p>
        <div style={{ animation: 'fadeUp 0.8s 1s ease both', opacity: 0, width: '100%' }}>
          <button className="btnGhost" onClick={() => navigate('/choice')}>
            See redeem options &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
