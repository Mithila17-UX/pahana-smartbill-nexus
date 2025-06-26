
import React from 'react';
import { useAuth } from './AuthProvider';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { EmployeeDashboard } from './dashboards/EmployeeDashboard';
import { CustomerDashboard } from './dashboards/CustomerDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    case 'customer':
      return <CustomerDashboard />;
    default:
      return <div>Invalid user role</div>;
  }
};
