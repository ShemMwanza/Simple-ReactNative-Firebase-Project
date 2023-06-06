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
function ExploreScreen({ navigation }) {
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            navigation.navigate('LoginScreen');
        }
    }, [currentUser, navigation]);
    return (
        <Background>
            <View style={styles.container}>
                <Header>Explore</Header>
                <ProductList />
                {/* <ProductTypes /> */}

                {/* <CartList /> */}

                {/* <Logo />
     
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={logout}
      ></Button> */}
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        
    },
});

export default ExploreScreen;
