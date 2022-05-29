import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LayoutRouter from '@/routes/LayoutRouter'
import RouteTitle from '@/routes/RouteTitle'
import NotFound from '@/pages/404'
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
              <RouteTitle title="Personeller">
                <Employee />
              </RouteTitle>
            }
          />
          <Route
            path="/permit"
            element={
              <RouteTitle title="Personel İzinleri">
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
              <RouteTitle title="Kullanıcılar">
                <Users />
              </RouteTitle>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
