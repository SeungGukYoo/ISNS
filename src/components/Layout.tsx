import React, { useEffect, useState } from 'react';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import choiceTitleName from 'util/handleTitle';
import type { Props } from '../../';
import Navigation from './Navigation';
const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  useEffect(() => {
    const result = choiceTitleName(window.location.pathname);
    setTitle(result);
  });

  return (
    <div className="layout">
      <h1 className="global__title">
        {title === 'Element' ? (
          <MdOutlineNavigateBefore className="arrow-icon" onClick={() => navigate(-1)} />
        ) : (
          title
        )}
      </h1>

      <div className="global__children">{children}</div>
      <Navigation />
    </div>
  );
};

export default Layout;
