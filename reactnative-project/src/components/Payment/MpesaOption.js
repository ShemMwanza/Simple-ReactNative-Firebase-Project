import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';
import { theme } from '../../core/theme';

export default function MpesaOption({ goToMpesa }) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.pressable,
                styles.container,
                { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={goToMpesa}
        >
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Cover
                        source={{
                            uri:
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524',
                        }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Card>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: theme.colors.white,
        marginVertical: 10,
    },
    card: {
        height: 200, // Set the desired height for the card
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
    },
    pressable: {
        opacity: 1,
    },
    image: {
        resizeMode: 'contain',
        height: '80%', // Adjust the height as needed
        aspectRatio: 1, // Maintain the aspect ratio of the image
    },
});
