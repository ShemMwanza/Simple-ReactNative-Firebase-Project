import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button/Button';
import { useAuth } from '../../Context/AuthContext';
import ProductList from '../components/Products/ProductList';
import ProductTypes from '../components/Products/ProductTypes';
import CartList from '../components/Cart/CartList';
import { theme } from '../core/theme';
function CategoriesScreen({ navigation }) {
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            navigation.navigate('LoginScreen');
        }
    }, [currentUser, navigation]);
    return (
        <Background>
            <View style={styles.container}>
                <ProductTypes />
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 2,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: theme.colors.white, // Grey background color

    },
});

export default CategoriesScreen;
