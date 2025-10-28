import './App.css'
import { Route, Routes } from 'react-router-dom'
import BookingScreen from './screens/BookingScreen'
import SuccessScreen from './screens/SuccessScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookingScreen />} />
      <Route path="/success" element={<SuccessScreen />} />
    </Routes>
  );
}

export default App
