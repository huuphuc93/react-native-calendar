/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/Home";
import MonthScreen from './screens/Month';
import AgendaScreen from './screens/Agenda';
import CreateAgendaScreen from './screens/createAgendaScreen';
import store from './store/index';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const CreateAgendaStack = createStackNavigator();

const CreateAgendaStackScreen = () => {
  return (
    <CreateAgendaStack.Navigator>
      <CreateAgendaStack.Screen name="Sự kiện" component={AgendaScreen} />
      <CreateAgendaStack.Screen name="Tạo sự kiện" component={CreateAgendaScreen} />
    </CreateAgendaStack.Navigator>
  );
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Hôm nay" component={HomeScreen} />
            <Tab.Screen name="Lịch tháng" component={MonthScreen} />
            <Tab.Screen name="Settings" options={{ tabBarLabel: 'Sự kiện' }} component={CreateAgendaStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
