import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isBuilderPage = location.pathname === '/';

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      <Navbar />
      
      {/* 
        If it's the Builder (Home), we want flex-1 and NO overflow-y-auto on the main container 
        because the builder handles its own internal scrolling panels.
        
        If it's About/Contact, we want overflow-y-auto so the page scrolls normally.
      */}
      <main className={`flex-1 relative ${isBuilderPage ? 'overflow-hidden flex flex-col' : 'overflow-y-auto scrollbar-thin'}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;