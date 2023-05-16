import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import CustomAlert from './CustomAlert';

const CustomModal = ({ visible, title, message, onPress }) => (
    <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.container}>
            <View style={styles.alertContainer}>
                <CustomAlert title={title} message={message} onPress={onPress} />
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
});

export default CustomModal;
