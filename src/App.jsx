import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Fleets from './pages/Fleets.jsx'
import Users from './pages/Users.jsx'
import Settings from './pages/Settings.jsx'
import MyFleet from './pages/MyFleet.jsx'
import Vehicles from './pages/Vehicles.jsx'
import Drivers from './pages/Drivers.jsx'
import Attorneys from './pages/Attorneys.jsx'
import DetentionCenter from './pages/DetentionCenter.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            {/* Shared */}
            <Route path="/" element={<Dashboard />} />

            {/* Super Admin only */}
            <Route path="/fleets" element={<Fleets />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />

            {/* Fleet Owner only */}
            <Route path="/my-fleet" element={<MyFleet />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/attorneys" element={<Attorneys />} />
            <Route path="/facility/dc-4" element={<DetentionCenter />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
