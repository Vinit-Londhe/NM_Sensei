import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import JocobisIteration from '../Methods/2/JocobisIteraction';
import GuassSeidal from '../Methods/2/GuassSeidal';


export default function Utwo() {

  const navigation = useNavigation();

  const handleGEPress = () => {
    // Navigate to the GE screen
    navigation.navigate('GE' as never);

  };
  const handleGJ = () => {
    navigation.navigate('GJ' as never);

  };
  
  const handleJocobisIteration = () => {
    navigation.navigate('JocobisIteration' as never);

  };

  const handleGuassSeidal = () => {
    navigation.navigate('GuassSeidal' as never);

  };

  const handleRelaxiation = () => {
    navigation.navigate('Relaxiation' as never);

  };
  
  

  return (
    <View style={styles.container}>
    <Text style={styles.heading_text}>2. Linear Simultenous Equation</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.button} onPress={handleGEPress}>
        <Text style={styles.buttonText}>Gauss Elimination</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGJ}>
        <Text style={styles.buttonText}>Gauss Jordan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleJocobisIteration}>
        <Text style={styles.buttonText}>Jacobi’s Iteration</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={handleGuassSeidal}>
        <Text style={styles.buttonText}>Gauss Seidal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={handleRelaxiation}>
        <Text style={styles.buttonText}>Relaxiation</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 20,
        alignItems: 'center',

      },
      heading_text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 14,
        paddingVertical: 12,
       
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
        paddingvertical: 50
        
      },
      button: {
        backgroundColor: '#52A999',
        width: 110, // Customize the size of the button
        height: 110, // Make the button square
        marginHorizontal: 8, // Add some space between buttons
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
     
      },
      buttonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
      },
})

