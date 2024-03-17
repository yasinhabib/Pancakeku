import { Button, Colors, Drawer, GridListItem, NumberInput, Text, TextField, View } from "react-native-ui-lib"
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { formatCurrency } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ExpenseIncomeDataType, setDataEdit } from "../redux/slices/editData";
import { DELETE, UPDATE } from "../redux/types";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";

type ExpenseIncomeItemType = {
    expenseIncomeData : ExpenseIncomeDataType
    index: number
}

const ExpenseIncomeItem = ({expenseIncomeData,index}:ExpenseIncomeItemType) => {
    const dispatch = useDispatch()
    const {date} = useSelector((state: RootState) => state.selectedDate)
    const [formData, setFormData] = useState<ExpenseIncomeDataType>()

    useEffect(() => {
        setFormData(expenseIncomeData)
    },[expenseIncomeData.id])

    const submitData = () => {
        dispatch({type: UPDATE, param: formData})
    }

    const deleteData = () => {
        dispatch({type: DELETE, id: formData?.id, date: date,dataType: expenseIncomeData.type})
    }

    useEffect(() => {
        const getData = setTimeout(() => {
            if(formData?.nominal !== expenseIncomeData.nominal){
                submitData()
            }
          }, 500)
      
          return () => clearTimeout(getData)
    },[formData?.nominal])

    return(
        <View style={{flexDirection:'row', alignItems: 'stretch', justifyContent: 'space-between',gap: 0}}>
            <View 
                style={{
                    borderColor: 'black', 
                    borderWidth: 1, 
                    borderLeftWidth: 0,
                    borderRadius: 0, 
                    paddingHorizontal: 8,
                    paddingVertical: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }} 
                width={'50%'}
            >
                <TextField
                    placeholder={'Deskripsi'}
                    accessible 
                    accessibilityLabel={`Ubah Deskripsi Baris ke ${index + 1}`}
                    // floatingPlaceholder
                    onSubmitEditing={({nativeEvent: {text}}) => {
                        setFormData({
                            ...formData,
                            description: text
                        })

                        submitData()
                    }}
                    onChange={({nativeEvent: {text}}) => {
                        setFormData({
                            ...formData,
                            description: text
                        })
                    }}
                    defaultValue={formData?.description}
                    focusable
                    style={{
                        height: 48
                    }}
                />
            </View>
            <View 
                style={{
                    borderColor: 'black', 
                    borderWidth: 1, 
                    borderLeftWidth: 0,
                    borderRadius: 0, 
                    paddingHorizontal: 8,
                    paddingVertical: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }} 
                width={'30%'}
            >
                {/* <TextInput ref={nominalRef} /> */}
                <NumberInput 
                    initialNumber={formData?.nominal}
                    onChangeNumber={(value) => setFormData({
                        ...formData,
                        nominal: value.type === 'valid' ? value.number : 0
                    })} 
                    textFieldProps={{
                        textAlign: 'right', 
                        focusable: true,
                        accessible: true,
                        accessibilityLabel:`Ubah Nominal Baris ke ${index + 1}`,
                        style: {
                            height: 48
                        }
                    }}
                    fractionDigits={0}
                />
            </View>
            <View 
                width={16} 
                flexG
                style={{
                    borderColor: 'black', 
                    borderWidth: 1, 
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderRadius: 0
                }} 
            >
                <Button 
                    flexG 
                    borderRadius={0} 
                    backgroundColor={'#f44336'}
                    iconSource={() => <Ionicons name="trash-bin" size={24} color="white" />}
                    onPress={() => deleteData()}
                    accessibility
                    accessibilityLabel={`Tombol Hapus Baris ke ${index + 1}`}
                />
            </View>
        </View>
    )
}

export default ExpenseIncomeItem