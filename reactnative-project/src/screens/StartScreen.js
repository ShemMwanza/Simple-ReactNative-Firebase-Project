import React, { useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button/Button';
import Paragraph from '../components/Paragraph';
import { useAuth } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StartScreen({ navigation }) {
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user) {
            navigation.navigate('Dashboard');
          }
        }
      } catch (error) {
        console.log('Error checking stored user:', error);
      }
    };

    checkStoredUser();
  }, [navigation]);

  return (
    <Background>
      <Logo />
      <Header>Get Started</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  );
}
