import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const RFResult = ({ route }) => {
  const { result } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.resultText}>ResultRF</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  resultText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
 
});

export default RFResult;
