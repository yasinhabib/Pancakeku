import { put, takeEvery } from 'redux-saga/effects'
import { setNewData } from '../slices/expenseIncomeData';
import { INSERT } from '../types'
import { ExpenseIncomeDataType } from '../slices/editData';
import { connectToDatabase, dbGetDataByDateType, dbGetDataMarker, dbInsertData } from '../../db';
import { ResultSet, SQLiteDatabase } from 'expo-sqlite';
import { setDataMarker } from '../slices/markerData';
import { setSelectedDate } from '../slices/selectedDate';

type AnyAction = {type: string, param: ExpenseIncomeDataType}

export function* insertDataSagas({param} : AnyAction) {
    try{   
        const db : SQLiteDatabase = yield connectToDatabase()
        yield dbInsertData(db,param)

        const selectedDate = new Date(param.date || '')


        const resMarker : ResultSet = yield dbGetDataMarker(db,selectedDate.getMonth() + 1,selectedDate.getFullYear())
        yield put(setSelectedDate(param.date || ''))
        yield put(setDataMarker(resMarker.rows as {
            date: string,
            type: string
        }[]))

        const resData : ResultSet = yield dbGetDataByDateType(db,param.date || '',param.type || '')
        yield put(setNewData(resData.rows))
    }catch(error: any){
        console.log(error)
    }
}

export function* watchInsertDataAsync() {
    yield takeEvery(INSERT, insertDataSagas)
}