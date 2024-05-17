import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { eachWeekOfInterval, addDays, format, startOfMonth, subMonths, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const WeekDate = ({ setWeek }) => {
  const currentDate = new Date();
  const startDate = currentDate;
  const endDate = new Date(2024, 11, 31);
  const { t } = useTranslation();
  const startOfCurrentMonth = startOfMonth(currentDate);
  const lng = useSelector(state => state.starter.Language);

  const options = { weekStartsOn: 1 };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getSaturday = (date) => {
    const dayOfWeek = date.getDay();
    const daysToSaturday = 6 - dayOfWeek;
    return addDays(date, daysToSaturday);
  };

  const weeksWithoutWeekend = useMemo(() => {
    return eachWeekOfInterval({ start: startDate, end: endDate }, options).filter((startOfWeek) => {
      const endOfWeek = getSaturday(startOfWeek);
      return currentDate <= endOfWeek;
    });
  }, [startDate, endDate, currentDate]);

  const weeksByMonth = useMemo(() => {
    return weeksWithoutWeekend.reduce((acc, startDate) => {
      const endDate = getSaturday(addDays(startDate, 4));
      const monthKey = format(startDate, 'MMMM', { locale: es });
      const weekRange = `${format(startDate, 'dd/MM/yyyy')} ${t('weekDate.to')} ${format(endDate, 'dd/MM/yyyy')}`;
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }

      acc[monthKey].push(weekRange);
      return acc;
    }, {});
  }, [weeksWithoutWeekend]);

  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const goToPreviousMonth = () => {
    setSelectedWeek(null);
    setWeek(null);
    const previousMonth = subMonths(currentMonth, 1);

    const isFirstWeekIncluded = weeksWithoutWeekend.some(
      (date) => format(date, 'MM') === format(startOfMonth(previousMonth), 'MM')
    );

    if (isFirstWeekIncluded) {
      setCurrentMonth(previousMonth);
    }
  };

  const goToNextMonth = () => {
    setSelectedWeek(null);
    setWeek(null);
    const nextMonth = addMonths(currentMonth, 1);
    if (nextMonth <= endDate) {
      setCurrentMonth(nextMonth);
    }
  };

  const handleSelectWeek = (weekRange) => {
    setSelectedWeek(selectedWeek === weekRange ? null : weekRange);
  };

  useEffect(() => {
    setWeek(selectedWeek);
  }, [selectedWeek]);

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
              <Text style={{fontSize: 15, fontWeight: '700'}}>{t('weekDate.text3')}:</Text>
            </View>
            <View style={styles.weekRangeContainer}>
              <Text style={[styles.cardText, selectedWeek === week && styles.selectedCardText]}>
                {week}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {selectedWeek ?
        <View style={styles.selectedWeekContainer}>
          <Text style={styles.selectedWeekText}>{t('weekDate.text2')}: {selectedWeek}</Text>
        </View>
        :
        <View style={styles.selectedWeekContainer}>
          <Text style={styles.selectedWeekText}>{t('weekDate.text1')}</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer:{
    // height: '20%',
    width: '90%',
    // backgroundColor: 'green',
    // justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // paddingBottom: 80,
    // marginBottom: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#5AB1BB',
    width: '90%',
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
    fontWeight: '700',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
    color: '#FFFFFF',
  },
  weeksContainer: {
    width: '90%',
    // height: 250,
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardWeekContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 40,
    width: '100%',
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
    fontSize: 14,
  },
  selectedCardText: {
    fontWeight: "700",
  },
  selectedWeekContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 7,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'#E8E8E8',
    elevation: 1,
    // position: 'absolute',
    // bottom: 9,
  },
  selectedWeekText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#707070',
    textAlign: 'center',
  },
});

export default WeekDate;