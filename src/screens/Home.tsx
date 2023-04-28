import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { convertSolar2Lunar, getCanChiMonth, getCanDay, getCanHour, getYearCanChi, jdn } from '../components/calculate';
import Clock from '../components/clock';
import { clear } from '../components/slices/dateSlice';
import { convertToDayOfWeek } from '../lib/date';

function HomeScreen() {
  const dateState = useSelector((state: any) => state.date)
  const dispatch = useDispatch();
  const lunars = convertSolar2Lunar(dateState.day, dateState.month, dateState.year, 7);
  const jdnNew = jdn(lunars[0], lunars[1], lunars[2]);

  return (
    <ImageBackground source={require('./background.png')} style={styles.background}>
      <View style={styles.header}>
        <View style={styles.leftItem} />
        <View style={styles.centerItem} >
          <Text style={styles.itemText} >{`Tháng ${dateState.month} - ${dateState.year}`}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={{...styles.itemText, fontSize: 14}} onPress={() => dispatch(clear())}>Hôm nay</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.bodyTopItem}>
          <View>
            <Text style={{...styles.text, fontSize: 200, fontWeight: '900'}}>{dateState.day}</Text>
            <Text style={{...styles.text, fontSize: 30, textAlign: 'center', textTransform: 'uppercase'}}>{convertToDayOfWeek(dateState.dateString)}</Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Clock />
          <View style={{...styles.footerItem,}}>
            <Text style={{...styles.itemText, fontSize: 25}}>NGÀY</Text>
            <Text style={{...styles.itemText, fontSize: 50, fontWeight: '600'}}>{lunars[0]}</Text>
            <Text style={styles.itemText}>{getCanDay(jdnNew)}</Text>
          </View>
          <View style={{...styles.footerItem, borderRightWidth: 0}}>
            <Text style={{...styles.itemText, fontSize: 25}}>THÁNG</Text>
            <Text style={{...styles.itemText, fontSize: 30, fontWeight: '600'}}>{lunars[1]}</Text>
            <Text style={styles.itemText}>{getCanChiMonth(lunars[1], lunars[2])}</Text>
            <Text style={styles.itemText}>{`Năm ${getYearCanChi(lunars[2])}`}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 50
  },
  leftItem: {
    flex: 1,
  },
  centerItem: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    color: '#00528b',
    fontSize: 20,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  bodyTopItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 200,
  },
  footerItem: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRightWidth: 1,
    borderRightColor: 'white',
    paddingVertical: 20
  },
  text: {
    color: '#00528b',
    fontSize: 50,
    fontWeight: "600"
  },
});

export default HomeScreen;
