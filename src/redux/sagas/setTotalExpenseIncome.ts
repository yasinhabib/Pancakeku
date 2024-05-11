import { put, takeEvery } from 'redux-saga/effects'
import { GET_MONTH_TOTAL, } from '../types'
import { connectToDatabase, dbGetTotalByMonth } from '../../db';
import { ResultSet, SQLiteDatabase } from 'expo-sqlite';
import { setTotalExpenseIncome } from '../slices/totalExpenseIncome';

type AnyAction = {type: string, month: number, year: number}

export function* setTotalExpenseIncomeSagas({month,year} : AnyAction) {
    try{   
        const db : SQLiteDatabase = yield connectToDatabase()
        const res : ResultSet = yield dbGetTotalByMonth(db,month,year)

        const result = res.rows as {
            income: number,
            expense: number
        } []

        yield put(setTotalExpenseIncome({
            ...result[0],
            month: month,
            year: year
        }))
    }catch(error: any){
        console.log(error)
    }
}

export function* watchTotalExpenseIncomeAsync() {
    yield takeEvery(GET_MONTH_TOTAL, setTotalExpenseIncomeSagas)
}