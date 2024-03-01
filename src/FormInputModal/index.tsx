import { DateTimePicker, Modal, NumberInput, Picker, PickerModes, TextField, View } from "react-native-ui-lib"
import { useEffect, useState } from "react"
import { formatDate } from "../helper"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { setVisible } from "../redux/slices/inputModal"
import { ExpenseIncomeDataType, setDataEdit } from "../redux/slices/editData"
import { insertData, updateData } from "../redux/slices/expenseIncomeData"
import { setSelectedDate } from "../redux/slices/selectedDate"
import { INSERT, UPDATE } from "../redux/types"

const defaultValue = {
    date: formatDate(new Date),
    description: '',
    nominal: 0,
    type: ''
}

const FormInputModal = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<ExpenseIncomeDataType>(defaultValue)
    const {date} = useSelector((state : RootState) => state.selectedDate)
    const {visible} = useSelector((state : RootState) => state.inputModal)
    const data = useSelector((state : RootState) => state.editData)

    const onCancel = () => {
        dispatch(setVisible(false))
        dispatch(setDataEdit({}))
    }

    useEffect(() => {
        if(data?.id){
            reset(data)
        }else{
            reset({
                date: date ? date : formatDate(new Date),
                description: '',
                nominal: 0,
                type: ''
            })
        }
    },[data,date])

    const reset = (data : ExpenseIncomeDataType) => {
        setFormData(data)
    }
    const onSubmit = () => {
        if(formData.id){
            dispatch({type: UPDATE, param: formData})
        }else{
            dispatch({type: INSERT, param: formData})
        }
        onCancel()
    }

    return(
        <Modal visible={visible} onBackgroundPress={onCancel} animationType="slide">
            <Modal.TopBar title="Tambah Data" onCancel={onCancel} onDone={onSubmit} doneLabel="Simpan" doneButtonProps={{color: 'black'}} useSafeArea/>
            <View style={{
                flexDirection:'column',
                flex: 1,
                padding: 16,
                gap: 16
            }}>
                <DateTimePicker 
                    value={formData.date? new Date(formData.date|| '') : new Date}
                    onChange={(date) => {
                        setFormData({
                            ...formData,
                            date: formatDate(date)
                        })
                    }}
                    placeholder={'Pilih Tanggal'} 
                    floatingPlaceholder
                    mode={'date'}
                    enableErrors
                />
                <Picker
                    value={formData.type}
                    fieldType="filter"
                    placeholder={'Tipe Catatan'}
                    onChange={(value) => {
                        setFormData({
                            ...formData,
                            type: value?.toString()
                        })
                    }}
                    useSafeArea
                    items={[
                        {
                            label: 'Pemasukan',
                            value: 'I'
                        },
                        {
                            label: 'Pengeluaran',
                            value: 'E'
                        },
                    ]}
                    mode={PickerModes.SINGLE}
                />
            
                <TextField
                    placeholder={'Deskripsi'}
                    floatingPlaceholder
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
                    defaultValue={formData.description}
                    enableErrors
                />
                <NumberInput 
                    initialNumber={formData.nominal}
                    onChangeNumber={(value) => setFormData({
                        ...formData,
                        nominal: value.type === 'valid' ? value.number : 0
                    })} 
                    textFieldProps={{
                        label: 'Nominal'
                    }}
                    fractionDigits={0}
                />
            </View>
        </Modal>
    )
}

export default FormInputModal