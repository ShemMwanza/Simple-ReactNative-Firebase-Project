import React, { useState } from 'react';
import { Image, TouchableOpacity, Modal, StyleSheet, View, Button, Alert, Platform, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../firebase/firebaseConfig';
import { useAuth } from '../../../Context/AuthContext';

const ProfilePhoto = ({ photoUrl, onSetProfilePhoto }) => {
    const { currentUser, updatePhoto } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handlePhotoPress = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus === 'granted' && galleryStatus === 'granted') {
            openModal();
        } else {
            Alert.alert(
                'Permissions Required',
                'Permissions to access the camera and photo library are required!',
                [
                    {
                        text: 'OK',
                        onPress: async () => {
                            const { status: updatedCameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
                            const { status: updatedGalleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                            if (updatedCameraStatus === 'granted' && updatedGalleryStatus === 'granted') {
                                openModal();
                            } else {
                                Alert.alert(
                                    'Permissions Denied',
                                    'Permissions to access the camera and photo library are still denied.',
                                    [
                                        {
                                            text: 'Open Settings',
                                            onPress: () => openAppSettings(),
                                        },
                                    ]
                                );
                            }
                        },
                    },
                ]
            );
        }
    };

    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS);
        }
    };

    const handleImageSelection = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
            const { assets } = result;
            const selectedImageUri = assets.length > 0 ? assets[0].uri : null;
            setSelectedImage(selectedImageUri);
        }
    };

    const handleCameraCapture = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access the camera is required!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            const { assets } = result;
            const selectedImageUri = assets.length > 0 ? assets[0].uri : null;
            setSelectedImage(selectedImageUri);
        }
    };

  const handleSetProfilePhoto = async () => {
    if (!selectedImage) return;

    try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        const fileName = selectedImage.split('/').pop();

        const storageRef = ref(storage, `ProfilePhotos/${currentUser.uid}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        updatePhoto(downloadURL);
        console.log(downloadURL);

        Alert.alert('Success', 'Image Updated Successfully');
    } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Something went wrong! Try again');
    } finally {
        closeModal();
    }
};




    return (
        <TouchableOpacity style={styles.container} onPress={handlePhotoPress}>
            <Image source={{ uri: photoUrl }} style={styles.photo} />
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Button title="Choose from Library" onPress={handleImageSelection} />
                    <Button title="Take Photo" onPress={handleCameraCapture} />
                    <Button title="Close" onPress={closeModal} />
                    {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}

                    {/* New button for setting profile photo */}
                    <Button title="Set as Profile Photo" onPress={handleSetProfilePhoto} />
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    photo: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 10,
    },
});

export default ProfilePhoto;
