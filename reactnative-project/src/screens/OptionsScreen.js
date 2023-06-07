import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button/Button';
import { useAuth } from '../../Context/AuthContext';
import { theme } from '../core/theme';

const OptionsScreen = ({ navigation }) => {
    const { logout } = useAuth();
    const handleProfileNavigate = () => {
        navigation.navigate('Profile');
    };
    const profileOptions = [
        { id: '1', title: 'Edit Profile', icon: 'person', onPress:  handleProfileNavigate },
        { id: '2', title: 'Change Password', icon: 'key', onPress:  handleProfileNavigate },
    ];

    const renderProfileOption = ({ item }) => (
        <TouchableOpacity onPress={item.onPress}>
            <View style={styles.optionButtonContainer}>
                <Button
                    mode="outlined"
                    onPress={item.onPress}
                    style={styles.optionButton}
                    labelStyle={styles.optionButtonText}
                    icon={() => <Ionicons name={item.icon} size={20} color={theme.colors.secondary} style={styles.optionButtonIcon} />}
                    contentStyle={styles.optionButtonContent}
                >
                    {item.title}
                </Button>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={profileOptions}
                keyExtractor={(item) => item.id}
                renderItem={renderProfileOption}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />

            <Button mode="outlined" onPress={logout}>
                Logout
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        width: '100%',
    },
    listContent: {
        paddingTop: 10,
    },
    optionButtonContainer: {
        width: '100%',
    },
    optionButton: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        elevation: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 15,
        marginVertical: 0,
    },
    optionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.secondary,
        textAlign: 'left',
    },
    optionButtonIcon: {
        marginRight: 10,
    },
    optionButtonContent: {
        paddingVertical: 10,
    },
});

export default OptionsScreen;
