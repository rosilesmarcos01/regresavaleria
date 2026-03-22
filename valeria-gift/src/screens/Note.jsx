import { useNavigate } from 'react-router-dom'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Note.module.css'

export default function Note() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <div className="eyebrow" style={{ animation: 'fadeUp 0.8s 0.1s ease both', opacity: 0 }}>
          A note 
        </div>
        <div className={`topLine ${s.card}`}>
          <div className="corners"><span /><span /><span /><span /></div>
          <div className={s.from}>From Marcos</div>
          <div className={s.text}>
            "Favor de comprarse algo<br />bonito para acompañarme a Guadalajara."
          </div>
        </div>
        <div style={{ animation: 'fadeUp 0.8s 0.6s ease both', opacity: 0, width: '100%' }}>
          <button className="btnGhost" onClick={() => navigate('/reveal')}>
            Open &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
