import { all } from "redux-saga/effects";
import { watchInsertDataAsync } from "./insertData";
import { watchGetDataByDateAsync } from "./getData";
import { watchGetDataMarkerAsync } from "./getMarker";
import { watchDeleteDataAsync } from "./deleteData";
import { watchUpdateDataAsync } from "./updateData";
import { watchGetDataByDateTypeAsync } from "./getDataByDateType";
import { watchTotalExpenseIncomeAsync } from "./setTotalExpenseIncome";

export function* rootSaga() {
    yield all([
        watchGetDataByDateAsync(),
        watchGetDataByDateTypeAsync(),
        watchGetDataMarkerAsync(),
        watchInsertDataAsync(),
        watchDeleteDataAsync(),
        watchUpdateDataAsync(),
        watchTotalExpenseIncomeAsync(),
    ])
}