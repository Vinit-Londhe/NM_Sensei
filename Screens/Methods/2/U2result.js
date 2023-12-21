// U2Result.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const U2Result = ({ route }) => {
  const { result } = route.params;

  // Extract solution and steps from the result object
  const { solution, steps } = result;

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Result:</Text>

      {/* Display the solution */}
      <Text style={styles.SolText}>Solution:</Text>
      <Text style={styles.SolValue}>{solution}</Text>

      {/* Display the steps if it's an array */}
      {Array.isArray(steps) && steps.length > 0 && (
        <>
          <Text style={styles.StepsText}>Steps:</Text>
          {steps.map((step, index) => (
            <Text key={index} style={styles.StepValue}>
              {step}
            </Text>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  SolText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  SolValue: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
  },
  StepsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  StepValue: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
});

export default U2Result;
