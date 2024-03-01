import { all } from "redux-saga/effects";
import { watchInsertDataAsync } from "./insertData";
import { watchGetDataByDateAsync } from "./getData";
import { watchGetDataMarkerAsync } from "./getMarker";
import { watchDeleteDataAsync } from "./deleteData";
import { watchUpdateDataAsync } from "./updateData";

export function* rootSaga() {
    yield all([
        watchGetDataByDateAsync(),
        watchGetDataMarkerAsync(),
        watchInsertDataAsync(),
        watchDeleteDataAsync(),
        watchUpdateDataAsync(),
    ])
}