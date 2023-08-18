import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route Component={AppLayout}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" Component={Dashboard} />
            <Route path="bookings" Component={Bookings} />
            <Route path="cabins" Component={Cabins} />
            <Route path="users" Component={Users} />
            <Route path="settings" Component={Settings} />
            <Route path="account" Component={Account} />
          </Route>
          <Route path="login" Component={Login} />
          <Route path="*" Component={PageNotFound} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
