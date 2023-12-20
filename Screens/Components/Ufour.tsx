import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'

export default function Ufour() {
  return (
    <View style={styles.container}>
        <Text style={styles.heading_text}>4. Numerical Integration</Text> 
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Trapezoidal Rule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Simpson's 1/3 Rule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Simpson's 3/8 Rule</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 20,
        alignItems: "flex-start",
      },
      heading_text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 14,
        paddingVertical: 12,
        alignSelf:'center'
       
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