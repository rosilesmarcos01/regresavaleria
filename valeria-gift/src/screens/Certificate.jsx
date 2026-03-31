import BgOrbs from '../components/BgOrbs'
import s from '../styles/Certificate.module.css'

export default function Certificate() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <BgOrbs />
      <div className={s.inner}>
        <div className="eyebrow" style={{ animation: 'fadeUp 0.6s 0.1s ease both', opacity: 0 }}>
          Here you go!
        </div>
        <div className={`topLine ${s.certificate}`}>
          <div className="corners"><span /><span /><span /><span /></div>

          <div className={s.iconWrap}>
            <svg className="icon iconMd" viewBox="0 0 24 24" style={{ stroke: 'var(--cream)', opacity: 0.9 }}>
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>

          <div className={s.label}>This certificate confirms that</div>
          <div className={`serifDisplay ${s.name}`}>Valeria</div>
          <div className={s.forText}>has been reserved</div>

          <div className="greenLine" />

          <div className={s.amountLabel}>at ZARA</div>

          <div className={s.balanceWrap}>
            <div className={s.balanceRow}>
              <span className={s.balanceUsed}>$1,000 used</span>
              <span className={s.balanceRemain}>$2,000 left</span>
            </div>
            <div className={s.barTrack}>
              <div className={s.barFill} />
            </div>
            <div className={s.balanceTotal}>of $3,000 MXN</div>
          </div>

          <div className={s.detail}>
            With an exclusive personal shopper<br />
            <strong>No expiratioin date</strong><br />
          </div>

          <div className={s.signatureWrap}>
            <div className={s.signature}>Marcos</div>
            <div className={s.signatureLabel}>Randomly selected personal shopper &middot;</div>
          </div>
        </div>

        <div style={{ animation: 'fadeUp 0.8s 0.6s ease both', opacity: 0, width: '100%' }}>
          <button className="btnGhost" onClick={() => navigate('/movie')}>
            wrap up &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
