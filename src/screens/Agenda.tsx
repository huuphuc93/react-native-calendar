import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../lib/storage';

function AgendaScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation: any = useNavigation();
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    const fetchAgendas = async () => {
      const storedAgendas = await getData('agendas');
      setAgendas(storedAgendas || []);
    };

    fetchAgendas();
  }, []);

  const repeatTypes: any = {
    noRepeat: 'Không lặp',
    everyWeek: 'Mọi thứ trong tuần',
    everyMonth: 'Mọi ngày trong tháng',
    everyYear: 'Mọi ngày trong năm'
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
          {agendas.map((agenda: any) => (
            <View key={agenda.id} style={{marginBottom: 10, borderRadius: 8, padding: 10, backgroundColor: '#6AA543'}}>
              <Text style={{...styles.itemText, fontSize: 30}}>{agenda.dateString}</Text>
              <Text style={styles.itemText}>{agenda.description}</Text>
              <Text style={styles.itemText}>{repeatTypes[agenda.repeatType]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tạo sự kiện', { dateString: selectedDate.toISOString().slice(0, 10) })}>
        <Text style={styles.buttonText}>Tạo sự kiện</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemText: {
    color: 'white',
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemTime: {
    fontSize: 14,
    color: 'gray',
  },
});

export default AgendaScreen;
