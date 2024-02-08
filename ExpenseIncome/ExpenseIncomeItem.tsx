import { Colors, Drawer, GridListItem, Text, View } from "react-native-ui-lib"
import { FontAwesome } from '@expo/vector-icons';
import { ExpenseIncomeDataType } from "./interface"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { formatCurrency } from "../helper";

type ExpenseIncomeItemType = {
    expenseIncomeData : ExpenseIncomeDataType
    index: number
}

const ExpenseIncomeItem = ({expenseIncomeData,index}:ExpenseIncomeItemType) => {
    return(
        <GestureHandlerRootView >
            <Drawer 
                rightItems={
                    [
                        {
                            customElement:  <View style={{flexDirection: 'column'}} centerH>
                                                <FontAwesome name={'pencil'} size={24} color={Colors.grey10}/>
                                                <Text color={Colors.grey10}>Ubah</Text>
                                            </View>,
                            background: Colors.$backgroundWarningHeavy, 
                            onPress: () => console.log('read pressed')
                        },
                        {
                            customElement:  <View style={{flexDirection: 'column'}} centerH>
                                                <FontAwesome name={'trash'} size={24} color={Colors.grey70}/>
                                                <Text color={Colors.grey70}>Hapus</Text>
                                            </View>,
                            background: Colors.$backgroundDangerHeavy, 
                            onPress: () => console.log('read pressed'),
                        }
                    ]
                }
                style={{
                    flex: 1
                }}
            >
                <View paddingH-15 paddingV-5 bg-white style={{backgroundColor: index % 2 == 0 ? Colors.grey70 : Colors.grey50, flexDirection: 'column'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text text70 style={{flex: 1}}>{expenseIncomeData.description}</Text>
                        <Text text70 style={{flexBasis: 'auto', textAlign: 'right'}}>{formatCurrency(expenseIncomeData.nominal)}</Text>
                    </View>
                </View>
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default ExpenseIncomeItem