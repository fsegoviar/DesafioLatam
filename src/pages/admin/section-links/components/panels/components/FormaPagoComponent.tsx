import React from 'react';

type PropsPanel = {
  dataUser: any;
};

export const FormaPagoComponent = (props: PropsPanel) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-8 flex flex-col justify-center items-center h-100 w-100">
          <label>
            Forma de pago:{' '}
            <b>{props.dataUser.purchase?.payment_method?.description ?? ''}</b>
          </label>
        </div>
      </div>
    </>
  );
};
