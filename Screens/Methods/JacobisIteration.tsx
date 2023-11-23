import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function JacobisIteration() {
    const [functionText, onChangeFunctionText] = React.useState('');
  const [a, onChangeA] = React.useState('');
  const [b, onChangeB] = React.useState('');
  const [tolerableError, onChangeTolerableError] = React.useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFunctionText}
          placeholder="Equation-1"
          placeholderTextColor={'#9BABB8'}
          value={functionText}
        />
        <TextInput
          style={styles.a}
          onChangeText={onChangeA}
          value={a}
          placeholder="Equation-2"
          placeholderTextColor={'#9BABB8'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.b}
          onChangeText={onChangeB}
          value={b}
          placeholder="Equation-3"
          placeholderTextColor={'#9BABB8'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.TE}
          onChangeText={onChangeTolerableError}
          value={tolerableError}
          placeholder="Tolerable Error"
          placeholderTextColor={'#9BABB8'}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>Submit</Text>
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