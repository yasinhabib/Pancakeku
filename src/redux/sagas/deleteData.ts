import { put, takeEvery } from 'redux-saga/effects'
import { setNewData } from '../slices/expenseIncomeData';
import { DELETE } from '../types'
import { connectToDatabase, dbDeleteData, dbGetDataByDateType, dbGetDataMarker } from '../../db';
import { ResultSet, SQLiteDatabase } from 'expo-sqlite';
import { setDataMarker } from '../slices/markerData';
import { setSelectedDate } from '../slices/selectedDate';

type AnyAction = {type: string, id: number, date: string, dataType: string}

export function* deleteDataSagas({id,date,dataType} : AnyAction) {
    try{   
        const db : SQLiteDatabase = yield connectToDatabase()
        yield dbDeleteData(db,id)

        const selectedDate = new Date(date)


        const resMarker : ResultSet = yield dbGetDataMarker(db,selectedDate.getMonth() + 1,selectedDate.getFullYear())
        yield put(setSelectedDate(date))
        yield put(setDataMarker(resMarker.rows as {
            date: string,
            type: string
        }[]))

        const resData : ResultSet = yield dbGetDataByDateType(db,date,dataType)
        yield put(setNewData(resData.rows))
    }catch(error: any){
        console.log(error)
    }
}

export function* watchDeleteDataAsync() {
    yield takeEvery(DELETE, deleteDataSagas)
}