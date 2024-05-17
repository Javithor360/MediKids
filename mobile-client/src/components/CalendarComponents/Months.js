
//>> IMPORT LIBRARIES
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';

//>> IMPORT COMPONENTS
import { isIOS } from '../../constants';

export const Moths = ({YearState, MonthState, EventsAppmt, EventsMedic, setSelectedRow, setSelectDay}) => {
  const [MonthArray, setMonthArray] = useState([]);

  const getAmountOfDays = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }

  const compareDates = (date1, date2) => {
    const date1WT = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2WT = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return date1WT.getTime() === date2WT.getTime();
  }

  const getDaysOfMonth = (Year, Month) => {
    const moth = [];
    const daysInMoth = getAmountOfDays(Year, Month);
    for (let day = 1; day <= daysInMoth; day++) {
      const m_d = new Date(Year, Month, day);
      
      let TodayDay = false;
      if (compareDates(m_d, new Date())) {TodayDay = true};
      
      moth.push({date: m_d, DayNumber: m_d.getDay(), active: true, TodayDay});
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
  
  //! SET THE APPOINTMENT EVENTS IN THE MONTH ARRAY.
  const setAppmtEvents = (BigArr, EventsAppmt) => {
    let MonthEvents = BigArr;

    BigArr.forEach((el, i) => {
      if (EventsAppmt.length != 0) {
        EventsAppmt.forEach((ev, i) => {
          let EventDate = new Date(ev.Starting_Event_Date);
          let EvntObj = {};

          EvntObj.date = el.date;
          EvntObj.DayNumber = el.DayNumber;
          EvntObj.active = el.active;
          EvntObj.TodayDay = el.TodayDay;
  
          if (compareDates(EventDate, el.date)) {
            EvntObj.AppmtEventIndex = i;
          } else {
            EvntObj.AppmtEventIndex = null;
          }
          
          if (compareDates(el.date,EventDate)) {
            const ix = MonthEvents.indexOf(el);
            MonthEvents[ix] = EvntObj;
          }

        });
      }
    });
    return MonthEvents;
  }

  //>> CREATE THE ARRAY TO SHOW.
  const ArrayBuilder = (YearState, MonthState, EventsAppmt) => {
    const currentMonthArr = getDaysOfMonth(YearState, MonthState);
    const BigArray = addMissingDays(currentMonthArr);
    const MonthEvents = setAppmtEvents(BigArray, EventsAppmt);
    const array_splitted = getSplittedArray(MonthEvents);
    setMonthArray(array_splitted);
  }

  //! Get Table Row function
  const GetTableRow = ({row, isLast}) => {

    const onPressDay = (DaySelected) => {
      setSelectedRow(row);
      setSelectDay(DaySelected);
    }

    return (
      <View style={[styles.tableDaysRow, {backgroundColor: '#fff', flex: 1}, isLast ? styles.LastRow : null]}>
        {/* Day 0 = Sunday */}
        <TouchableOpacity onPress={() => onPressDay(row[0])} disabled={!row[0].active} style={[styles.tableBigBox, {borderLeftWidth: 0, borderBottomWidth: isLast ? 0 : 1, backgroundColor: row[0].TodayDay ? '#335B96' : '#fff', borderBottomLeftRadius: isLast ? 20 : 0 }]}>
          <Text style={{color: row[0].active ? `${row[0].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[0].TodayDay ? '800' : '400'}}>
            {new Date(row[0].date).getDate()}
          </Text>
          {
            row[0].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 1 = Monday */}
        <TouchableOpacity onPress={() => onPressDay(row[1])} disabled={!row[1].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1, backgroundColor: row[1].TodayDay ? '#335B96' : '#fff' }]}>
          <Text style={{color: row[1].active ? `${row[1].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[1].TodayDay ? '800' : '400'}}>
            {new Date(row[1].date).getDate()}
          </Text>
          {
            row[1].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 2 = Tuesday */}
        <TouchableOpacity onPress={() => onPressDay(row[2])} disabled={!row[2].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1, backgroundColor: row[2].TodayDay ? '#335B96' : '#fff'}]}>
          <Text style={{color: row[2].active ? `${row[2].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[2].TodayDay ? '800' : '400'}}>
            {new Date(row[2].date).getDate()}
          </Text>
          {
            row[2].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 3 = Wenesday */}
        <TouchableOpacity onPress={() => onPressDay(row[3])} disabled={!row[3].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1, backgroundColor: row[3].TodayDay ? '#335B96' : '#fff' }]}>
          <Text style={{color: row[3].active ? `${row[3].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[3].TodayDay ? '800' : '400'}}>
            {new Date(row[3].date).getDate()}
          </Text>
          {
            row[3].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 4 = Thursday */}
        <TouchableOpacity onPress={() => onPressDay(row[4])} disabled={!row[4].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1, backgroundColor: row[4].TodayDay ? '#335B96' : '#fff' }]}>
          <Text style={{color: row[4].active ? `${row[4].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[4].TodayDay ? '800' : '400'}}>
            {new Date(row[4].date).getDate()}
          </Text>
          {
            row[4].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 5 = Friday */}
        <TouchableOpacity onPress={() => onPressDay(row[5])} disabled={!row[5].active} style={[styles.tableBigBox, {borderBottomWidth: isLast ? 0 : 1, backgroundColor: row[5].TodayDay ? '#335B96' : '#fff' }]}>
          <Text style={{color: row[5].active ? `${row[5].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[5].TodayDay ? '800' : '400'}}>
            {new Date(row[5].date).getDate()}
          </Text>
          {
            row[5].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 6 = Saturday */}
        <TouchableOpacity onPress={() => onPressDay(row[6])} disabled={!row[6].active} style={[styles.tableBigBox, {borderRightWidth: 0, borderLeftWidth: isIOS ? 1 : 0, borderBottomWidth: isLast ? 0 : 1, backgroundColor: row[6].TodayDay ? '#335B96' : '#fff', borderBottomRightRadius: isLast ? 20 : 0 }]}>
          <Text style={{color: row[6].active ? `${row[6].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[6].TodayDay ? '800' : '400'}}>
            {new Date(row[6].date).getDate()}
          </Text>
          {
            row[6].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    if (YearState != null && MonthState != null && EventsAppmt != null ) {
      ArrayBuilder(YearState, MonthState, EventsAppmt);
    }
  }, [YearState, MonthState, EventsAppmt]);

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
    width: 11,
    height: 11,
    borderRadius: 10,
    backgroundColor:'#ff981c',
    marginTop: 7
  },
  LastRow: {
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomWidth: 0
  },
  ActiveBoxText: {
    color: 'red',
    fontWeight: "700",
    fontSize: 14,
  }
})