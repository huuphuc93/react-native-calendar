import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Calendar } from 'react-native-calendars';
import { convertSolar2Lunar } from '../components/calculate';
import { LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../components/slices/dateSlice';
import { fetchHolidays } from '../components/slices/holidaySlice';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th.1',
    'Th.2',
    'Th.3',
    'Th.4',
    'Th.5',
    'Th.6',
    'Th.7',
    'Th.8',
    'Th.9',
    'Th.10',
    'Th.11',
    'Th.12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
};

LocaleConfig.defaultLocale = 'vi';

function MonthScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const dispatch = useDispatch();
  const dateState = useSelector((state: any) => state.date);
  const holidays = useSelector((state: any) => state.holidays.data)

  const handleDayPress = (date: any) => {
    dispatch(setDate(date));
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchHolidays());
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{paddingVertical: 10, backgroundColor: 'white'}}>
        <Calendar
          markingType={'period'}
          // onMonthChange={month => {
          //   console.log('month changed', month);
          // }}
          firstDay={1}
          disableMonthChange={true}
          scrollEnabled={true}
          dayComponent={({date, state}: any) => {
            const lunars = convertSolar2Lunar(date.day, date.month, date.year, 7);
            const lunarDay = lunars[0] == 1 ? `${lunars[0]}/${lunars[1]}` : lunars[0];
            const backgroundColor = dateState.dateString == date.dateString ? '#E5F7E7' : state === 'today'  ? '#F2F2F2' : 'white';

            return (
              <TouchableOpacity onPress={() => handleDayPress(date)}>
                <View style={{...styles.container, backgroundColor }} key={state}>
                  <Text style={{textAlign: 'center', fontWeight: "600", color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text>
                  <Text style={{textAlign: 'center', fontSize: 10, color: state === 'disabled' ? 'gray' : 'black'}}>{lunarDay}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          theme={{
            backgroundColor: '#ffffff'
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10000,
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MonthScreen;
