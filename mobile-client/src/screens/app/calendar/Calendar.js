
//>> IMPORT LIBRERIES
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

//>> IMPORT COMPONENTS
import { Day, EventInfo, Moths, ScreenTitle, getCalendarEvents } from '../../../index';
import { isIOS } from '../../../constants';

export const Calendar = () => {
  const { t } = useTranslation();
  const jwtToken = useSelector(state => state.responsible.jwtToken);
  const Patient_id = useSelector(state => state.patient.id);
  const isFocused = useIsFocused()
  const dayOfWeek = [`${t('calendar.dom')}`, `${t('calendar.lun')}`, `${t('calendar.mar')}`, `${t('calendar.mie')}`, `${t('calendar.jue')}`, `${t('calendar.vie')}`, `${t('calendar.sab')}`]

  //! Time Values
  const CurrentYear = new Date().getFullYear();
  const CurrentMonth = new Date().getMonth();

  //! STATES FOR THE CALENDAR
  const [YearState, setYearState] = useState(null);
  const [MonthState, setMonthState] = useState(null);
  const [EventsAppmt, setEventsAppmt] = useState(null);
  const [EventsMedic, setEventsMedic] = useState(null);
  
  const [SelectedRow, setSelectedRow] = useState(null);
  const [SelectDay, setSelectDay] = useState(null);
  const [EventSelected, setEventSelected] = useState(null);
  const Months = [`${t('calendar.january')}`, `${t('calendar.february')}`, `${t('calendar.march')}`, `${t('calendar.april')}`, `${t('calendar.may')}`, `${t('calendar.june')}`, `${t('calendar.july')}`,`${t('calendar.august')}`,`${t('calendar.sept')}`, `${t('calendar.oct')}`, `${t('calendar.november')}`, `${t('calendar.december')}`];

  //! SET THE INITIAL VALUES
  const setStates = (Year, Month) => {
    setYearState(Year);
    setMonthState(Month);
  }

  //! GET THE STRING OF THE MONTH
  const getMothName = (Month) => Months[Month];

  //! SUBSTRACT MONTH STATE
  const substractMonth = () => {
    setMonthState(prev => --prev);
    if (MonthState < 1) {
      setMonthState(11);
      setYearState(prev => --prev);
    }
  }

  //! ADD MONTH STATE
  const addMonthState = () => {
    setMonthState(prev => ++prev);
    if (MonthState > 10) {
      setMonthState(0);
      setYearState(prev => ++prev);
    }
  }

  //! GO BACK OF THE MONTHS
  const goBackMonths = () => {
    setSelectDay(null);
    setSelectedRow(null);
  }

  //! GO BACK OF THE EVENT
  const goBackEvent = () => {
    setEventSelected(null);
  }

  //! GET THE DAY TO THE TITLE
  const getTitleDay = (ES) => {
    const dt = new Date(ES.Starting_Event_Date);
    return `${dayOfWeek[dt.getDay()]} ${dt.getDate()}`
  }

  //! GET CALENDAR TOP
  const GetCalendarTop = () => {
    return (
      <View style={[SelectDay ? styles.CalendarTopMini : styles.CalendarTop]}>
        {
          SelectDay == null ?
          <>
            <TouchableOpacity onPress={() => substractMonth()}>
              <View><AntDesign name="left" size={30} color="#fff" /></View>
            </TouchableOpacity>
            <Text style={{color: '#fff', fontSize: 25, fontWeight: "700"}}>{getMothName(MonthState)} - {YearState}</Text>
            <TouchableOpacity onPress={() => addMonthState()}>
              <View><AntDesign name="right" size={30} color="#fff" /></View>
            </TouchableOpacity>
          </>
          : 
          EventSelected == null ?
            <>
              <TouchableOpacity onPress={() => {goBackMonths()}}>
                <View><Ionicons name="arrow-back" size={26} color="#fff" /></View>
              </TouchableOpacity>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: "700", marginLeft: 10}}>{getMothName(MonthState)} - {YearState}</Text>
            </>
            :
            <>
              <TouchableOpacity onPress={() => {goBackEvent()}}>
                <View><Ionicons name="arrow-back" size={26} color="#fff" /></View>
              </TouchableOpacity>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: "700", marginLeft: 10}}>{getTitleDay(EventSelected)}, {getMothName(MonthState)} - {YearState}</Text>
            </>
        }
      </View>
    )
  }

  //! Get the Events of the Patient.
  const getEvents = async () => {
    try {
      const {data} = await getCalendarEvents(jwtToken, Patient_id);
      setEventsAppmt(data.EventsAppmt);
      setEventsMedic(data.EventsMedic);
    } catch (error) {
      console.log(error);
    }
  }

  //! STARTER FUNCTION
  useEffect(() => {
    setStates(CurrentYear, CurrentMonth);
    getEvents();
  }, [isFocused]);

  return (
    <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{height: '100%'}} >
      <ScrollView style={styles.fullScreenContainer}>
        <View style={{backgroundColor:'#fff',}}>
        <ScreenTitle
            Label={`${t('calendar.title')}`}
            IconName={"calendar-blank"}
            fontSize={20}
            textColor={'#FFFFFF'}
            paddingH={30}
            isMainScreen={true}
          />

          <View View style={styles.CalendarSection}>
            <GetCalendarTop />
            <View style={{width: '100%',backgroundColor: '#fff', borderBottomEndRadius: 20, borderBottomStartRadius: 20, height: SelectDay ? ((isIOS ? (470 + 22) : (510 + 25))) : (isIOS ? 470 : 510), justifyContent: 'flex-start', alignItems: 'center' }}>
              {/* HERE'S GONNA BE THE COMPONENTS OF THE CALENDAR */}
              {
                SelectDay == null ?
                  <Moths MonthState={MonthState} YearState={YearState} EventsMedic={EventsMedic} EventsAppmt={EventsAppmt} setSelectedRow={setSelectedRow} setSelectDay={setSelectDay}/>
                  :
                  EventSelected == null ?
                    <Day SelectDay={SelectDay} setSelectDay={setSelectDay} SelectedRow={SelectedRow} setSelectedRow={setSelectedRow} EventsAppmt={EventsAppmt} setEventSelected={setEventSelected} />
                    :
                    <EventInfo EventSelected={EventSelected} />
              }

            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer:{
    height: '100%',
    marginTop: Constants.statusBarHeight
  },
  CalendarSection:{
    // overflow: 'hidden',
    backgroundColor: '#D2D2F9',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -30,
    marginBottom: 5,
    width: '92%',
    borderWidth: 1,
    borderColor: '#D2D2F9',
    borderWidth: 2,
    borderRadius: 20,
    borderTopWidth: 8,
    borderBottomWidth:3,
    borderTopColor: '#D2D2F9',
    //iOS
    shadowOffset: {width: -1, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowColor: '#BBBBBB',
  },
  CalendarTop: {
    backgroundColor: '#A375FF',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center'
  },
  CalendarTopMini: {
    backgroundColor: '#A375FF',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ShadowBox: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset:{height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  }
});