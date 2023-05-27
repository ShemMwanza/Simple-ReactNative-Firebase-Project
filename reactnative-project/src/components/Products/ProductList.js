import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useAuth } from '../../../Context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import Loading from '../../screens/LoadingScreen';
import ProductListItem from './ProductListItem';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Paragraph from '../Paragraph';

const ProductList = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { currentPage, items, setItems, setProdID, prodID } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const newdata = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setItems(newdata);
        } catch (error) {
            setErrorMessage(true);
            console.log('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isFocused]);

    const handleItemPress = (itemId) => {
        setProdID(itemId);
        navigation.navigate('SpecificProductScreen', {
            prodID: itemId,
        });
    };



    const renderItem = ({ item }) => (
        <ProductListItem item={item} handleItemPress={handleItemPress} />
    );

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {errorMessage ? (
                <Paragraph>Sorry, there is no available data.</Paragraph>
            ) : (
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </>
    );
};

export default ProductList;
