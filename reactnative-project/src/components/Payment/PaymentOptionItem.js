import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import MpesaOption from './MpesaOption';
import CashOption from './CashOption';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../Alert/CustomModal';
import Header from '../Header';
import { theme } from '../../core/theme';
import { useAuth } from '../../../Context/AuthContext';

export default function PaymentOptionItem() {
    const navigation = useNavigation();
    const [cashMessage, setCashMessage] = useState(false);
    const [payCashMessage, setPayCashMessage] = useState(false);
    const { userCheckoutInfo,placeOrder } = useAuth();
    const { email, name, phoneNumber, total } = userCheckoutInfo;

    const goToMpesa = () => {
        navigation.navigate('MpesaPaymentScreen');
    };
    const goToCash = () => {
        setCashMessage(true);
    };

    if (cashMessage) {
        return (
            <CustomModal
                title="Reminder"
                message="By Clicking OK, you'll be placing an order"
                onPress={() => {
                    setPayCashMessage(true);

                    placeOrder(cartItems, email, name, phoneNumber, total)
                        .then(() => {
                            console.log('Success!!');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    setCashMessage(false);
                }}
                onCancel={() => {
                    setCashMessage(false);
                }}
            />
        );
    }

    if (payCashMessage) {
        return (
            <CustomModal
                title="Success"
                message="Thank you for your order, cash payment will be mandatory once the order is delivered"
                onPress={() => {
                    setPayCashMessage(false);
                    navigation.navigate('Dashboard');
                }}
            />
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Choose Payment Option</Text>
            <View style={styles.options}>
                <MpesaOption goToMpesa={goToMpesa} style={styles.option} />
                <CashOption goToCash={goToCash} style={styles.option} />
            </View>
        </ScrollView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width * 0.9,
    },
    options: {
        marginTop: 20,
    },
    option: {
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        color: theme.colors.secondary,
        fontWeight: 'bold',
        paddingVertical: 12,
        textAlign: 'center',
        marginTop: '5%'
    },
});
