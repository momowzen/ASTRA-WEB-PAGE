import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { HomePage } from './pages/HomePage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { RegisterPage } from './pages/RegisterPage.tsx'
import { ProfilePage } from './pages/ProfilePage.tsx'
import { AdminDashboard } from './pages/AdminDashboard.tsx'
import { MembersPage } from './pages/MembersPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { BossTrackerPage } from './pages/BossTrackerPage.tsx'
import { HiddenClassPage } from './pages/HiddenClassPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { LoadingSpinner } from './components/ui/LoadingSpinner.tsx'
import { useAuth } from './hooks/useAuth.ts'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Verifying credentials..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Verifying access..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/boss-tracker" element={<BossTrackerPage />} />
      <Route path="/hidden-class" element={<HiddenClassPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/members" element={<MembersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
