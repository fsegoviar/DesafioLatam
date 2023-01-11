import React from 'react';
import { Navbar } from '../../components';
import { TableLinks } from './components/TableLinks';

export const HomeAdmin = () => {
  return (
    <>
      <Navbar />
      <div
        className="pt-48 p-10 w-full h-screen"
        style={{ background: '#F9F9F9' }}
      >
        <TableLinks />
      </div>
    </>
  );
};
