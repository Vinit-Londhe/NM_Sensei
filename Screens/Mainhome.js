// MainScreen.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Image
                    source={require('./icon/home.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('scan')}
            >
                <Image
                    source={require('./icon/scan.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#131314'
    },
    button: {
        width: 200,
        height: 200,
        backgroundColor: '#52A999',
     // Change the background color as needed
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
    },
    icon: {
        width: 150,
        height: 150,
        resizeMode: 'contain', // Adjust the resizeMode as needed
    },
});

export default MainScreen;
