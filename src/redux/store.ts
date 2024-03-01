import createSagaMiddleware from "@redux-saga/core";
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import editDataReducer from './slices/editData'
import expenseIncomeDataReducer from './slices/expenseIncomeData'
import inputModalReducer from './slices/inputModal'
import selectedDateReducer from './slices/selectedDate'
import markerDataReducer from './slices/markerData'
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    editData: editDataReducer,
    expenseIncomeData: expenseIncomeDataReducer,
    inputModal: inputModalReducer,
    selectedDate: selectedDateReducer,
    markerData: markerDataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;