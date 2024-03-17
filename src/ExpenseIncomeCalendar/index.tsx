import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { View } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootState } from "../redux/store";
import { MarkedDates } from "react-native-calendars/src/types";
import { setSelectedDate } from "../redux/slices/selectedDate";
import { GET_MARKER, GET_MONTH_TOTAL } from "../redux/types";
import { dateFormatFull } from "../helper";

const income = {key: 'income', color: 'green', selectedDotColor: 'green'};
const expense = {key: 'expense', color: 'red', selectedDotColor: 'red'};

const ExpenseIncomeCalendar = () => {
    const dispatch = useDispatch()
    const {date} = useSelector((state: RootState) => state.selectedDate)
    const markerData = useSelector((state: RootState) => state.markerData)

    const [markedDates,setMarkedDates] = useState<MarkedDates>({
        '2024-02-08' : {accessibilityLabel: '',}
    })

    useEffect(() => {
        const selectedDate = new Date(date)
        dispatch({type: GET_MARKER, month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear()})
    },[])

    useEffect(() => {
        //contoh '2024-02-08': {dots: [income, expense]}
        const marked = markerData
        const markedDate : MarkedDates = marked.map(value => value.date).reduce(
        (r,key) => {
            return {
                ...r,
                [key || '']: {dots: [], selectedColor: 'orange', selected: key == date ? true : false},
            }
        }, {});
        for(const mark of marked){
            markedDate[mark.date || ''].dots?.push(mark.type == 'I' ? income : expense)
        }
        if(markedDate[date]){
            if(marked.length > 0){
                markedDate[date].accessibilityLabel = `Tanggal ${dateFormatFull(date)} terdapat data ${marked.map(value => value.type == 'I' ? 'Pemasukan' : 'Pengeluaran').join(' dan ')}`
            }else{
                markedDate[date].accessibilityLabel = `Tanggal ${dateFormatFull(date)} tidak terdapat data pemasukan dan pengeluaran}`
            }
        }

        if(!marked.some(value => value.date == date)){
            markedDate[date] = {dots: [], selectedColor: 'orange', selected: true}
        }
        
        setMarkedDates(markedDate)
    },[markerData, date])

    const initMarker = (month : number,year : number) => {
        dispatch({type: GET_MARKER, month: month, year: year})
        dispatch({type: GET_MONTH_TOTAL, month: month, year: year})
    }

    return(
        <View style={{flexBasis: 'auto'}}>
            <Calendar 
                onDayPress={day => {
                    dispatch(setSelectedDate(day.dateString));
                }}
                onMonthChange={(date) => initMarker(date.month, date.year)}
                markingType={'multi-dot'}
                markedDates={{
                    ...markedDates
                }}
                renderArrow={(direction) => {
                    if(direction == 'left'){
                        return <Ionicons name="chevron-back-outline" size={28} color="black" />
                    }

                    if(direction == 'right'){
                        return <Ionicons name="chevron-forward-outline" size={28} color="black" />
                    }
                }}
            />
            
        </View>
    )
}

export default ExpenseIncomeCalendar