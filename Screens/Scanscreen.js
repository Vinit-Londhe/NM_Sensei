import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';


const ScanScreen = () => {
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();

            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            setCapturedImage(uri);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setCapturedImage(result.uri);
        }
    };

    const uploadImage = async () => {
        if (!capturedImage) return;

        const formData = new FormData();
        formData.append('image', {
            uri: capturedImage,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        try {
            const response = await fetch('YOUR_FLASK_API_ENDPOINT', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Add any additional headers as needed
                },
            });

            // Handle the response from your backend API
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={type}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                    >
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={pickImage}
                    >
                        <Text style={styles.text}>Pick Image</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            {capturedImage && (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: capturedImage }} style={styles.previewImage} />
                    <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
                        <Text style={styles.text}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    uploadButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
    },
});

export default ScanScreen;


