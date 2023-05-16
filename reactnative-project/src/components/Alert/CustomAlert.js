import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../core/theme';

const CustomAlert = ({ title, message, onPress }) => (
    <View style={styles.view}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onPress} style={styles.okButton}>
            <Text style={styles.okText}>OK</Text>
        </TouchableOpacity>
    </View>
);
const styles = StyleSheet.create({
    view: { padding: 20 },
    alertTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.grey,
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 16,
        color: theme.colors.grey,
        marginVertical: 200
    },
    okButton: {
        marginTop: 20,
        backgroundColor: theme.colors.primary,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 5,
    },
    okText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',

    }
});
export default CustomAlert;
