import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../redux/loginSlice';
import messagesReducer from '../redux/messagesSlice';
import usersReducer from '../redux/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    messages: messagesReducer,
    users: usersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
