import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './screens/Auth'
import Mystery from './screens/Mystery'
import Note from './screens/Note'
import Reveal from './screens/Reveal'
import Choice from './screens/Choice'
import Nudge from './screens/Nudge'
import Certificate from './screens/Certificate'
import Movie from './screens/Movie'
import Confirm from './screens/Confirm'
import Accepted from './screens/Accepted'

const isAuth = () => sessionStorage.getItem('vg_auth') === 'true'

function Protected({ children }) {
  return isAuth() ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Auth />} />
        <Route path="/mystery"     element={<Protected><Mystery /></Protected>} />
        <Route path="/note"        element={<Protected><Note /></Protected>} />
        <Route path="/reveal"      element={<Protected><Reveal /></Protected>} />
        <Route path="/choice"      element={<Protected><Choice /></Protected>} />
        <Route path="/nudge"       element={<Protected><Nudge /></Protected>} />
        <Route path="/certificate" element={<Protected><Certificate /></Protected>} />
        <Route path="/movie"       element={<Protected><Movie /></Protected>} />
        <Route path="/confirm"     element={<Protected><Confirm /></Protected>} />
        <Route path="/accepted"    element={<Protected><Accepted /></Protected>} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
