import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

export default function Elue() {
  const [func, onChangeFunctionText] = useState('');
  const [a, onChangeA] = useState('');
  const [b, onChangeB] = useState('');
  const [tolerableError, onChangeTolerableError] = useState('');
  const [maxIterations, onChangeMaxIterations] = useState('');

  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  const handleSubmit = async () => {
    try {
      const response = await fetch('https://nmsensei.pythonanywhere.com/api Eluers', {
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
        <Text style={styles.heading}> Eluers Method</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText}
          placeholder="Function"
          placeholderTextColor={'#9BABB8'}
          value={functionText}
        />
        <TextInput
          style={styles.a}
          onChangeText={onChangeA}
          value={a}
          placeholder="X0"
          placeholderTextColor={'#9BABB8'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.b}
          onChangeText={onChangeB}
          value={b}
          placeholder="Y0"
          placeholderTextColor={'#9BABB8'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.TE}
          onChangeText={onChangeTolerableError}
          value={tolerableError}
          placeholder="Xn"
          placeholderTextColor={'#9BABB8'}
          keyboardType="numeric"
        />
         <TextInput
          style={styles.TE}
          onChangeText={onChangeTolerableError}
          value={tolerableError}
          placeholder="No. of steps"
          placeholderTextColor={'#9BABB8'}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    input: {
        height: 60,
        color: 'white',
        margin: 12,
        fontSize: 20,
        borderWidth: 4,
        width: 300,
        padding: 10,
        backgroundColor: 'black',
        borderColor: '#2E4F4F',
        borderRadius: 10,
      },
      a: {
        height: 60,
        color: 'white',
        margin: 12,
        fontSize: 20,
        borderWidth: 4,
        width: 300,
        padding: 10,
        backgroundColor: 'black',
        borderColor: '#2E4F4F',
        borderRadius: 10,
      },
      b: {
        height: 60,
        color: 'white',
        margin: 12,
        fontSize: 20,
        borderWidth: 4,
        width: 300,
        padding: 10,
        backgroundColor: 'black',
        borderColor: '#2E4F4F',
        borderRadius: 10,
      },
      TE: {
        height: 60,
        color: 'white',
        margin: 12,
        width: 300,
        fontSize: 20,
        borderWidth: 4,
        padding: 10,
        backgroundColor: 'black',
        borderColor: '#2E4F4F',
        borderRadius: 10,
      },
      container: {
        flex: 1,
        marginLeft: 40,
        margin: 60,
      },
      button: {
            flex: 1,
            height: 50,
            color: '#2E4F4F',
            margin: 12,
            width: 300,
            padding: 10,
            backgroundColor: '#2E4F4F',
            borderRadius: 10,
            marginTop: 40,
            
      },
      buttontext: {
          fontSize: 25,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'black',
      }
    
});