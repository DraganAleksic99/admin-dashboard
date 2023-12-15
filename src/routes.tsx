import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './views/Home'
import { LinearProgress } from '@mui/material'
import ProtectedRoute from './components/protected-route'

const About = lazy(() => import('./views/About'))
const Dashboard = lazy(() => import('./layouts'))
const NotFoundPage = lazy(() => import('./views/NotFoundPage'))
const LoginPage = lazy(() => import('./views/dashboard/auth/LoginPage'))
const PricingPage = lazy(() => import('./views/pricing/PricingPage'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="not-found" replace />} />
        <Route
          path="/dashboard/:extension?"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
