import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import {
  LoginScreen,
  RegisterScreen,
  Dashboard,
  ResetPasswordScreen,
  StartScreen,
  CheckoutScreen,
} from './src/screens';
import { AuthProvider } from './Context/AuthContext';
import OptionsScreen from './src/screens/OptionsScreen';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentMethodScreen from './src/screens/PaymentMethodScreen';
import SpecificProductScreen from './src/screens/SpecificProductScreen';
import MpesaPaymentScreen
  from './src/screens/MpesaPaymentScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <Provider theme={theme}>
        <StatusBar mode='light' />
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen
              name="CheckoutScreen"
              component={CheckoutScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="OptionsScreen"
              component={OptionsScreen}
              options={{
                presentation: 'modal',
                title: 'Options',
                headerShown: true,
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="PaymentMethodScreen"
              component={PaymentMethodScreen}
              options={{
                presentation: 'modal',
                title: 'Payment Method',
                headerShown: true,
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="SpecificProductScreen"
              component={SpecificProductScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="MpesaPaymentScreen"
              component={MpesaPaymentScreen}
              options={{
                headerShown: false,

                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: 'white',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  );
}
