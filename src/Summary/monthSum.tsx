import { Colors, Text, View } from "react-native-ui-lib"
import { formatCurrency } from "../helper"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const MonthSummary = () => {
    const {income, expense} = useSelector((state: RootState) => state.totalExpenseIncome)
    const {date} = useSelector((state: RootState) => state.selectedDate)

    const selectedDate = new Date(date)

    const monthName = ['Januari','Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    return(
        <View 
            centerV 
            padding-s2 
            style={{
                backgroundColor: 'chocolate',
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
                <Text color={Colors.grey80}>Pemasukan Bulan ini</Text>
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
                <Text color={Colors.grey80}>Pengeluaran Bulan ini</Text>
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
                <Text color={Colors.grey80}>Mutasi Bulan ini</Text>
                <Text color={Colors.grey80}>{formatCurrency(income - expense)}</Text>
            </View>
        </View>
    )
}

export default MonthSummary