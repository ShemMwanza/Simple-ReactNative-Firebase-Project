import { View, Text, Pressable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useAuth } from '../../../Context/AuthContext';
import CartButton from '../Cart/CartButton';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../core/theme';

export default function ProductListItem({ item, handleItemPress }) {
  const { currentUser, addToCart, getCartItems } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  const addToCartHandler = () => {
    addToCart(item.id, item.img_url, item.name, item.price)
      .then(() => {
        console.log('success');
        setIsInCart(true);
      })
      .catch((error) => {
        console.log(error.code);
        alert(error);
      });
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const newdata = await getCartItems(currentUser.uid);
        setCartItems(newdata);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchCartItems();
  }, [currentUser.uid]);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      setIsInCart(cartItems.some((cartItem) => cartItem.productID === item.id));
    }
  }, [cartItems, item.id]);

  return (
    <View style={styles.card}>
      <Pressable onPress={() => handleItemPress(item.id)}>
        {({ pressed }) => (
          <React.Fragment>
            <Image
              style={[styles.thumb, pressed && styles.thumbPressed]}
              source={{ uri: item.img_url }}
            />
            <View style={styles.itemContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>KES {item.price}</Text>
              </View>
              <View style={styles.cartButtonWrapper}>
                {isInCart ? (
                  <Ionicons name="md-checkmark-circle" size={24} color={theme.colors.primary} />
                ) : (
                  <CartButton AddToCart={addToCartHandler} />
                )}
              </View>
            </View>
          </React.Fragment>
        )}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
        width: '100%',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    thumb: {
        aspectRatio: 1.5,
        maxHeight: 260,
        maxWidth: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        resizeMode: 'contain', // add this line to adjust the image size
    },
    thumbPressed: {
        opacity: 0.8, // Update the opacity when pressed
    },
    infoContainer: {
        padding: 16,
        flex: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    cartButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
});
