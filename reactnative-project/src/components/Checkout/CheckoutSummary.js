import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../core/theme';

export default function CheckoutSummary(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>1. Order Summary</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Total Items:</Text>
                <Text style={styles.value}>{props.items.length}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Shipping:</Text>
                <Text style={styles.value}>Free</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Sub Total:</Text>
                <Text style={styles.value}>KES {props.total}</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerTitle}>Estimated Total:</Text>
                <Text style={styles.footerValue}>KES {props.total}</Text>
            </View>
        </View>
    );
}

const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        overflow: 'hidden',
        backgroundColor: 'white',
        padding: 16,
        paddingTop: 16,
        alignSelf: 'center',
        marginTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.grey,
    },
    header: {
        width: '100%',
        paddingVertical: 4,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: theme.colors.title,
    },
    row: {
        paddingTop: 6,
        paddingBottom: 2,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.grey,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        // color: '#1F2937',
    },
    footer: {
        borderTopWidth: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
        paddingVertical: 10,
    },
    footerTitle: {
        fontSize: 18,
        fontWeight: '600',
        // color: '#1F2937',
    },
    footerValue: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.primary,
    },
});
