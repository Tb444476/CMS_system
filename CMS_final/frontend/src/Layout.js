import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

const Layout = ({ pages, showNavBar }) => {
  return (
    <div>
      {showNavBar && <NavBar pages={pages} />}
      <Outlet />
    </div>
  );
};

export default Layout;
