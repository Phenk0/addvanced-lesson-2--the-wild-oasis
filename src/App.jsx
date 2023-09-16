import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Bookings from './pages/Bookings.jsx';
import Cabins from './pages/Cabins.jsx';
import Users from './pages/Users.jsx';
import Settings from './pages/Settings.jsx';
import Account from './pages/Account.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import GlobalStyles from './styles/GlobalStyles.js';
import AppLayout from './ui/AppLayout.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking.jsx';
import CheckinBooking from './features/check-in-out/CheckinBooking.jsx';
import ProtectedRoute from './ui/ProtectedRoute.jsx';
import { DarkModeProvider } from './context/DarkModeContext.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    // queries: { staleTime: 60 * 1000 }
    queries: { staleTime: 0 }
  }
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" Component={Dashboard} />
              <Route path="bookings" Component={Bookings} />
              <Route path="bookings/:bookingId" Component={Booking} />
              <Route path="checkin/:bookingId" Component={CheckinBooking} />
              <Route path="cabins" Component={Cabins} />
              <Route path="users" Component={Users} />
              <Route path="settings" Component={Settings} />
              <Route path="account" Component={Account} />
            </Route>
            <Route path="login" Component={Login} />
            <Route path="*" Component={PageNotFound} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: { duration: 5000 },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)'
            }
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
