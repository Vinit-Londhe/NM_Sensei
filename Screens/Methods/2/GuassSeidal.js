import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

export default function GuassSeidal() {
  const [func, onChangeFunctionText] = useState('');
  const [func1, onChangeFunctionText1] = useState('');
  const [func2, onChangeFunctionText2] = useState('');

  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  const handleSubmit = async () => {
    try {
      const response = await fetch('https://nmsensei.pythonanywhere.com/api/bisection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          func,
          a: parseFloat(a),
          b: parseFloat(b),
          tolerance: parseFloat(tolerableError),
          maxIterations: parseInt(maxIterations),
        }),
      });

      const result = await response.json();
      console.log('Result',result)
      navigation.navigate('Result',{result});
      // here I want to go to the next screen with result
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}> GuassSeidal Method</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText}
          placeholder="Enter Function 1"
          placeholderTextColor="white"
        />

<TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText1}
          placeholder="Enter Function 2"
          placeholderTextColor="white"
        />
        
        <TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText2}
          placeholder="Enter Function 3"
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
