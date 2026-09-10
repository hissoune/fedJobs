import React from 'react'
import { getAuthToken, getRefreshToken } from './storage';
 import { Navigate } from 'react-router-dom';


export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const token = getAuthToken();
  const refreshToken = getRefreshToken();

  return token || refreshToken ? children : <Navigate to="/home" replace />
}
