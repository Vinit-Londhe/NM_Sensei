import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, Image, SafeAreaView, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ScanScreen = () => {
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
        sendTextToBackend(result['all_text']);

      })
      .catch((error) => console.log('error', error));
  };

  const sendTextToBackend = (text) => {
    // Replace the URL with your Flask API endpoint
    console.log(text)
    fetch('http://192.168.29.50:5000/process_ocr_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'text': text }),
    })
      .then((response) => response.json())
      .then((result) => {
        setApiResponse(result);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Pick a choice</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={pickImageCamera}
      >
        <Text style={styles.buttonText}>Scan from Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={pickImageGallery}
      >
        <Text style={styles.buttonText}>Pick from gallery</Text>
      </TouchableOpacity>
      {/* <Button title="Pick an image from gallery" onPress={pickImageGallery} />
      <Button title="Pick an image from camera" onPress={pickImageCamera} /> */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 400,
            height: 300,
            objectFit: 'contain',
          }}
        />
      )}

      <Text style={styles.text1}>Extracted text:</Text>
      <Text style={styles.text1}>{extractedText}</Text>

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
    backgroundColor: 'black',
    height: '100%',
  },
  button: {

    backgroundColor: '#2E4F4F',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E4F4F',
    textAlign: 'center',
  },
  heading2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  text1: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    color: 'black',
  },
});

export default ScanScreen;
