import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import BookingScreen from './screens/BookingScreen'
import SuccessScreen from './screens/SuccessScreen'
import ClientAuthScreen from './screens/ClientAuthScreen';
import NewClientDetailsScreen from './screens/NewClientDetailsScreen';
import ClientScreen from './screens/ClientScreen';
import TablesScreen from './screens/TablesScreen';
import TimeSlotsScreen from './screens/TimeSlotsScreen';

function App() {
  const isAuth = Boolean(Number(localStorage.getItem("businessId")));

  return (
    <Routes>
      <Route path="/r/:slug" element={<BookingScreen />} />
      <Route path="/success" element={<SuccessScreen />} />
      <Route path="/client-auth" element={<ClientAuthScreen />} />
      <Route path="/client-details" element={<NewClientDetailsScreen />} />
      <Route
        path="/client-home"
        element={
          isAuth ? <ClientScreen /> : <Navigate to="/client-auth" replace />
        }
      />
      <Route
        path="/tables"
        element={
          isAuth ? <TablesScreen /> : <Navigate to="/client-auth" replace />
        }
      />
      <Route
        path="/time-slots"
        element={
          isAuth ? <TimeSlotsScreen /> : <Navigate to="/client-auth" replace />
        }
      />
    </Routes>
  );
}

export default App
