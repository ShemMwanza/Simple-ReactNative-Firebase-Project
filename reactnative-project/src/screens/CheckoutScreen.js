import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Background from '../components/Background';
import { useAuth } from '../../Context/AuthContext';
import CheckoutUserInfo from '../components/Checkout/CheckoutUserInfo';
import CheckoutSummary from '../components/Checkout/CheckoutSummary';
import Loading from './LoadingScreen';
import { theme } from '../core/theme';
import { ScrollView } from 'react-native';

export default function CheckoutScreen({ navigation }) {
    const { currentUser, cartItems } = useAuth();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!currentUser) {
            navigation.navigate('LoginScreen');
        }
    }, [currentUser]);

    useEffect(() => {
        let newTotal = 0;
        for (const item of cartItems) {
            newTotal += item.price * item.quantity;
        }
        setTotal(newTotal);
    }, [cartItems]);



    if (loading) {
        return <Loading />;
    }

    return (
        <Background>
            <ScrollView>
                <View style={styles.container}>
                    <CheckoutSummary items={cartItems} total={total} />
                    <CheckoutUserInfo total={total} />
                </View>
            </ScrollView>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: theme.colors.grey,
    },
});
