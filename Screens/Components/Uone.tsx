// Uone.tsx
import React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Uone() {
  const navigation = useNavigation();

  const handleBisectionPress = () => {
    // Navigate to the Bisection screen
    navigation.navigate('Bisection' as never);

  };
  const handleNRPress = () => {
    // Navigate to the Bisection screen
    navigation.navigate('NR' as never);

  };
  const handleRFPress = () => {
    // Navigate to the Bisection screen
    navigation.navigate('RF' as never);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading_text}>1. Algebraic & Transcendental Equation</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.button} onPress={handleBisectionPress}>
          <Text style={styles.buttonText}>Bisection Method</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNRPress} >
          <Text style={styles.buttonText}>Newton Rahpson</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}onPress={handleRFPress}>
          <Text style={styles.buttonText}>Regula Falsi</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
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
  },
  button: {
    backgroundColor: '#121212',
    width: 110,
    height: 110,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
