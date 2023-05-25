import React, {useEffect} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button/Button'
import Paragraph from '../components/Paragraph'
import { useAuth } from '../../Context/AuthContext'

export default function StartScreen({ navigation }) {
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      navigation.navigate('Dashboard');
    }
  }, [currentUser, navigation]);

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
  )
}
