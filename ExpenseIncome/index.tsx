import { Colors, Drawer, Text, View } from "react-native-ui-lib"
import { ExpenseIncomeDataType } from "./interface"
import ExpenseIncomeItem from "./ExpenseIncomeItem"
import { ScrollView } from "react-native"
import { formatCurrency } from "../helper"

type ExpenseIncomeType = {
    expenseIncomeDatas : ExpenseIncomeDataType[]
}

const ExpenseIncome = ({expenseIncomeDatas} : ExpenseIncomeType) => {
    const incomeData = expenseIncomeDatas.filter(value => value.type == 'I')
    const expenseData = expenseIncomeDatas.filter(value => value.type == 'E')
    return(
        <View style={{
            flexDirection:'column',
            flex: 1
        }}>
            <View 
                centerV 
                padding-s2 
                style={{
                    height: 40, 
                    backgroundColor: 'chocolate',
                    flexBasis: 'auto', 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Tanggal : 2024-02-08</Text>
            </View>
            <View 
                centerV 
                padding-s2 
                bg-white 
                style={{
                    height: 40, 
                    backgroundColor: Colors.$backgroundSuccessLight, 
                    flexBasis: 'auto', 
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text>Pemasukan</Text>
                <Text>Total: {formatCurrency(incomeData.map(value => value.nominal).reduce((a,b) => a + b, 0))}</Text>
            </View>
            {
                incomeData.length == 0 && <View centerV padding-s2 bg-white style={{ backgroundColor: Colors.white, flexGrow: 1}}>
                    <Text center>Tidak ada pemasukan</Text>
                </View>
            }
            {
                incomeData.length > 0 && <ScrollView scrollEnabled={true} alwaysBounceHorizontal={false} style={{flex: 1}}>
                {
                    incomeData.map((value,index) => (
                        <ExpenseIncomeItem key={index} index={index} expenseIncomeData={value}/>
                    ))
                }
                </ScrollView>
            }
            
            <View 
                centerV 
                padding-s2 
                bg-white 
                style={{
                    height: 40, 
                    backgroundColor: Colors.$backgroundDangerLight, 
                    flexBasis: 'auto', 
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text>Pengeluaran</Text>
                <Text>Total: {formatCurrency(expenseData.map(value => value.nominal).reduce((a,b) => a + b, 0))}</Text>
            </View>
            {
                expenseData.length == 0 && <View centerV padding-s2 bg-white style={{height: 40, backgroundColor: Colors.white, flexGrow: 1}}>
                    <Text center>Tidak ada pengeluaran</Text>
                </View>
            }
            {
                expenseData.length > 0 && <ScrollView scrollEnabled={true} alwaysBounceHorizontal={false} style={{flex: 1}}>
                {
                    expenseData.map((value,index) => (
                        <ExpenseIncomeItem key={index} index={index} expenseIncomeData={value}/>
                    ))
                }
                </ScrollView>
            }
        </View>
    )
}

export default ExpenseIncome