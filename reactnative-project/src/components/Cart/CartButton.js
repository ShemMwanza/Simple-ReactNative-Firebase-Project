import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../core/theme'

const CartButton = ({AddToCart}) => {
    return (
        <TouchableOpacity onPress={AddToCart}>
            <Ionicons name="cart-outline"
            size={30}
            color= {theme.colors.primary} />
        </TouchableOpacity>
    );
};

export default CartButton;
