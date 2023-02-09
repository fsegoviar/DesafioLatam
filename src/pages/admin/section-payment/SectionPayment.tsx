import React from 'react';
import { Navbar } from '../../../components';
import { TablePrices } from './components/TablePrices';
import { TableProvider, initialState } from './context/TableContext';

export const SectionPayment = () => {
  return (
    <>
      <Navbar />
      <div className="pt-48 px-10 w-full h-screen bg-[#F9F9F9]">
        <TableProvider {...initialState}>
          <TablePrices />
        </TableProvider>
      </div>
    </>
  );
};
