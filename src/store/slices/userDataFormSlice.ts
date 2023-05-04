import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  UpdateOnlyEducation,
  UpdateOnlyLabor,
  UserBilling,
  UserData,
  UserDataState
} from './userData.interface';

const initialState: UserDataState = {
  id: 0,
  billing: null,
  billing_id: null,
  career: null,
  career_id: null,
  form_type_id: 0,
  price: null,
  price_id: null,
  status: '',
  step: 0,
  user: null,
  user_id: 0
};

export const userDataFormSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<UserDataState>) => {
      // state = { ...action.payload };
      // return state;
      console.log('Update data', Object.assign({}, state, action.payload));
      return Object.assign({}, state, action.payload);
    },
    updatePersonalDataCarrera: (state, action: PayloadAction<UserData>) => {
      // state = { ...action.payload };
      // return state;
      const result = {
        ...state,
        user: Object.assign({}, state.user, action.payload)
      };
      console.log('Update data', Object.assign({}, state, result));
      return Object.assign({}, state, result);
    },
    updateDataEducation: (
      state,
      action: PayloadAction<UpdateOnlyEducation>
    ) => {
      const result = {
        ...state,
        user: {
          ...state.user,
          education: Object.assign({}, state.user?.education, action.payload)
        }
      };
      return Object.assign({}, state, result);
    },
    updateDataLabor: (
      state: UserDataState,
      action: PayloadAction<UpdateOnlyLabor>
    ) => {
      const result = {
        ...state,
        user: {
          ...state.user,
          empleability: Object.assign(
            {},
            state.user?.empleability,
            action.payload
          )
        }
      };
      return Object.assign({}, state, result);
    },
    updateDataBilling: (
      state: UserDataState,
      action: PayloadAction<UserBilling>
    ) => {
      const result = {
        ...state,
        billing: Object.assign({}, state.billing, action.payload)
      };

      console.log('Result Billing update =>', Object.assign({}, state, result));
      return Object.assign({}, state, result);
    }
  }
});

export const {
  updateDataEducation,
  updateData,
  updateDataLabor,
  updateDataBilling,
  updatePersonalDataCarrera
} = userDataFormSlice.actions;

export default userDataFormSlice.reducer;
