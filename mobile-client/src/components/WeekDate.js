import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { eachWeekOfInterval, addDays, isSunday, format, startOfMonth, subMonths, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons'; 

const WeekDate = () => {
  const currentDate = new Date();
  const startDate = currentDate;
  const endDate = new Date(2023, 11, 31);

  // Getting the start of month
  const startOfCurrentMonth = startOfMonth(currentDate);

  const options = { weekStartsOn: 1 };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const weeksWithoutSundays = useMemo(() => {
    return eachWeekOfInterval({ start: startDate, end: endDate }, options).filter((date) => !isSunday(date));
  }, [startDate, endDate]);

  const weeksByMonth = useMemo(() => {
    return weeksWithoutSundays.reduce((acc, startDate) => {
      const endDate = addDays(startDate, 5);
      const monthKey = format(startDate, 'MMMM', { locale: es });
      const weekRange = `${format(startDate, 'dd/MM/yyyy')} al ${format(endDate, 'dd/MM/yyyy')}`;
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }

      acc[monthKey].push(weekRange);
      return acc;
    }, {});
  }, [weeksWithoutSundays]);

  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const goToPreviousMonth = () => {
    setSelectedWeek(null);
    const previousMonth = subMonths(currentMonth, 1);

    const isFirstWeekIncluded = weeksWithoutSundays.some(
      (date) => format(date, 'MM') === format(startOfMonth(previousMonth), 'MM')
    );

    if (isFirstWeekIncluded) {
      setCurrentMonth(previousMonth);
    }
  };

  const goToNextMonth = () => {
    setSelectedWeek(null);
    const nextMonth = addMonths(currentMonth, 1);
    if (nextMonth <= endDate) {
      setCurrentMonth(nextMonth);
    }
  };

  const handleSelectWeek = (weekRange) => {
    setSelectedWeek(selectedWeek === weekRange ? null : weekRange);
  };

  return (
    <View style={styles.componentContainer}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.previousArrowC} onPress={goToPreviousMonth}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {capitalizeFirstLetter(format(currentMonth, 'MMMM', { locale: es }))}
        </Text>
        <TouchableOpacity style={styles.previousArrowC} onPress={goToNextMonth}>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.weeksContainer}>
      {weeksByMonth[format(currentMonth, 'MMMM', { locale: es })] &&
        weeksByMonth[format(currentMonth, 'MMMM', { locale: es })].map((week, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => handleSelectWeek(week)}
            style={[
              styles.cardWeekContainer,
              selectedWeek === week && styles.selectedCard,
            ]}
          >
            <View style={styles.cardTitleWeek}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Semana:</Text>
            </View>
            <View style={styles.weekRangeContainer}>
              <Text style={[styles.cardText, selectedWeek === week && styles.selectedCardText]}>
                {week}
              </Text>
            </View>

          </TouchableOpacity>
        ))}
      </View>
      
      {selectedWeek && (
        <View style={styles.selectedWeekContainer}>
          <Text style={styles.selectedWeekText}>Semana seleccionada: {selectedWeek}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer:{
    width: wp('100%'),
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#A375FF',
    width: wp('90%'),
    height: 40,
    borderRadius: 10,
  },
  previousArrowC: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  weeksContainer: {
    width: wp('90%'),
    // height: 250,
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardWeekContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 40,
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderColor:'#5AB1BB',
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  weekRangeContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleWeek: {
    width: '30%',
    height: '100%',
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor:'#A375FF',
    borderWidth: 1.5,
  },
  cardText: {
    fontSize: 16,
  },
  selectedCardText: {
    fontWeight: 'bold',
  },
  selectedWeekContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'#E8E8E8',
    elevation: 1
  },
  selectedWeekText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#707070',
  },
});

export default WeekDate;