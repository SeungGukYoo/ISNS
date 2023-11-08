import React from 'react';
import type { Props } from '../../';
import Navigation from './Navigation';

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      {children}
      <Navigation />
    </div>
  );
};

export default Layout;
