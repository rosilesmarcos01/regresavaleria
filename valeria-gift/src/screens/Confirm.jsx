import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BgOrbs from '../components/BgOrbs'
import s from '../styles/Confirm.module.css'
import { notifyResponse } from '../utils/notify'

export default function Confirm() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)

  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <h2 className={`serifDisplay ${s.question}`}>
          Please confirm&hellip;<br />your assistance
        </h2>
        <p className={s.sub}>Tuesday, March 24th &middot; 5:00 PM</p>
        <div style={{ animation: 'fadeUp 0.8s 0.6s ease both', opacity: 0, width: '100%' }}>
          <button className="btnYes" onClick={() => { notifyResponse('coming'); navigate('/accepted') }}>
            Yes, I'm in
          </button>
          <button className={s.notComing} onClick={() => setModal(true)}>
            Not coming
          </button>
        </div>
      </div>

      {modal && (
        <div className={s.backdrop} onClick={() => setModal(false)}>
          <div className={s.modal} onClick={e => e.stopPropagation()}>
            <p className={`serifDisplay ${s.modalTitle}`}>Are you sure?</p>
            <p className={s.modalSub}>This would be very sad.</p>
            <button className="btnYes" onClick={() => setModal(false)}>
              Actually, yes I'm coming
            </button>
            <button className={s.modalNo} onClick={() => { notifyResponse('not coming'); navigate('/') }}>
              Yes, I'm really not coming
            </button>
          </div>
        </div>
      )}
    </div>
  )
}