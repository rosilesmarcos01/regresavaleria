import emailjs from '@emailjs/browser'

const SERVICE_ID  = 'service_qyqxapm'
const TEMPLATE_ID = 'template_hm4e71t'
const PUBLIC_KEY  = 'lu2wpom9K3KqhgYNK'

export function notifyResponse(answer) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      answer,            // "coming" or "not coming"
      time: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
    },
    PUBLIC_KEY
  )
}
