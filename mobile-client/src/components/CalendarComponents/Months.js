import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { isIOS } from '../../constants';
import { useState } from 'react';

export const Moths = ({YearState, MonthState}) => {
  const [MonthArray, setMonthArray] = useState([]);

  const getAmountOfDays = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }

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

  //! Get Splitted array.
  const getSplittedArray = (BigArr) => {
    const splittedArr = [];

    for (let i = 0; i < BigArr.length; i += 7) {
      const subArray = BigArr.slice(i, i + 7);
      splittedArr.push(subArray);
    }
    return splittedArr;
  }

  //! Get Table Row function
  const GetTableRow = ({row, isLast}) => {
    return (
      <View style={[styles.tableDaysRow, {backgroundColor: '#fff', flex: 1}, isLast ? styles.LastRow : null]}>
        {/* Day 0 = Sunday */}
        <TouchableOpacity disabled={!row[0].active} style={[styles.tableBigBox, {borderLeftWidth: 0, borderBottomWidth: isLast ? 0 : 1 }]}>
          <Text style={{color: row[0].active ? '#000' : '#707070'}}>{new Date(row[0].date).getDate()}</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        {/* Day 1 = Monday */}
        <TouchableOpacity disabled={!row[1].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1 }]}>
          <Text style={{color: row[1].active ? '#000' : '#707070'}}>{new Date(row[1].date).getDate()}</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        {/* Day 2 = Tuesday */}
        <TouchableOpacity disabled={!row[2].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1 }]}>
          <Text style={{color: row[2].active ? '#000' : '#707070'}}>{new Date(row[2].date).getDate()}</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        {/* Day 3 = Wenesday */}
        <TouchableOpacity disabled={!row[3].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1 }]}>
          <Text style={{color: row[3].active ? '#000' : '#707070'}}>{new Date(row[3].date).getDate()}</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        {/* Day 4 = Thursday */}
        <TouchableOpacity disabled={!row[4].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1 }]}>
          <Text style={{color: row[4].active ? '#000' : '#707070'}}>{new Date(row[4].date).getDate()}</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        {/* Day 5 = Friday */}
        <TouchableOpacity disabled={!row[5].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1 }]}>
          <Text style={{color: row[5].active ? '#000' : '#707070'}}>{new Date(row[5].date).getDate()}</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
        {/* Day 6 = Saturday */}
        <TouchableOpacity disabled={!row[6].active} style={[styles.tableBigBox, {borderRightWidth: 0, borderLeftWidth: isIOS ? 1 : 0, borderBottomWidth: isLast ? 0 : 1 }]}>
          <Text style={{color: row[6 ].active ? '#000' : '#707070'}}>{new Date(row[6].date).getDate()}</Text>
          <View style={styles.EventPoint}/>
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    if (YearState != null && MonthState != null) {
      const currentMonthArr = getDaysOfMonth(YearState, MonthState);
      const BigArray = addMissingDays(currentMonthArr);
      const mes = getSplittedArray(BigArray);
      setMonthArray(mes);
    }
  }, [YearState, MonthState]);

  return (
    <View style={{height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
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
        MonthArray.map((row, i) => {
          return <GetTableRow key={i} row={row} isLast={i == (MonthArray.length - 1)? true : false}/>
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  tableDaysRow: {
    width: '100%',
    height: 45,
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
  LastRow: {
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomWidth: 0
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