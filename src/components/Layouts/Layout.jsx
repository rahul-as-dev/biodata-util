import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '../../utils/cn';

const Layout = () => {
  const location = useLocation();
  const isBuilderPage = location.pathname === '/create';

  return (
    <div className={cn("flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans",
      isBuilderPage ? "h-screen overflow-hidden" : "min-h-screen"
    )}>
      <Navbar />

      {/* 
        If it's the Builder, we lock the container so internal panels scroll.
        For other pages (Home, about, etc), we let the window scroll normally.
      */}
      <main className={`flex-1 relative ${isBuilderPage ? 'overflow-hidden flex flex-col' : ''}`}>
        <Outlet />
      </main>

      {!isBuilderPage && <Footer />}
    </div>
  );
};

export default Layout;