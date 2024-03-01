import { put, takeEvery } from 'redux-saga/effects'
import { setNewData } from '../slices/expenseIncomeData';
import { GET_DATA_BY_DATE } from '../types'
import { connectToDatabase, dbGetDataByDate } from '../../db';
import { ResultSet } from 'expo-sqlite';

type AnyAction = {type: string, date: String}

export function* getDataByDateSagas({date} : AnyAction) {
    try{   
        const db = connectToDatabase()
        const res : ResultSet = yield dbGetDataByDate(db,date)
        yield put(setNewData(res.rows))
    }catch(error: any){
        console.log(error)
    }
}

export function* watchGetDataByDateAsync() {
    yield takeEvery(GET_DATA_BY_DATE, getDataByDateSagas)
}