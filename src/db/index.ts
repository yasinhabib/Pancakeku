import { Query, ResultSet, SQLiteDatabase } from "expo-sqlite";
import { formatDate, openDatabase } from "../helper"
import { ExpenseIncomeDataType } from "../redux/slices/editData";

  
export const connectToDatabase = () => {
    const db = openDatabase()

    db.transaction((tx) => {
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS ExpenseIncomes (
                id INTEGER DEFAULT 1,
                date DATE,
                description TEXT,
                type TEXT,
                nominal REAL,
                PRIMARY KEY(id)
            )
        `);
    });

    return db
}

export const dbGetDataByDate = async (db: SQLiteDatabase,date? : String) => {
    const query : Query[] = [{sql: 'select * from ExpenseIncomes where date = ?',args: [date]}]
    const res = await db.execAsync(query,true)
    const resultSet = res[0] as ResultSet
    return resultSet
}

export const dbGetDataMarker = async (db: SQLiteDatabase,month: number, year: number) => {
    const startDate = formatDate(new Date(year, month - 1, 1))
    const endDate = formatDate(new Date(year, month, 0))
    
    const query : Query[] = [{sql: 'select distinct date, type from ExpenseIncomes where date between ? and ? order by date asc',args: [startDate, endDate]}]
    const res = await db.execAsync(query,true)
    const resultSet = res[0] as ResultSet
    return resultSet
}


export const dbGetLatestId = async (db: SQLiteDatabase) => {
    const query : Query[] = [{sql: 'select id from ExpenseIncomes order by id desc limit 1',args: []}]
    const res = await db.execAsync(query,true)
    const resultSet = res[0] as ResultSet
    if(resultSet.rows.length == 0){
        return 0
    }else{
        return resultSet.rows[0].id as number
    }
}

export const dbInsertData = async (db: SQLiteDatabase, data: ExpenseIncomeDataType) => {
    const lastId = await dbGetLatestId(db)

    await db.transactionAsync(
        async (tx) => {
            await tx.executeSqlAsync("insert into ExpenseIncomes(id,date,description,type,nominal) values (?,?,?,?,?)", [lastId + 1, data.date || '',data.description || '',data.type || '',data.nominal || 0]);
        }
    );
}

export const dbUpdateData = async (db: SQLiteDatabase, data: ExpenseIncomeDataType) => {
    await db.transactionAsync(
        async (tx) => {
            await tx.executeSqlAsync("update ExpenseIncomes set date = ?,description = ?,type = ?,nominal = ? where id = ?", [data.date || '',data.description || '',data.type || '',data.nominal || 0,data.id || 0]);
        }
    );
}

export const dbDeleteData = async(db:SQLiteDatabase, id: number) => {
    await db.transactionAsync(
        async (tx) => {
            await tx.executeSqlAsync("delete from ExpenseIncomes where id = ?", [id]);
        }
    );
}