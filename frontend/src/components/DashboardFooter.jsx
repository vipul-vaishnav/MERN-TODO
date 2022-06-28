import React from 'react';

const DashboardFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 bg-white border-t border-gray-200">
      <p className="font-medium text-center">
        Taskzap task management app &#169;{year} by{' '}
        <a
          target="_blank"
          className="font-semibold text-gray-400 underline"
          href="https://github.com/vipul-vaishnav"
          rel="noopener noreferrer"
        >
          Vipul Vaishnav
        </a>
      </p>
    </footer>
  );
};

export default DashboardFooter;
