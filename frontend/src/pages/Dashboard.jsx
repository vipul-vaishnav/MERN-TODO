import React from 'react';
import DashboardHeader from './../components/DashboardHeader';
import DashboardDrawer from './../components/DashboardDrawer';
import DashboardFooter from './../components/DashboardFooter';

const Dashboard = ({ windowWidth }) => {
  return (
    <main className="flex flex-col justify-between w-full h-screen overflow-hidden text-base font-normal text-gray-900 bg-white font-poppins">
      {/* Header */}
      <DashboardHeader windowWidth={windowWidth} />
      {/* MAIN SECTION WITH DRAWER */}
      <div className="flex-1 overflow-hidden">
        <DashboardDrawer windowWidth={windowWidth} />
      </div>
      {/* FOOTER */}
      <DashboardFooter />
    </main>
  );
};

export default Dashboard;
