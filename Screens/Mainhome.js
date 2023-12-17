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
                    source={require('./icon/scanicon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('scan')}
            >
                <Image
                    source={require('./icon/scanicon.png')}
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
        backgroundColor: 'black'
    },
    button: {
        width: 200,
        height: 200,
        backgroundColor: '#2E4F4F', // Change the background color as needed
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
    },
    icon: {
        width: 100,
        height: 100,
        resizeMode: 'contain', // Adjust the resizeMode as needed
    },
});

export default MainScreen;
