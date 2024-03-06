import { put, takeEvery } from 'redux-saga/effects'
import { setNewData } from '../slices/expenseIncomeData';
import { GET_DATA_BY_DATE_TYPE } from '../types'
import { connectToDatabase, dbGetDataByDateType } from '../../db';
import { ResultSet } from 'expo-sqlite';

type AnyAction = {type: string, date: String, dataType: string}

export function* getDataByDateTypeSagas({date,dataType} : AnyAction) {
    try{   
        const db = connectToDatabase()
        const res : ResultSet = yield dbGetDataByDateType(db,date,dataType)
        yield put(setNewData(res.rows))
    }catch(error: any){
        console.log(error)
    }
}

export function* watchGetDataByDateTypeAsync() {
    yield takeEvery(GET_DATA_BY_DATE_TYPE, getDataByDateTypeSagas)
}