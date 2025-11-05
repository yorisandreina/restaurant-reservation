import './App.css'
import { Route, Routes } from 'react-router-dom'
import BookingScreen from './screens/BookingScreen'
import SuccessScreen from './screens/SuccessScreen'
import ClientAuthScreen from './screens/ClientAuthScreen';
import NewClientDetailsScreen from './screens/NewClientDetailsScreen';
import ClientScreen from './screens/ClientScreen';
import TablesScreen from './screens/TablesScreen';
import TimeSlotsScreen from './screens/TimeSlotsScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookingScreen />} />
      <Route path="/success" element={<SuccessScreen />} />
      <Route path="/client-auth" element={<ClientAuthScreen />} />
      <Route path="/client-details" element={<NewClientDetailsScreen />} />
      <Route path="/client-home" element={<ClientScreen />} />
      <Route path="/tables" element={<TablesScreen />} />
      <Route path="/time-slots" element={<TimeSlotsScreen />} />
    </Routes>
  );
}

export default App
