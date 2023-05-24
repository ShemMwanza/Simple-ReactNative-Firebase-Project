import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../../../Context/AuthContext';
import { theme } from '../../core/theme';
import CartListItem from './CartListItem';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

const CartList = () => {
    const { currentUser, cartItems, setCartItems } = useAuth();

    useEffect(() => {
        setCartItems(cartItems);
    }, [currentUser, cartItems]);



    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <CartListItem item={item}/>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.productID}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 1,
        borderTopWidth: 1,
        borderTopColor: 'black',
        width: '100%',
        paddingHorizontal: 15,
    },
});

export default CartList;
