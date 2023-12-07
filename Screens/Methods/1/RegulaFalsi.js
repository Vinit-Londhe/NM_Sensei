import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

export default function RegulaFalsi() {
  const [func, onChangeFunctionText] = useState('');
  const [a, onChangeA] = useState('');
  const [b, onChangeB] = useState('');
  const [tolerableError, onChangeTolerableError] = useState('');
  const [maxIterations, onChangeMaxIterations] = useState('');

  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://172.20.10.5:5000/api/false_position', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          func: func,
          a: parseFloat(a),
          b: parseFloat(b),
          tolerance: parseFloat(tolerableError),
          maxIterations: parseInt(maxIterations),
        }),
      });

      const result = await response.json();
      console.log('RFResult', result)
      navigation.navigate('RFResult', { result });
      // here I want to go to the next screen with result

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Regula Falsi Method</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText}
          placeholder="Enter Function"
          placeholderTextColor="white"
          fontWeight= "100"
          
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeA}
          placeholder="Enter a"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={a}
          fontWeight= "100"

        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeB}
          placeholder="Enter b"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={b}
          fontWeight= "100"

        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeTolerableError}
          placeholder="Enter Tolerable Error"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={tolerableError}
          fontWeight= "100"

        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeMaxIterations}
          placeholder="Enter Max Iterations"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={maxIterations}
          fontWeight= "100"

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
    marginVertical: 65,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'semi-bold',
    marginBottom: 40,
    color: 'white',
    alignSelf: 'center',



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
    fontWeight: 'semi-bold',
  },
});
