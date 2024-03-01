import { Colors, Drawer, GridListItem, Text, View } from "react-native-ui-lib"
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { formatCurrency } from "../helper";
import { useDispatch } from "react-redux";
import { setVisible } from "../redux/slices/inputModal";
import { ExpenseIncomeDataType, setDataEdit } from "../redux/slices/editData";
import { DELETE } from "../redux/types";

type ExpenseIncomeItemType = {
    expenseIncomeData : ExpenseIncomeDataType
    index: number
}

const ExpenseIncomeItem = ({expenseIncomeData,index}:ExpenseIncomeItemType) => {
    const dispatch = useDispatch()

    const showModalEdit = (data: ExpenseIncomeDataType) => {
        dispatch(setVisible(true))
        dispatch(setDataEdit(data))
    }
    return(
        <GestureHandlerRootView >
            <Drawer 
                rightItems={
                    [
                        {
                            customElement:  <View style={{flexDirection: 'column'}} centerH>
                                                <FontAwesome name={'pencil'} size={16} color={Colors.grey10}/>
                                                <Text color={Colors.grey10}>Ubah</Text>
                                            </View>,
                            background: Colors.$backgroundWarningHeavy, 
                            onPress: () => showModalEdit(expenseIncomeData)
                        },
                        {
                            customElement:  <View style={{flexDirection: 'column'}} centerH>
                                                <FontAwesome name={'trash'} size={16} color={Colors.grey70}/>
                                                <Text color={Colors.grey70}>Hapus</Text>
                                            </View>,
                            background: Colors.$backgroundDangerHeavy, 
                            onPress: () => dispatch({type: DELETE, id: expenseIncomeData.id, date: expenseIncomeData.date}),
                        }
                    ]
                }
                style={{
                    flex: 1,
                    height: 40
                }}
            >
                <View paddingL-15 paddingR-9 paddingV-5 bg-white style={{backgroundColor: index % 2 == 0 ? Colors.grey70 : Colors.grey50, flexDirection: 'column', height: 40, justifyContent: 'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text text70 style={{flex: 1}}>{expenseIncomeData.description}</Text>
                        <Text text70 style={{flexBasis: 'auto', textAlign: 'right'}}>{formatCurrency(expenseIncomeData.nominal || 0)}</Text>
                    </View>
                </View>
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default ExpenseIncomeItem