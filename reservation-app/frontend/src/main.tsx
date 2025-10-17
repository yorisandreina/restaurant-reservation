import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookingScreen from './screens/BookingScreen.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookingScreen />
  </StrictMode>,
)
