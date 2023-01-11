import React from 'react';
import { Navbar } from '../../components';
import { TablePrices } from './components/TablePrices';

export const PricesPage = () => {
  return (
    <>
      <Navbar />
      <div
        className="pt-48 p-10 w-full h-screen"
        style={{ background: '#F9F9F9' }}
      >
        <TablePrices />
      </div>
    </>
  );
};
