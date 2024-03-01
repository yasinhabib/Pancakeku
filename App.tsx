import 'setimmediate'
import React, {useState} from 'react';
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

const App = () => {  
  return (
      <Provider store={store}>
        <View useSafeArea style={{flexDirection: 'column',flex: 1}}>
            <StatusBar
              animated={true}
              backgroundColor="#61dafb"
              barStyle={'default'}
              />
              <Header />
              <ExpenseIncomeCalendar />
              <ExpenseIncome />    
              <FormInputModal />    
        </View>
      </Provider>
  );
};

export default App;