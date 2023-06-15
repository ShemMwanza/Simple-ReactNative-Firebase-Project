import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/Button/BackButton'
import GoogleButton from '../components/Button/GoogleButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { useAuth } from '../../Context/AuthContext'

export default function RegisterScreen({ navigation }) {
  const { currentUser, createWithEmailAndPassword, signInWithGoogle } = useAuth();
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirm_password, setConfirmPassword] = useState({ value: '', error: '' })
  const [passwordError, setPasswordError] = useState('');
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    else if (password.value !== confirm_password.value) {
      setPasswordError('Passwords do not match');
    }
    else {
      createWithEmailAndPassword(name.value, email.value, password.value).then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
        console.log("Account has been created");
      });
    }
  }

  const onGoogleButtonPress = () => { signInWithGoogle }

  return (
    <Background>
      <View style={styles.container}>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Create Account</Header>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="next"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          value={confirm_password.value}
          onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
          secureTextEntry
        />
        <Text style={styles.error}>{passwordError}</Text>
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
        <GoogleButton mode="contained" onPress={onGoogleButtonPress}></GoogleButton>
      </View>
    </Background>
  )
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
