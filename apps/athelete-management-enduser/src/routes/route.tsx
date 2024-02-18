import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { getItem } from '@utils'
import { RouteProps } from './type'

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const token = getItem<string>('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

const PublicRoute: FC<RouteProps> = ({ children }) => {
  const token = getItem<string>('token')
  const location = useLocation()

  if (token && !['/verify-email', '/set-password'].includes(location.pathname)) {
    return <Navigate to="/challenges" state={{ from: location }} replace />
  }
  return children
}

export { PrivateRoute, PublicRoute }
