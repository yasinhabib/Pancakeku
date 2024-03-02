import { put, takeEvery } from 'redux-saga/effects'
import { GET_MARKER } from '../types'
import { connectToDatabase, dbGetDataMarker } from '../../db';
import { ResultSet } from 'expo-sqlite';
import { setDataMarker } from '../slices/markerData';

type AnyAction = {type: string, month: number, year: number}

export function* getDataMarkerSagas({month, year} : AnyAction) {
    try{   
        const db : SQLiteDatabase = yield connectToDatabase()
        const res : ResultSet = yield dbGetDataMarker(db,month,year)
        yield put(setDataMarker(res.rows as {
            date: string,
            type: string
        }[]))
    }catch(error: any){
    }
}

export function* watchGetDataMarkerAsync() {
    yield takeEvery(GET_MARKER, getDataMarkerSagas)
}