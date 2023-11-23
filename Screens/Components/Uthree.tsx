import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'

export default function Uthree() {
  return (
    <View style={styles.container}>
    <Text style={styles.heading_text}>3. Finite Differences</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Newton's Forward Interpolation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Newton's Backward Interpolation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Newton's Central Interpolation</Text>
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
        backgroundColor: '#2E4F4F',
        width: 110, // Customize the size of the button
        height: 110, // Make the button square
        marginHorizontal: 8, // Add some space between buttons
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
     
      },
      buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
      },
})