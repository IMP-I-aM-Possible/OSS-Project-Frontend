import { configureStore } from '@reduxjs/toolkit';
import idReducer from './reducers/id';
import ipadressReducer from './reducers/ipadress';
import DATAReducer from './reducers/maindata';
export default configureStore({
  reducer: {
    id: idReducer,
    ipadress: ipadressReducer,
    DATA: DATAReducer,
  },
});