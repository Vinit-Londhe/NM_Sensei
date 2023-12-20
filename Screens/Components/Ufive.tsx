import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'

export default function Ufive() {
  return (
    <View style={styles.container}>
    <Text style={styles.heading_text}>5. Ordinary Differential Equation</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Picard's Method</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Taylor Series</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Euler's Method</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modified Euler's Method</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Runge Kutta Method</Text>
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