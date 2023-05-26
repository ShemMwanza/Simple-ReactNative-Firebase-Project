import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useAuth } from '../../Context/AuthContext';
import CartList from '../components/Cart/CartList';
import CartBottom from '../components/Cart/CartBottom';
import Loading from './LoadingScreen';
import CustomModal from '../components/Alert/CustomModal';

export default function CartScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { currentUser, cartItems, setCartItems, getCartItems } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showCartMessage, setCartMessage] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const newdata = await getCartItems(currentUser.uid);
      setCartItems(newdata);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const toCheckout = async () => {
    if (cartItems.length > 0) {
      navigation.navigate('CheckoutScreen');
    } else {
      setCartMessage(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (showCartMessage) {
    return (
      <CustomModal
        title="Empty Cart"
        message="Your cart is empty"
        onPress={() => setCartMessage(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CartList fetchData={fetchData} />
      <View style={styles.cartBottomContainer}>
        <CartBottom toCheckout={toCheckout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // paddingHorizontal: 10,
  },
  cartBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
