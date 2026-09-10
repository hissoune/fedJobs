import React from 'react'
import { getAuthToken } from './storage';
import { Navigate } from 'react-router-dom';

function PublicRoutes({ children }: { children: React.ReactNode }) {
        const token = getAuthToken();
 
  return !token?children:<Navigate to="/plans" replace />
}

export default PublicRoutes