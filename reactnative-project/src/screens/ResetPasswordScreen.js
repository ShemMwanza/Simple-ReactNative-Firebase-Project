import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import { Alert } from 'react-native'
import BackButton from '../components/Button/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button/Button'
import { emailValidator } from '../helpers/emailValidator'
import { useAuth } from '../../Context/AuthContext'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const { currentUser, sendPasswordReset } = useAuth();
  useEffect(() => {
    if (currentUser) {
      navigation.navigate('Dashboard');
    }
  }, [currentUser, navigation]);

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    sendPasswordReset(email.value).then(() => {
      console.log('dwdfcd');
      Alert.alert(
        'Error',
        'Check your email for a password reset link',
        [
          {
            text: 'OK', onPress: () => navigation.navigate('LoginScreen')
          }
        ],
        { cancelable: false }
      );

    }).catch((error) => {
      if (error.code === "auth/user-not-found") {
        console.log('dd');
        // setIsLoading(false);
        Alert.alert(
          'Error',
          'User account does not exist',
          [
            { text: 'OK', onPress: () => console.log('OK pressed') }
          ],
          { cancelable: false }
        );
      }
      else {
        console.log(error.message);
        // setIsLoading(false);
        Alert.alert(
          'Error',
          'Something went wrong!',
          [
            { text: 'OK', onPress: () => console.log('OK pressed') }
          ],
          { cancelable: false }
        );
      }
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
