import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { isIOS } from '../../constants'

const compareDates = (date1, date2) => {
  const date1WT = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2WT = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return date1WT.getTime() === date2WT.getTime();
}

export const Day = ({ SelectDay, SelectedRow, EventsAppmt, setSelectedRow, setSelectDay, setEventSelected }) => {
  const DayHours = Array.from({ length: 24 }, (_, index) => index);

  const getFormattedHour = (hour) => {
    const f_o = hour.toString().padStart(2, '0');
    return `${f_o}:00`;
  }
  //! Get Table Row function
  const GetTableRow = ({row, isLast}) => {

    const isSelectedDay = (row_el) => {
      let date2 = new Date(SelectDay.date);
      return compareDates(row_el, date2);
    }
  
    const onPressDay = (DaySelected) => {
      setSelectedRow(row);
      setSelectDay(DaySelected);
    }

    return (
      <View style={[styles.tableDaysRow, {backgroundColor: '#fff', flex: 1, elevation: 3, shadowColor: '#000', shadowOffset: {height: 4}, shadowOpacity: 0.1, shadowRadius: 3,}]}>
        {/* Day 0 = Sunday */}
        <TouchableOpacity onPress={() => {onPressDay(row[0])}} disabled={!row[0].active} style={[styles.tableBigBox, {borderLeftWidth: 0, backgroundColor: isSelectedDay(row[0].date) ? '#b7b7b7' : `${row[0].TodayDay ? '#335B96' : '#fff'}`, borderBottomLeftRadius: isLast ? 20 : 0 }]}>
          <Text style={{color: row[0].active ? `${row[0].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[0].TodayDay ? '800' : '400'}}>
            {new Date(row[0].date).getDate()}
          </Text>
          { row[0].AppmtEventIndex != null && <View style={styles.EventPoint}/> }
        </TouchableOpacity>
        {/* Day 1 = Monday */}
        <TouchableOpacity onPress={() => {onPressDay(row[1])}} disabled={!row[1].active} style={[styles.tableBigBox, { backgroundColor: isSelectedDay(row[1].date) ? '#b7b7b7' : `${row[1].TodayDay ? '#335B96' : '#fff'}` }]}>
          <Text style={{color: row[1].active ? `${row[1].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[1].TodayDay ? '800' : '400'}}>
            {new Date(row[1].date).getDate()}
          </Text>
          {
            row[1].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 2 = Tuesday */}
        <TouchableOpacity onPress={() => {onPressDay(row[2])}} disabled={!row[2].active} style={[styles.tableBigBox, { backgroundColor: isSelectedDay(row[2].date) ? '#b7b7b7' : `${row[2].TodayDay ? '#335B96' : '#fff'}` }]}>
          <Text style={{color: row[2].active ? `${row[2].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[2].TodayDay ? '800' : '400'}}>
            {new Date(row[2].date).getDate()}
          </Text>
          {
            row[2].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 3 = Wenesday */}
        <TouchableOpacity onPress={() => {onPressDay(row[3])}} disabled={!row[3].active} style={[styles.tableBigBox, { backgroundColor: isSelectedDay(row[3].date) ? '#b7b7b7' : `${row[3].TodayDay ? '#335B96' : '#fff'}` }]}>
          <Text style={{color: row[3].active ? `${row[3].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[3].TodayDay ? '800' : '400'}}>
            {new Date(row[3].date).getDate()}
          </Text>
          {
            row[3].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 4 = Thursday */}
        <TouchableOpacity onPress={() => {onPressDay(row[4])}} disabled={!row[4].active} style={[styles.tableBigBox, { backgroundColor: isSelectedDay(row[4].date) ? '#b7b7b7' : `${row[4].TodayDay ? '#335B96' : '#fff'}` }]}>
          <Text style={{color: row[4].active ? `${row[4].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[4].TodayDay ? '800' : '400'}}>
            {new Date(row[4].date).getDate()}
          </Text>
          {
            row[4].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 5 = Friday */}
        <TouchableOpacity onPress={() => {onPressDay(row[5])}} disabled={!row[5].active} style={[styles.tableBigBox, { backgroundColor: isSelectedDay(row[5].date) ? '#b7b7b7' : `${row[5].TodayDay ? '#335B96' : '#fff'}` }]}>
          <Text style={{color: row[5].active ? `${row[5].TodayDay ? '#fff' : '#000'}` : '#707070', fontWeight: row[5].TodayDay ? '800' : '400'}}>
            {new Date(row[5].date).getDate()}
          </Text>
          {
            row[5].AppmtEventIndex != null &&
              <View style={styles.EventPoint}/>
          }
        </TouchableOpacity>
        {/* Day 6 = Saturday */}
        <TouchableOpacity onPress={() => {onPressDay(row[6])}} disabled={!row[6].active} style={[styles.tableBigBox, {borderRightWidth: 0, borderLeftWidth: isIOS ? 1 : 0, backgroundColor: isSelectedDay(row[6].date) ? '#b7b7b7' : `${row[6].TodayDay ? '#335B96' : '#fff'}`, borderBottomRightRadius: isLast ? 20 : 0 }]}>
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

  const getEvent = (hora) => {
    let Event;
    if (SelectDay.AppmtEventIndex != null) {
      EventsAppmt.forEach(element => {
        let EventDate = new Date(element.Starting_Event_Date);
        if (EventDate.getHours() == hora && compareDates(EventDate, new Date(SelectDay.date))) {
          Event = element;
        }
      });
    }
    return Event;
  }

  const HourCard = ({i, hour}) => {
    let haveEvent = getEvent(hour);
    return (
      <View style={{width: '100%', height: 90, marginBottom: i == 23 ? (haveEvent != null ? 20 : -30) : 0}}>
        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '14%', fontSize: 15, color: '#707070'}}>{getFormattedHour(hour)}</Text>
          <View style={{height: 2, backgroundColor: '#707070', width: '85%', borderRadius: 10}} />
        </View>
        {
          haveEvent != null &&
          <TouchableOpacity onPress={() => {setEventSelected(haveEvent)}} style={{width: '85%', marginLeft: '14%', backgroundColor: '#f0f0f0', flex: 1, borderRadius: 5, flexDirection: 'row'}}>
            <View style={{width: '2%', height: '100%', backgroundColor: '#ff981c', borderTopLeftRadius: 5, borderBottomLeftRadius: 5}} />
            <View style={{paddingHorizontal: 5, paddingVertical: 3}}>
              <Text>{haveEvent.Event_Name}</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }

  return (
    <View style={{height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={styles.tableDaysRow}>
        <View style={[styles.tableBox, {borderLeftWidth: 0}]}><Text>D</Text></View>
        <View style={styles.tableBox}><Text>L</Text></View>
        <View style={styles.tableBox}><Text>M</Text></View>
        <View style={styles.tableBox}><Text>M</Text></View>
        <View style={styles.tableBox}><Text>J</Text></View>
        <View style={styles.tableBox}><Text>V</Text></View>
        <View style={[styles.tableBox, {borderRightWidth: 0, borderLeftWidth: isIOS ? 1 : 0}]}><Text>S</Text></View>
      </View>
      <GetTableRow row={SelectedRow} isLast={false} />

      <ScrollView style={{maxHeight: '81%', width: '100%', paddingTop: 10, paddingHorizontal: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        {
          DayHours.map((hour, i) => {
            return <HourCard key={i} i={i} hour={hour}/>
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  tableDaysRow: {
    width: '100%',
    height: 35,
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
    marginTop: 4
  },


})