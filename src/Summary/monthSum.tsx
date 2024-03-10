import { Colors, Text, View } from "react-native-ui-lib"
import { formatCurrency } from "../helper"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const MonthSummary = () => {
    const total = useSelector((state: RootState) => state.totalExpenseIncome)
    const {date} = useSelector((state: RootState) => state.selectedDate)

    const selectedDate = new Date(date)

    const monthName = ['Januari','Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    return(
        <View 
            centerV 
            padding-s2 
            style={{
                backgroundColor: 'gray',
                flexBasis: 'auto', 
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 16
            }}
            // margin-20
        >
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Bulan</Text>
                <Text color={Colors.grey80}>{monthName[selectedDate.getMonth()]}</Text>
            </View>
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Total Bulan Ini</Text>
                <Text color={Colors.grey80}>{formatCurrency(total)}</Text>
            </View>
        </View>
    )
}

export default MonthSummary