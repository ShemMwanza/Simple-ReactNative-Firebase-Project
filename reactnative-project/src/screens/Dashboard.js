import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './ExploreScreen';
import { theme } from '../core/theme';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfileButton from '../components/Button/ProfileButton';
import ExploreScreen from './ExploreScreen';
import CategoriesScreen from './CategoriesScreen';
// import { Tab } from 'react-native-elements';


function Dashboard( { navigation } ) {
    
    const openDashboardModal = () => {
        navigation.navigate('OptionsScreen');
    }
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route, navigation}) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Categories') {
                        iconName = focused ? 'grid' : 'grid-outline';
                    }
                    else if (route.name === 'Explore') {
                        iconName = focused ? 'compass' : 'compass-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={size}
                            color={color}
                            style={{ position: 'relative', top: focused ? 2 : 0 }}
                        />
                    );
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: 'white',
                headerRight: () => (
                    <ProfileButton 
                        openDashboardModal={openDashboardModal}
                    />
                ),
            })}
        >            
            <Tab.Screen name="Categories" component={CategoriesScreen} />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default Dashboard;
