import React, { useState } from 'react';
import { View } from 'react-native';
import Button from '../Button/Button';
import CustomModal from '../Alert/CustomModal';

export default function CartBottom({toCheckout}) {
    const [showCartMessage, setCartMessage] = useState(false);

    return (
        <View>
            <Button mode="contained" onPress={() => toCheckout()}>
                Checkout
            </Button>
            <CustomModal
                visible={showCartMessage}
                title="Empty Cart"
                message="Your cart is empty"
                onPress={() => setCartMessage(false)}
            />
        </View>
    );
};
