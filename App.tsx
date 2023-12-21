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
//import EluersMethod from './Screens/Methods/EluersMethod';
import Elue from './Screens/Methods/Eluers';
import GuassElimination from './Screens/Methods/2/GuassElimination';
import GuassJorden from './Screens/Methods/2/GuassJorden';
import ScanResult from './Screens/scanResult';
//import JacobisIteration from './Screens/Methods/JacobisIteration';
import GuassSeidal from './Screens/Methods/2/GuassSeidal';
import JocobisIteration from './Screens/Methods/2/JocobisIteraction';
import Relaxiation from './Screens/Methods/2/Relaxiation';
import U2Result from './Screens/Methods/2/U2result';
import ScanFinal from './Screens/scanFinal';


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
          <Stack.Screen name="scanR" component={ScanResult} options={{ headerShown: false }} />

          <Stack.Screen name="mainH" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RF" component={RegulaFalsi} options={{ headerShown: false }} />
          <Stack.Screen name="RFResult" component={RFResult} options={{ headerShown: false }} />
          <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Eluers" component={Elue} options={{ headerShown: false }} />
          <Stack.Screen name="GE" component={GuassElimination} options={{ headerShown: false }} />
          <Stack.Screen name="GJ" component={GuassJorden} options={{ headerShown: false }} />
          <Stack.Screen name="JocobisIteration" component={JocobisIteration} options={{ headerShown: false }} />
          <Stack.Screen name="GuassSeidal" component={GuassSeidal} options={{ headerShown: false }} />
          <Stack.Screen name="Relaxiation" component={Relaxiation} options={{ headerShown: false }} />
          <Stack.Screen name="unit2result" component={U2Result} options={{ headerShown: false }} />
          <Stack.Screen name="ScanF" component={ScanFinal} options={{ headerShown: false }} />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
