import { configureStore } from '@reduxjs/toolkit';
import idReducer from './reducers/id';
import ipadressReducer from './reducers/ipadress';
export default configureStore({
  reducer: {
    id: idReducer,
    ipadress: ipadressReducer,
  },
});