import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProductCard = ({ name, image }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Image
                source={image ? { uri: image } : require('../../assets/logo.png')}
                style={styles.image}
            />
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
};

const ProductTypes = () => {
    const products = [
        { name: 'Product 1', image: 'https://example.com/product1.jpg' },
        { name: 'Product 2', image: 'https://example.com/product2.jpg' },
        { name: 'Product 3', image: 'https://example.com/product3.jpg' },
        { name: 'Product 4' },
        { name: 'Product 5', image: 'https://example.com/product5.jpg' },
        { name: 'Product 6' },
    ];

    const rows = [];
    for (let i = 0; i < products.length; i += 2) {
        const row = (
            <View key={i} style={styles.row}>
                <ProductCard name={products[i].name} image={products[i].image} />
                {i + 1 < products.length && (
                    <ProductCard name={products[i + 1].name} image={products[i + 1].image} />
                )}
            </View>
        );
        rows.push(row);
    }

    return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        padding: 12,
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 8,
        resizeMode: 'contain',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductTypes;
