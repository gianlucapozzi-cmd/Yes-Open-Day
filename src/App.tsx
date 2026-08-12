import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ConsulenzaPage } from './pages/ConsulenzaPage'
import { OpenDayPage } from './pages/OpenDayPage'
import { ThankYouPage } from './pages/ThankYouPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OpenDayPage />} />
        <Route path="/open-day" element={<Navigate to="/" replace />} />
        <Route path="/grazie-open-day" element={<ThankYouPage />} />
        <Route path="/consulenza" element={<ConsulenzaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
