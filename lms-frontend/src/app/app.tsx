import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from 'react-router-dom';
import LoginPage from './pages/login';
import Dashboard from './pages/dashbaord/dashboard';
import ProtectedRoute from './components/protectedRoutes';
import { isAuthenticated } from '../utils';


export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard"
          element={
            <Dashboard />
          } />

        <Route path="/"
          element={
            <Dashboard />
          } />

        <Route path="/login" element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } />

      </Routes>
    </Router>
  );
}

export default App;
