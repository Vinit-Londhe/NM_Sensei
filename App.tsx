// App.tsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { Home } from './Screens/Home';
import Bisection from './Screens/Methods/1/Bisection';
import Uone from './Screens/Components/Uone';
import ResultScreen from './Screens/ResultScreen';
import NewtonRaphson from './Screens/Methods/1/NewtonRaphson';
import RegulaFalsi from './Screens/Methods/1/RegulaFalsi';
import RFResult from './Screens/Methods/1/RFResult';
import NRResult from './Screens/Methods/1/NRResult';
import ScanScreen from './Screens/Scanscreen';
import MainScreen from './Screens/Mainhome';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="mainH">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Uone" component={Uone} />
          <Stack.Screen name="Bisection" component={Bisection} options={{ headerShown: false }} />
          <Stack.Screen name="NR" component={NewtonRaphson} options={{ headerShown: false }} />
          <Stack.Screen name="NRR" component={NRResult} options={{ headerShown: false }} />
          <Stack.Screen name="scan" component={ScanScreen} options={{ headerShown: false }} />
          <Stack.Screen name="mainH" component={MainScreen} options={{ headerShown: false }} />

          <Stack.Screen name="RF" component={RegulaFalsi} options={{ headerShown: false }} />
          <Stack.Screen name="RFResult" component={RFResult} options={{ headerShown: false }} />
          <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
