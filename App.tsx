import 'setimmediate'
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {
  StatusBar,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import ExpenseIncome from './src/ExpenseIncome';
import Header from './src/Header';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import FormInputModal from './src/FormInputModal';
import ExpenseIncomeCalendar from './src/ExpenseIncomeCalendar';
import { connectToDatabase } from './src/db';
import Summary from './src/Summary';

const App = () => {  
  useEffect(() => {
    if(Platform.OS == 'ios' || Platform.OS == 'android'){
      connectToDatabase()
    }
  },[])
  return (
      <Provider store={store}>
        <View useSafeArea style={{flexDirection: 'column',flex: 1}}>
            <StatusBar
              animated={true}
              backgroundColor="#61dafb"
              barStyle={'default'}
            />
            <Header />
            <ExpenseIncome />    
            <ExpenseIncomeCalendar />
            <FormInputModal />  
            <Summary />  
        </View>
      </Provider>
  );
};

export default App;