import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GuassElimination() {
  const [func, onChangeFunctionText] = useState('');
  const [func1, onChangeFunctionText1] = useState('');
  const [func2, onChangeFunctionText2] = useState('');

  const navigation = useNavigation();

  const sanitizeInput = (input) => {
    // Split the input values and format the rows
    const values = input.split(',').map(value => value.trim());
    return values.join(', ');
  };

  const handleSubmit = async () => {
    try {
      // Sanitize input before sending
      const sanitizedFunc = sanitizeInput(func);
      const sanitizedFunc1 = sanitizeInput(func1);
      const sanitizedFunc2 = sanitizeInput(func2);

      console.log('Sending request...');
      const response = await fetch('http://192.168.29.233:5000/api/ge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "row1": sanitizedFunc,
          "row2": sanitizedFunc1,
          "row3": sanitizedFunc2
        }),
      });
      
      const result = await response.json();
      console.log('Result:', result);

      navigation.navigate('unit2result', { result });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}> Gauss Elimination Method</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText}
          placeholder="Enter Row 1"
          placeholderTextColor="white"
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText1}
          placeholder="Enter Row 2"
          placeholderTextColor="white"
        />
        
        <TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText2}
          placeholder="Enter Row 3"
          placeholderTextColor="white"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    
  
  },
  formContainer: {
    width: '80%',
    marginVertical:120
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
    alignSelf:'center',


    
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#2E4F4F',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#2E4F4F',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
