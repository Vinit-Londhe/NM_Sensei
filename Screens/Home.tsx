import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import Uone from './Components/Uone'
import Utwo from './Components/Utwo'
import Uthree from './Components/Uthree'
import Ufour from './Components/Ufour'
import Ufive from './Components/Ufive'

export const Home = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#131314', flex: 1 }}>
      <ScrollView>
        <Uone/>
        <Utwo/>
        <Uthree/>
        <Ufour/>
        <Ufive/>
       </ScrollView>
    </SafeAreaView>
  )
}
