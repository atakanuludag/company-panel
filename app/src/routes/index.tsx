import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserRole } from '@/models/enums'
import LayoutRouter from '@/routes/LayoutRouter'
import RouteTitle from '@/routes/RouteTitle'
import NotFound from '@/pages/404'
import Error from '@/pages/Error'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Employee from '@/pages/Employee'
import Permit from '@/pages/Permit'
import MyProfile from '@/pages/MyProfile'
import Users from '@/pages/Users'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutRouter />}>
          <Route
            path="/"
            element={
              <RouteTitle title="Dashboard">
                <Dashboard />
              </RouteTitle>
            }
          />
          <Route
            path="/employee"
            element={
              <RouteTitle
                title="Personeller"
                roleGuard
                roles={[UserRole.ADMIN]}
              >
                <Employee />
              </RouteTitle>
            }
          />
          <Route
            path="/permit"
            element={
              <RouteTitle
                title="Personel İzinleri"
                roleGuard
                roles={[UserRole.ADMIN]}
              >
                <Permit />
              </RouteTitle>
            }
          />
          <Route
            path="/my-profile"
            element={
              <RouteTitle title="Profilim">
                <MyProfile />
              </RouteTitle>
            }
          />
          <Route
            path="/users"
            element={
              <RouteTitle
                title="Kullanıcılar"
                roleGuard
                roles={[UserRole.ADMIN]}
              >
                <Users />
              </RouteTitle>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
