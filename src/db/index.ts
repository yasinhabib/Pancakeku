import { Query, ResultSet, ResultSetError, SQLStatementArg, SQLiteDatabase } from "expo-sqlite";
import { formatDate, openDatabase } from "../helper"
import { ExpenseIncomeDataType } from "../redux/slices/editData";

  
export const connectToDatabase = () => {
    const db = openDatabase()
    return db
}

export const dbGetDataByDateType = async (db: SQLiteDatabase,date : String, type: String) => {
    const query : Query[] = [{sql: 'select * from ExpenseIncomes where date = ? and type = ?' ,args: [date,type]}]
    const getData = async () => {
        return await db.execAsync(query,true)
    }
    let res = await getData()
    if((res[0] as ResultSetError).error){
        await db.transactionAsync(
            async (tx) => {
                await tx.executeSqlAsync(`
                    CREATE TABLE IF NOT EXISTS ExpenseIncomes (
                        id INTEGER DEFAULT 1,
                        date DATE,
                        description TEXT,
                        type TEXT,
                        nominal REAL,
                        PRIMARY KEY(id)
                    )
                `);
                
                res[0] = await tx.executeSqlAsync("select * from ExpenseIncomes where date = ? and type = ?", [date as SQLStatementArg, type as SQLStatementArg]);
            }
        );
    }
    const resultSet = res[0] as ResultSet
    return resultSet
}

export const dbGetDataByDate = async (db: SQLiteDatabase,date : String) => {
    const query : Query[] = [{sql: 'select * from ExpenseIncomes where date = ?',args: [date]}]
    const getData = async () => {
        return await db.execAsync(query,true)
    }
    let res = await getData()
    if((res[0] as ResultSetError).error){
        await db.transactionAsync(
            async (tx) => {
                await tx.executeSqlAsync(`
                    CREATE TABLE IF NOT EXISTS ExpenseIncomes (
                        id INTEGER DEFAULT 1,
                        date DATE,
                        description TEXT,
                        type TEXT,
                        nominal REAL,
                        PRIMARY KEY(id)
                    )
                `);
                
                res[0] = await tx.executeSqlAsync("select * from ExpenseIncomes where date = ?", [date as SQLStatementArg]);
            }
        );
    }
    const resultSet = res[0] as ResultSet
    return resultSet
}

export const dbGetTotalByMonth = async (db: SQLiteDatabase,month : number, year: number) => {
    const startDate = formatDate(new Date(year, month - 1, 1))
    const endDate = formatDate(new Date(year, month, 0))
    const query : Query[] = [{sql: "select  IFNULL(sum(case type when 'I' then nominal else 0 end),0) income,  IFNULL(sum(case type when 'E' then nominal else 0 end),0) expense from ExpenseIncomes where date between ? and ?",args: [startDate, endDate]}]

    const getData = async () => {
        return await db.execAsync(query,true)
    }
    let res = await getData()
    if((res[0] as ResultSetError).error){
        await db.transactionAsync(
            async (tx) => {
                await tx.executeSqlAsync(`
                    CREATE TABLE IF NOT EXISTS ExpenseIncomes (
                        id INTEGER DEFAULT 1,
                        date DATE,
                        description TEXT,
                        type TEXT,
                        nominal REAL,
                        PRIMARY KEY(id)
                    )
                `);
                
                res[0] = await tx.executeSqlAsync("select  IFNULL(sum(case type when 'I' then nominal else 0 end),0) income,  IFNULL(sum(case type when 'E' then nominal else 0 end),0) expense from ExpenseIncomes where date between ? and ?", [startDate as SQLStatementArg, endDate as SQLStatementArg]);
            }
        );
    }
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