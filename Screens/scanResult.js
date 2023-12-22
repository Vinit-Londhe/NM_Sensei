import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ScanResult = ({ route }) => {
    const { extractedText } = route.params;
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const navigation = useNavigation();
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.29.233:5000/api/process_text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    extractedText,
                    inputValue: parseInt(inputValue),
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('result',{responseData})
                setResult(`API Response: ${responseData}`);
                navigation.navigate('ScanF', {responseData});


            } else {
                console.error('Error calling API:', response.status);
                setResult('Error calling API');
            }
        } catch (error) {
            console.error('Error calling API:', error);
            setResult('Error calling API');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{extractedText}</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Tollerable Error"
                color='white'
                placeholderTextColor={'white'}
                onChangeText={(text) => setInputValue(text)}
                value={inputValue}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            {result && <Text style={styles.result}>{result}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'black'
    },
    text: {
        fontSize: 18,
        marginBottom: 16,
        color: 'white'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '100%',
        color: 'white'
    },
    result: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    }
});

export default ScanResult;
