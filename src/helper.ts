import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

export const formatCurrency = (number: number) => {
    const IDR = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    if(number < 0){
      return `(${IDR.format(number * -1)})` 
    }
    return IDR.format(number)
}

export const formatDate = (date : Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()

    return `${year}-${pad(month,2)}-${pad(day,2)}`
}

export const dateFormat = (date: Date | string) : string | null => {
    if(typeof date == 'string'){
      if(date == null || date == undefined){
        return null
      }
      date = new Date(date)
    }
  
    if(date == null || date == undefined){
      return null
    }
  
    const day = date.getDate();
  
    const month = date.getMonth();
    const monthName = ['Jan','Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  
    const year = date.getFullYear();
  
    return day+' '+monthName[month]+' '+year;
}

export const dateFormatFull = (date: Date | string) : string | null => {
  if(typeof date == 'string'){
    if(date == null || date == undefined){
      return null
    }
    date = new Date(date)
  }

  if(date == null || date == undefined){
    return null
  }

  const day = date.getDate();

  const month = date.getMonth();
  const monthName = ['Januari','Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  const year = date.getFullYear();

  return day+' '+monthName[month]+' '+year;
}

export const pad = (num : number, size: number) => {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

export function openDatabase() {  
    const db = SQLite.openDatabase("db.db");
    return db;
}
  