import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import CustomModal from '../components/Alert/CustomModal';
import Loading from './LoadingScreen';
import { useAuth } from '../../Context/AuthContext';
import { db } from '../../firebase/firebaseConfig';
import { theme } from '../core/theme';
import Background from '../components/Background';
import Button from '../components/Button/Button';
import placeholderImage from '../assets/logo.png';

export default function SpecificProductScreen({ route, navigation }) {
    const productID = route.params.prodID;
    const { addToCart, cartItems } = useAuth();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isInCart, setIsInCart] = useState(false);


    const fetchData = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'products', productID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProductData(docSnap.data());
            } else {
                throw new Error('Product data not available');
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (Array.isArray(cartItems)) {
            setIsInCart(cartItems.some((item) => item.productID === productID));
        }
    }, [cartItems, productID]);


    useLayoutEffect(() => {
        if (productData) {
            navigation.setOptions({
                title: productData.name,
                headerShown: true,
            });
        } else {
            navigation.setOptions({
                headerShown: false,
            });
        }
    }, [navigation, productData]);

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalVisible(true);
    };

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    if (loading) {
        return <Loading />;
    }

    if (!productData) {
        return (
            <CustomModal title="Problem Occurred" message="Product data is not currently available" />
        );
    }

    const { name, price, description } = productData;

    const onLoginPressed = () => {
        addToCart(productID, productData.img_url, name, price)
            .then(() => {
                console.log('success');
                setIsInCart(true);
            })
            .catch((error) => {
                console.log(error.code);
                alert(error);
            });
    };
    const imageUrls = [productData.img_url, productData.img_url2, productData.img_url3];

    return (
        <Background>
            <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {imageUrls.map((url, index) => (
                        <TouchableOpacity
                            style={styles.imageContainer}
                            key={index}
                            onPress={() => handleImagePress(url)}
                        >
                            <Image
                                source={url ? { uri: url } : placeholderImage}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.cardContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.price}>KES {price}</Text>
                    </View>
                    {expanded ? (
                        <Text style={styles.description}>{description}</Text>
                    ) : (
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
                            {description}
                        </Text>
                    )}
                    <TouchableOpacity onPress={toggleDescription}>
                        <Text style={styles.readMore}>{expanded ? 'Read Less' : 'Read More'}</Text>
                    </TouchableOpacity>
                   {isInCart ? (
                        <Button mode="contained">
                            Item is in cart
                        </Button>
                    ):(
                    <Button mode="contained" onPress={onLoginPressed}>
                        Add to Cart
                    </Button>)}
                </View>

                <Modal visible={isModalVisible} transparent>
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    style={styles.modalCloseButton}
                                    onPress={closeModal}
                                >
                                    <Ionicons name="close" size={24} color={theme.colors.white} />
                                </TouchableOpacity>
                                <Image
                                    source={selectedImage ? { uri: selectedImage } : placeholderImage}
                                    style={styles.modalImage}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </Background>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        width: width * 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 8,
        marginRight: 10,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: 300,
        height: null,
        resizeMode: 'cover',
    },
    cardContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        elevation: 3,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        // color: theme.colors.secondary,
    },
    price: {
        fontSize: 24,
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginTop: 8,
        // color: theme.colors.grey,
    },
    readMore: {
        color: theme.colors.grey,
        marginTop: 8,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        // backgroundColor: theme.colors.white,
        borderRadius: 8,
        padding: 4,
        alignItems: 'center',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    modalImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});
