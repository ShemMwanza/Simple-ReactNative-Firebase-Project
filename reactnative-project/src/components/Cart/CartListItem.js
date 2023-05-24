import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../core/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../Context/AuthContext';
import { SwipeListView } from 'react-native-swipe-list-view';
import TextInput from '../TextInput';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
export default function CartListItem({ item }) {
    // const [cartItems, setCartItems] = useState({});
    const {
        currentUser,
        items,
        setItems,
        addQuantityToCart,
        cartItems, setCartItems
    } = useAuth();

    
    const handleChange = (itemId, value) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue)) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.productID === itemId) {
                    return { ...item, quantity: parsedValue };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        }
    };

    const handleAddClick = (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.productID === itemId) {
                const newQuantity = item.quantity + 1;
                addQuantityToCart(itemId, newQuantity);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleSubClick = (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.productID === itemId) {
                const newQuantity = Math.max(0, item.quantity - 1);
                addQuantityToCart(itemId, newQuantity)
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };
    const itemQuantity = item.quantity || 1;
    const totalPrice = item.price * itemQuantity;


    function deleteCart(id) {
        console.log('id', id);

        deleteDoc(doc(db, 'cart', currentUser.uid, currentUser.uid, id))
            .then(() => {
                console.log('Document successfully deleted');
                const updatedCartItems = cartItems.filter((item) => item.productID !== id);
                setCartItems(updatedCartItems);
                // Call fetchData() or any other function to refresh the data
            })
            .catch((error) => {
                console.log('Error deleting document:', error);
            });
    }

    return (
        <SwipeListView
            data={[item]}
            keyExtractor={(item) => item.productID}
            renderItem={(data, rowMap) => (
                <View style={styles.card}>
                    <View style={styles.infoContainer}>
                        <Image style={styles.thumb} source={{ uri: item.img_url }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.title}</Text>
                            <Text style={styles.price}>KES {totalPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.quantityView}>
                        <TouchableOpacity
                            onPress={() => handleSubClick(item.productID)}
                            style={styles.handleSubClick}
                        >
                            <Text style={{ fontSize: 24, fontWeight: '200' }}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            onChangeText={(value) => handleChange(item.productID, value)}
                            keyboardType="numeric"
                            style={styles.handleChange}
                            value={itemQuantity.toString()}
                        />
                        <TouchableOpacity
                            onPress={() => handleAddClick(item.productID)}
                            style={styles.handleAddClick}
                        >
                            <Text style={{ fontSize: 24, fontWeight: '200' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            renderHiddenItem={(data, rowMap) => (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        const itemId = item.productID;
                        // rowMap[itemId].closeRow();
                        deleteCart(itemId);
                        // setCartItems({ ...cartItems, [itemId]: undefined });
                    }}
                >
                    <Ionicons name="trash-outline" style={styles.delete} size={34} color="white" />
                </TouchableOpacity>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            disableRightSwipe={true}
            disableScrollViewPanResponder={true} 
        />
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        elevation: 1,
        borderTopWidth: 1,
        borderTopColor: theme.colors.secondary,
        width: '100%',
        paddingHorizontal: 15,
    },
    thumb: {
        width: 90,
        height: 90, // reduced height
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginVertical: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    textContainer: {
        flex: 1,
        padding: 16,
    },
    name: {
        fontSize: 21,
        fontWeight: 'bold',
    },

    quantityView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        width: "75%",
        marginVertical: 12,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 8,
        color: theme.colors.primary,
    },
    handleChange: {
        textAlign: "center",
        fontSize: 16,
        height: 40,
        backgroundColor: "white",
        fontWeight: "bold",
        color: "#1F2937",
        width: "90%",
        marginHorizontal: 10,
    },


    handleAddClick: {
        backgroundColor: "#D1D5DB",
        width: 50,
        height: 50,
        borderTopEndRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    handleSubClick: {
        backgroundColor: "#D1D5DB",
        width: 50,
        height: 50,
        borderTopStartRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '100%',
        paddingRight: 6,
        backgroundColor: '#E3242B',
    },
    delete: {
        marginHorizontal: 12,
    }
});