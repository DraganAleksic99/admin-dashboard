import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './views/Home'
import { LinearProgress } from '@mui/material'
import ProtectedRoute from './components/protected-route'
import DashboardDefaultContent from './views/dashboard/dashboard-default-content'
import ProductUpdateView from './views/dashboard/product/ProductUpdateView'

const About = lazy(() => import('./views/About'))
const Dashboard = lazy(() => import('./layouts'))
const NotFoundPage = lazy(() => import('./views/NotFoundPage'))
const LoginPage = lazy(() => import('./views/dashboard/auth/LoginPage'))
const PricingPage = lazy(() => import('./views/pricing/PricingPage'))
const ProductListView = lazy(() => import('./views/dashboard/product/ProductListView'))
const ProductCreateView = lazy(() => import('./views/dashboard/product/ProductCreateView'))
const CalendarView = lazy(() => import('./views/dashboard/calendar/CalendarView'))
const AccountView = lazy(() => import('./views/account/accountView'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="not-found" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardDefaultContent />} />
          <Route path="list-products" element={<ProductListView />} />
          <Route path="create-product" element={<ProductCreateView />} />
          <Route path="edit-product/:productId" element={<ProductUpdateView />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="account" element={<AccountView />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
