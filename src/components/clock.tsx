import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getCanChiHour } from './calculate';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState<any>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      setCurrentTime({hours, minutes});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.footerItem}>
      <Text style={{...styles.itemText, fontSize: 25}}>GIỜ</Text>
      <Text style={{...styles.itemText, fontSize: 40, fontWeight: '600'}}>{`${currentTime.hours}:${currentTime.minutes}`}</Text>
      <Text style={styles.itemText}>{getCanChiHour(currentTime.hours)}</Text>
    </View>
  );
};

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

export default Clock;
