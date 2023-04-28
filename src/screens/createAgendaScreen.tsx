import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Keyboard } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getData, storeData } from '../lib/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertDateToSring } from '../lib/date';

const CreateAgendaScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [description, setDescription] = useState('');
  const [calendarType, setCalendarType] = useState('sun');
  const [repeatType, setRepeatType] = useState('noRepeat');
  const [agenda, setAgenda] = useState({});
  const [agendas, setAgendas] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateString, setDateString] = useState(new Date());

  const { id }: any = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isFocused) {
        return;
      }
      Keyboard.dismiss();
      navigation.dispatch(e.data.action);
    });

    return unsubscribe;
  }, [navigation, isFocused]);

  useEffect(() => {
    const fetchData = async () => {
      const agendas = await getData('agendas');
      const agenda = agendas.find((i: any) => i.id == id);

      setAgendas(agendas)
      if(agenda) {
        setAgenda(agenda);
        setDescription(agenda.description);
        setCalendarType(agenda.calendarType);
        setRepeatType(agenda.repeatType);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setAgenda({
      description,
      calendarType,
      repeatType
    })
  }, [description, calendarType, repeatType]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    const date = new Date();

    storeData('agendas', [
      ...agendas,
      {
        id: id || date.getTime(),
        dateString: convertDateToSring(dateString),
        ...agenda
      }
    ])

    navigation.reset({
      index: 0,
      // @ts-ignore
      routes: [{ name: 'Sự kiện' }],
    });
  };

  const handleConfirm = (_event: any, selectedDate: any) => {
    setDateString(selectedDate);
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={dateString}
        mode="date"
        display="spinner"
        locale="vi-VN"
        onChange={handleConfirm}
        positiveButton={{label: 'Chọn'}}
        negativeButton={{label: 'Hủy'}}
      />
    );
  };

  return <KeyboardAwareScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Ngày tháng: <Text style={{...styles.label, marginTop: 2, color: '#007aff'}}>{convertDateToSring(dateString)}</Text></Text>
      <TouchableOpacity style={{...styles.button, marginTop: 2, padding: 5, marginBottom: 0}} onPress={() => setDatePickerVisibility(true)}>
        <Text style={{...styles.buttonText, fontSize: 15}}>Chọn ngày tháng</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Chọn loại:</Text>
      <RadioButton.Group onValueChange={(value) => setCalendarType(value)} value={calendarType}>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 10 }}>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="sun" color="#007aff" />
            <Text style={styles.radioButtonLabel}>Ngày dương</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="lunar" color="#007aff" />
            <Text style={styles.radioButtonLabel}>Ngày âm</Text>
          </View>
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Chọn loại:</Text>
      <RadioButton.Group onValueChange={(value) => setRepeatType(value)} value={repeatType}>
        <View style={{ marginTop: 10 }}>
          <View style={styles.radioRepeatTypeButtonContainer}>
            <RadioButton value="noRepeat" color="#007aff" />
            <Text style={styles.radioButtonLabel}>Không lặp</Text>
          </View>
          <View style={styles.radioRepeatTypeButtonContainer}>
            <RadioButton value="everyWeek" color="#007aff" />
            <Text style={styles.radioButtonLabel}>Mọi thứ trong tuần</Text>
          </View>
          <View style={styles.radioRepeatTypeButtonContainer}>
            <RadioButton value="everyMonth" color="#007aff" />
            <Text style={styles.radioButtonLabel}>Mọi ngày trong tháng</Text>
          </View>
          <View style={styles.radioRepeatTypeButtonContainer}>
            <RadioButton value="everyYear" color="#007aff" />
            <Text style={styles.radioButtonLabel}>Mọi ngày trong năm</Text>
          </View>
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Sự kiện:</Text>
      <TextInput
        style={[styles.input, styles.eventInput]}
        multiline
        placeholder="Nhập sự kiện"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tạo sự kiện</Text>
      </TouchableOpacity>
    </View>
    {isDatePickerVisible && showDatePicker()}
  </KeyboardAwareScrollView>
};

export default CreateAgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginTop: 10,
  },
  eventInput: {
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  radioButtonLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
    fontFamily: 'Arial',
  },
  radioRepeatTypeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
});
