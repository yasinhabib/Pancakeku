import { Button, Colors, Modal, NumberInput,  Text, TextField, View } from "react-native-ui-lib"
import { useEffect, useState } from "react"
import { dateFormat, formatCurrency } from "../helper"
import { useDispatch, useSelector } from "react-redux"
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootState } from "../redux/store"
import { setVisible } from "../redux/slices/inputModal"
import { ExpenseIncomeDataType } from "../redux/slices/editData"
import { GET_DATA_BY_DATE_TYPE, INSERT, UPDATE } from "../redux/types"
import ExpenseIncomeItem from "../ExpenseIncome/ExpenseIncomeItem"

const FormInputModal = () => {
    const dispatch = useDispatch()
    const {date} = useSelector((state: RootState) => state.selectedDate)
    const [formData, setFormData] = useState<ExpenseIncomeDataType>()
    // const {date} = useSelector((state : RootState) => state.selectedDate)
    const {visible,title} = useSelector((state : RootState) => state.inputModal)
    const data = useSelector((state : RootState) => state.expenseIncomeData)

    const onCancel = () => {
        dispatch(setVisible({visible: false, title: ''}))
        // dispatch(setDataEdit({}))
    }

    useEffect(() => {
        if(visible){
            setFormData({
                date: date,
                description: '',
                nominal: 0,
                type: title == 'Pemasukan' ? 'I' : 'E'
            })

            if(title == 'Pemasukan'){
                dispatch({type: GET_DATA_BY_DATE_TYPE, dataType: 'I', date: date})
            }else{
                dispatch({type: GET_DATA_BY_DATE_TYPE, dataType: 'E', date: date})
            }
        }
    },[visible])

    const onSubmit = () => {
        dispatch({type: INSERT, param: formData})
        setFormData({
            date: date,
            description: '',
            nominal: 0,
            type: title == 'Pemasukan' ? 'I' : 'E'
        })
    }

    return(
        <Modal visible={visible} onBackgroundPress={onCancel} animationType="slide">
            <Modal.TopBar title={title} onCancel={onCancel} useSafeArea/>
            <View style={{
                flexDirection:'column',
                flex: 1,
                padding: 16,
                gap: 16
            }}>
                <View 
                    centerV 
                    padding-s2 
                    style={{
                        backgroundColor: 'chocolate',
                        flexBasis: 'auto', 
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 16,
                        borderRadius: 8
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
                        <Text color={Colors.grey80}>Tanggal : {dateFormat(date)}</Text>
                        <Text color={Colors.grey80}>Total : {formatCurrency(data.map((value,index) => value.nominal || 0).reduce((a,b) => a + b,0))}</Text>
                    </View>
                    <View 
                        style={{
                            flexDirection:'row', 
                            gap: 8, 
                            alignItems: 'stretch', 
                            justifyContent: 'space-between',
                        }}
                    >
                        <View 
                            width={'50%'}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text color={Colors.grey80} textAlign="center">Deskripsi</Text>
                        </View>
                        <View 
                            width={'30%'}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                        <Text color={Colors.grey80} textAlign="center">Nominal</Text>
                        </View>
                        <View 
                            width={16} 
                            flexG
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text color={Colors.grey80} textAlign="center">Aksi</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{flexDirection:'row', gap: 8, alignItems: 'stretch', justifyContent: 'space-between'}}>
                    <View 
                        style={{
                            borderColor: 'black', 
                            borderWidth: 1, 
                            borderRadius: 8, 
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
                            // floatingPlaceholder
                            onSubmitEditing={({nativeEvent: {text}}) => {
                                setFormData({
                                    ...formData,
                                    description: text
                                })
                            }}
                            onChange={({nativeEvent: {text}}) => {
                                setFormData({
                                    ...formData,
                                    description: text
                                })
                            }}
                            defaultValue={formData?.description}
                            autoFocus
                        />
                    </View>
                    <View 
                        style={{
                            borderColor: 'black', 
                            borderWidth: 1, 
                            borderRadius: 8, 
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
                            textFieldProps={{textAlign: 'right'}}
                            fractionDigits={0}
                        />
                    </View>
                    <View width={16} flexG>
                        <Button 
                            flexG 
                            borderRadius={8} 
                            backgroundColor={'#66bb6a'}
                            iconSource={() => <Ionicons name="save" size={24} color="white" />}
                            onPress={() => onSubmit()}
                        />
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                {
                    data.map((value,index) => (
                        <ExpenseIncomeItem key={index} index={index} expenseIncomeData={value}/>
                    ))
                }                
            </View>
        </Modal>
    )
}

export default FormInputModal