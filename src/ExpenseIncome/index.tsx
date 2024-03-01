import { Colors, Drawer, Text, View } from "react-native-ui-lib"
import ExpenseIncomeItem from "./ExpenseIncomeItem"
import { ScrollView } from "react-native"
import { dateFormat, formatCurrency } from "../helper"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { ExpenseIncomeDataType } from "../redux/slices/editData"
import { GET_DATA_BY_DATE } from "../redux/types"

const ExpenseIncome = () => {
    const dispatch = useDispatch()
    const expenseIncomeData = useSelector((state: RootState) => state.expenseIncomeData)
    const {date} = useSelector((state: RootState) => state.selectedDate)

    const incomeData = expenseIncomeData.filter(value => value.type == 'I')
    const expenseData = expenseIncomeData.filter(value => value.type == 'E')

    useEffect(() => {
        dispatch({type: GET_DATA_BY_DATE, date: date})
    },[date])

    return(
        <View style={{
            flexDirection:'column',
            flex: 1
        }}>
            <View 
                centerV 
                padding-s2 
                style={{
                    backgroundColor: 'chocolate',
                    flexBasis: 'auto', 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text color={Colors.grey80}>Tanggal : {dateFormat(date)}</Text>
            </View>
            <View 
                centerV 
                padding-s2 
                bg-white 
                style={{
                    backgroundColor: Colors.$backgroundSuccessLight, 
                    flexBasis: 'auto', 
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text text70>Total Pemasukan</Text>
                <Text text70>{formatCurrency(incomeData.map(value => value.nominal || 0).reduce((a,b) => a + b, 0))}</Text>
            </View>
            {
                incomeData.length == 0 && <View centerV padding-s2 bg-white style={{ backgroundColor: Colors.white, flexGrow: 1}}>
                    <Text center text70>Tidak ada pemasukan</Text>
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
                    backgroundColor: Colors.$backgroundDangerLight, 
                    flexBasis: 'auto', 
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text text70>Total Pengeluaran</Text>
                <Text text70>{formatCurrency(expenseData.map(value => value.nominal || 0).reduce((a,b) => a + b, 0))}</Text>
            </View>
            {
                expenseData.length == 0 && <View centerV padding-s2 bg-white style={{height: 40, backgroundColor: Colors.white, flexGrow: 1}}>
                    <Text center text70>Tidak ada pengeluaran</Text>
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