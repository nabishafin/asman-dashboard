import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Fleets from './pages/Fleets.jsx'
import Users from './pages/Users.jsx'
import Settings from './pages/Settings.jsx'
import MyFleet from './pages/MyFleet.jsx'
import Vehicles from './pages/Vehicles.jsx'
import Drivers from './pages/Drivers.jsx'
import Attorneys from './pages/Attorneys.jsx'
import DetentionCenter from './pages/DetentionCenter.jsx'
import VehicleDetail from './pages/VehicleDetail.jsx'
import AttorneyProfile from './pages/AttorneyProfile.jsx'
import Subscription from './pages/Subscription.jsx'
import AllDrivers from './pages/AllDrivers.jsx'
import CaseTracker from './pages/CaseTracker.jsx'
import SosIncidents from './pages/SosIncidents.jsx'
import Analytics from './pages/Analytics.jsx'
import PartnerOnboarding from './pages/PartnerOnboarding.jsx'
import AdminDriverProfile from './pages/AdminDriverProfile.jsx'
import CaseTrackerAttorneyProfile from './pages/CaseTrackerAttorneyProfile.jsx'
import ManageSubscriptionPlans from './pages/ManageSubscriptionPlans.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

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
            <Route path="/fleets/onboard" element={<PartnerOnboarding />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/all-drivers" element={<AllDrivers />} />
            <Route path="/all-drivers/:driverId" element={<AdminDriverProfile />} />
            <Route path="/case-tracker" element={<CaseTracker />} />
            <Route path="/case-tracker/:attorneyId" element={<CaseTrackerAttorneyProfile />} />
            <Route path="/sos-incidents" element={<SosIncidents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/subscription/plans" element={<ManageSubscriptionPlans />} />

            {/* Fleet Owner only */}
            <Route path="/my-fleet" element={<MyFleet />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/attorneys" element={<Attorneys />} />
            <Route path="/attorneys/:attorneyId" element={<AttorneyProfile />} />
            <Route path="/facility/dc-4" element={<DetentionCenter />} />
            <Route path="/my-fleet/vehicle/:unitId" element={<VehicleDetail />} />
            <Route path="/subscription" element={<Subscription />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
