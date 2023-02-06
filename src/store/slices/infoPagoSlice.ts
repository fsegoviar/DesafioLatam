import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InfoAdminPago, UpdateInfoAdminPago } from '../../interfaces';

const initialState: InfoAdminPago = {
  nombre: '',
  career_id: 1,
  name: '',
  value: 0,
  freeDiscount: 0,
  tuition: '',
  comments: ''
};

export const infoPagoSlice = createSlice({
  name: 'infoAdminPayment',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UpdateInfoAdminPago>) => {
      state = Object.assign(state, action.payload);
    },
    restore: (state) => {
      state = initialState;
    }
  }
});

export default infoPagoSlice.reducer;
