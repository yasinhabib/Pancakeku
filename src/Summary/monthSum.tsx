import { Colors, Text, View } from "react-native-ui-lib"
import { formatCurrency } from "../helper"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const MonthSummary = () => {
    const {income, expense, month, year} = useSelector((state: RootState) => state.totalExpenseIncome)
    const {date} = useSelector((state: RootState) => state.selectedDate)

    const monthName = ['Jan','Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

    return(
        <View 
            centerV 
            padding-s2 
            style={{
                backgroundColor: 'gray',
                flexBasis: 'auto', 
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 8
            }}
            // margin-20
        >
            {/* <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Bulan</Text>
                <Text color={Colors.grey80}>{monthName[selectedDate.getMonth()]}</Text>
            </View> */}
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Pemasukan {monthName[month-1]} {year}</Text>
                <Text color={Colors.grey80}>{formatCurrency(income)}</Text>
            </View>
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Pengeluaran {monthName[month-1]} {year}</Text>
                <Text color={Colors.grey80}>{formatCurrency(expense)}</Text>
            </View>
            <View 
                style={{
                    flexDirection:'row', 
                    gap: 8, 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Mutasi {monthName[month-1]} {year}</Text>
                <Text color={Colors.grey80}>{formatCurrency(income - expense)}</Text>
            </View>
        </View>
    )
}

export default MonthSummary