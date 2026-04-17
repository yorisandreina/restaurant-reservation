import './App.css'
import { Route, Routes } from 'react-router-dom'
import BookingScreen from './screens/BookingScreen'
import SuccessScreen from './screens/SuccessScreen'
import ClientAuthScreen from './screens/ClientAuthScreen';
import NewClientDetailsScreen from './screens/NewClientDetailsScreen';
import ClientScreen from './screens/ClientScreen';
import TablesScreen from './screens/TablesScreen';
import TimeSlotsScreen from './screens/TimeSlotsScreen';
import SetPasswordScreen from './screens/SetPasswordScreen';
import BusinessSetupScreen from './screens/BusinessSetupScreen';
import { Toaster } from "sonner";
import NotFoundPage from './components/ui/NotFoundPage';

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/r/:slug" element={<BookingScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/client-auth" element={<ClientAuthScreen />} />
        <Route path="/client-details" element={<NewClientDetailsScreen />} />
        <Route path="/client-home" element={<ClientScreen />} />
        <Route path="/tables" element={<TablesScreen />} />
        <Route path="/time-slots" element={<TimeSlotsScreen />} />
        <Route path="/set-password" element={<SetPasswordScreen />} />
        <Route path="/business-setup" element={<BusinessSetupScreen />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App
