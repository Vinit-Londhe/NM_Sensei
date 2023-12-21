// ScanFinal.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ScanFinal = ({ route }) => {
    const { responseData } = route.params;

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Result</Text>
                <Text style={styles.extractedText}>{responseData.result}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#282c34', // Dark background color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    extractedText: {
        fontSize: 18,
        marginBottom: 16,
        color: 'white',
    },
});

export default ScanFinal;
