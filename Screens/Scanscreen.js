import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, SafeAreaView, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ScanScreen = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const navigateToScanResult = (text) => {
    navigation.navigate('scanR', { extractedText: text });
  };

  const performOCR = (file) => {
    let myHeaders = new Headers();
    myHeaders.append('apikey', 'FEmvQr5uj99ZUvk3essuYb6P5lLLBS20');
    myHeaders.append('Content-Type', 'multipart/form-data');

    let raw = file;
    let requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: raw,
    };

    fetch('https://api.apilayer.com/image_to_text/upload', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setExtractedText(result['all_text']);
        
        // sendTextToBackend(result['all_text']);
        navigateToScanResult(result['all_text']);
      })
      .catch((error) => console.log('error', error));
  };



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Pick a choice</Text>

      <TouchableOpacity style={styles.button} onPress={pickImageCamera}>
        <Image source={require('./icon/camera.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickImageGallery}>
        <Image source={require('./icon/gallery.png')} style={styles.icon} />
      </TouchableOpacity>
      {apiResponse && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>API Response:</Text>
          <Text style={styles.resultText}>{JSON.stringify(apiResponse)}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#131314',
    height: '100%',
  },
  button: {
    width: 200,
    height: 200,
    backgroundColor: '#52A999',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
    borderColor: 'grey',
    borderWidth: 2,
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ScanScreen;
