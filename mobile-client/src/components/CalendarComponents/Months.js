import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { isIOS } from '../../constants';

export const Moths = ({YearState, MonthState}) => {
  const rows = [0, 1, 2, 3, 4];

  const getAmountOfDays = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }

  // const getDayName = (dayOfWeek) => {
  //   const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  //   return dayNames[dayOfWeek];
  // };

  // const createCalendar = () => {
  //   const calendar = [];
  //   for (let month = 0; month < 12; month++) {
  //     const daysInMoth = getAmountOfDays(2022, month);
  //     for (let day = 1; day <= daysInMoth; day++) {
  //       const c_d = new Date(2022, month, day);
  //       calendar.push({date: c_d, month});
  //     }
  //   }
  //   return calendar;
  // }

  const getDaysOfMonth = (Year, Month) => {
    const moth = [];
    const daysInMoth = getAmountOfDays(Year, Month);
    for (let day = 1; day <= daysInMoth; day++) {
      const m_d = new Date(Year, Month, day);
      moth.push({date: m_d, DayNumber: m_d.getDay(), active: true});
    }
    return moth
  }

  const addMissingDays = (mothArr) => {
    const newMonth = mothArr;
    // FIRST MISSING DAYS
    if(mothArr[0].DayNumber != 0) {
      let firstMonthDate = new Date(mothArr[0].date);

      // set the year and month to search
      let searchYear, searchMonth;
      if (firstMonthDate.getMonth() == 0){
        searchYear = firstMonthDate.getFullYear() - 1;
        searchMonth = 11;
      } else {
        searchYear = firstMonthDate.getFullYear();
        searchMonth = firstMonthDate.getMonth() - 1;
      }

      // get the days of the -1 month of the current month;
      let lessMonth = getDaysOfMonth(searchYear, searchMonth);

      // to avoid bug
      let constant = mothArr[0].DayNumber

      for (let i = 0; i < constant; i++) {
        let DayToAdd = new Date(lessMonth[lessMonth.length - (1 + i)].date);
        newMonth.unshift({date: DayToAdd, DayNumber: DayToAdd.getDay(), active: false});
      }
    }

    // LAST MISSING DAYS
    if (mothArr[mothArr.length - 1].DayNumber != 6) {

      let LastMonthDate = new Date(mothArr[mothArr.length - 1].date);

      // SET THE YEAR AND MONTH TO SEARCH
      let searchYear, searchMonth;
      if (LastMonthDate.getMonth == 11) {
        searchYear = LastMonthDate.getFullYear() + 1;
        searchMonth = 0;
      } else {
        searchYear = LastMonthDate.getFullYear();
        searchMonth = LastMonthDate.getMonth() + 1;
      }

      // get the days of the +1 month of the current month
      let nextMonth = getDaysOfMonth(searchYear, searchMonth);

      // variable to get the correct 
      let k = 0;

      for (let i = (mothArr[mothArr.length - 1].DayNumber + 1); i <= 6; i++) {
        let DayToAdd = new Date(nextMonth[0 + k].date);
        newMonth.push({date: DayToAdd, DayNumber: DayToAdd.getDay(), active: false});
        k++;
      }
    }
    return newMonth;
  }

  /*
  >> OBTENER EL ARRAY DE ARRAYS LOL
  const arrayOriginal = [...]; // Tu array de 35 objetos

  const arrayDeArrays = [];
  const elementosPorSubarray = 7;

  for (let i = 0; i < arrayOriginal.length; i += elementosPorSubarray) {
    const subarray = arrayOriginal.slice(i, i + elementosPorSubarray);
    arrayDeArrays.push(subarray);
  }

  console.log(arrayDeArrays);
  */

  //! Get Table Row function
  const GetTableRow = () => {
    return (
      <View style={[styles.tableDaysRow, {backgroundColor: '#fff', height: 60}]}>
        <TouchableOpacity style={[styles.tableBigBox, {borderLeftWidth: 0 }]}>
          <Text>28</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tableBigBox}>
          <Text>29</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tableBigBox}>
          <Text>30</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tableBigBox}>
          <Text>31</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tableBigBox}>
          <Text>1</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tableBigBox}>
          <Text>2</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tableBigBox, {borderRightWidth: 0, borderLeftWidth: isIOS ? 1 : 0}]}>
          <Text>3</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    if (YearState != null && MonthState != null) {
      const currentMonthArr = getDaysOfMonth(YearState, MonthState);
      const mes = addMissingDays(currentMonthArr);
      console.log(mes);
    }
  }, [YearState, MonthState]);

  return (
    <>
      <View style={styles.tableDaysRow}>
        <View style={[styles.tableBox, {borderLeftWidth: 0}]}><Text>D</Text></View>
        <View style={styles.tableBox}><Text>L</Text></View>
        <View style={styles.tableBox}><Text>M</Text></View>
        <View style={styles.tableBox}><Text>M</Text></View>
        <View style={styles.tableBox}><Text>J</Text></View>
        <View style={styles.tableBox}><Text>V</Text></View>
        <View style={[styles.tableBox, {borderRightWidth: 0, borderLeftWidth: isIOS ? 1 : 0}]}><Text>S</Text></View>
      </View>
      {
        rows.map(row => {
          return (<GetTableRow />)
        })
      }
    </>
  );
}

const styles = StyleSheet.create({
  tableDaysRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2'
  },
  tableBox: {
    flex: 1,
    borderColor: '#b4b4b4',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableBigBox: {
    flex: 1,
    borderColor: '#b4b4b4',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5
  },
  EventPoint: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor:'#F9B55D',
    marginTop: 5
  },




  container: {
    flex: 1,
    padding: 16,
  },
  dayNames: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 1/7 de la pantalla
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
})