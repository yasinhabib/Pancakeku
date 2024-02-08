import React, {useState} from 'react';
import {
  StatusBar,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import { Calendar } from 'react-native-calendars';
import ExpenseIncome from './ExpenseIncome';
import { ExpenseIncomeDataType } from './ExpenseIncome/interface';
import Header from './Header';

const expenseIncomeDatas : ExpenseIncomeDataType[] = [
  {
    date: '2024-02-08',
    description: 'Cuci Motor',
    type: 'E',
    nominal: 15000
  },
  {
    date: '2024-02-08',
    description: 'Galon',
    type: 'E',
    nominal: 5000
  },
  {
    date: '2024-02-08',
    description: 'Gaji',
    type: 'I',
    nominal: 8000000
  },
]

const income = {key: 'income', color: 'green', selectedDotColor: 'blue'};
const expense = {key: 'expense', color: 'red', selectedDotColor: 'blue'};

const App = () => {
  const [selected,setSelected] = useState('')
  
  return (
    
    <View useSafeArea style={{flexDirection: 'column',flex: 1}}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={'default'}
          />
          <Header />
          <View style={{flexBasis: 'auto'}}>
            <Calendar 
              onDayPress={day => {
                setSelected(day.dateString);
              }}
              markingType={'multi-dot'}
              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'},
                '2024-02-08': {dots: [income, expense]}
              }}
              />
          </View>
          <ExpenseIncome expenseIncomeDatas={expenseIncomeDatas}/>    
    </View>
  );
};

export default App;