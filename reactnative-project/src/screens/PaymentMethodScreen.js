import { View, Text } from 'react-native'
import React from 'react'
import Background from '../components/Background'
import { StyleSheet } from 'react-native'
import PaymentOptionItem from '../components/Payment/PaymentOptionItem'

export default function PaymentMethodScreen() {
    return (
        <Background>
            <View style={styles.container}>
                <PaymentOptionItem />
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});