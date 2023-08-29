
//>> IMPORT LIBRERIES
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons'

//>> IMPORT COMPONENTS
import { Moths, ScreenTitle } from '../../../index';
import { isIOS } from '../../../constants';

export const Calendario = () => {
  const CurrentYear = new Date().getFullYear();
  const CurrentMonth = new Date().getMonth();

  //! STATES FOR THE CALENDAR
  const [YearState, setYearState] = useState(null);
  const [MonthState, setMonthState] = useState(null);
  const Months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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

  //! STARTER FUNCTION
  useEffect(() => {
    setStates(CurrentYear, CurrentMonth);
  }, []);

  // useEffect(() => {
  //   console.log(MonthState);
  // }, [MonthState]);

  return (
    <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{height: '100%'}} >
      <ScrollView style={styles.fullScreenContainer}>
        <View style={{backgroundColor:'#fff',}}>
        <ScreenTitle
            Label={"Calendario y recordatorios"}
            IconName={"calendar-blank"}
            fontSize={20}
            textColor={'#FFFFFF'}
            paddingH={30}
            isMainScreen={true}
          />

          <View View style={styles.CalendarSection}>
            <View style={styles.CalendarTop}>
              <TouchableOpacity onPress={() => substractMonth()}>
                <View><AntDesign name="left" size={30} color="#fff" /></View>
              </TouchableOpacity>
              <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>{getMothName(MonthState)} - {YearState}</Text>
              <TouchableOpacity onPress={() => addMonthState()}>
                <View><AntDesign name="right" size={30} color="#fff" /></View>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', height: '100%',backgroundColor: '#fff', borderBottomEndRadius: 20, borderBottomStartRadius: 20, height: isIOS ? 465 : 505, justifyContent: 'center', alignItems: 'center' }}>
              {/* HERE'S GONNA BE THE COMPONENTS OF THE CALENDAR */}
              {/* first component: Month */}
              <Moths MonthState={MonthState} YearState={YearState}/>

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
    marginTop: -25,
    marginBottom: 5,
    width: '90%',
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center'
  }
});