import React from 'react';
import DashboardHeader from './../components/DashboardHeader';

const Dashboard = ({ windowWidth }) => {
  return (
    <main className="w-full h-screen text-base font-normal text-gray-900 bg-red-100 font-poppins">
      <DashboardHeader windowWidth={windowWidth} />
    </main>
  );
};

export default Dashboard;
