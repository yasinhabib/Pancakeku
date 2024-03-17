import { Colors, Text, View } from "react-native-ui-lib"
import { dateFormat, formatCurrency } from "../helper"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { ExpenseIncomeDataType } from "../redux/slices/editData"
import { connectToDatabase, dbGetDataByDate } from "../db"

const Summary = () => {
    const {date} = useSelector((state: RootState) => state.selectedDate)
    const markerData = useSelector((state: RootState) => state.markerData)
    const [data,setData] = useState<ExpenseIncomeDataType[]>()

    useEffect(() => {
        const getData = async () => {
            const db = connectToDatabase()
            const res = await dbGetDataByDate(db,date)

            setData(res.rows)
        }

        getData()
    },[date,markerData])

    return(
        <View 
            centerV 
            padding-s2 
            style={{
                backgroundColor: 'chocolate',
                flexBasis: 'auto', 
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 16,
            }}
        >
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Tanggal</Text>
                <Text color={Colors.grey80}>{dateFormat(date)}</Text>
            </View>
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Total Pemasukan</Text>
                <Text color={Colors.grey80}>{formatCurrency((data || []).filter(value => value.type == 'I').map(value => value.nominal || 0).reduce((a,b) => a+b,0))}</Text>
            </View>
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Total Pengeluaran </Text>
                <Text color={Colors.grey80}>{formatCurrency((data || []).filter(value => value.type == 'E').map(value => value.nominal || 0).reduce((a,b) => a+b,0))}</Text>
            </View>
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Total Saldo</Text>
                <Text color={Colors.grey80}>{formatCurrency((data || []).filter(value => value.type == 'I').map(value => value.nominal || 0).reduce((a,b) => a+b,0) - (data || []).filter(value => value.type == 'E').map(value => value.nominal || 0).reduce((a,b) => a+b,0))}</Text>
            </View>
        </View>
    )
}

export default Summary