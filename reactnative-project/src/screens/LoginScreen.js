import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button/Button'
import GoogleButton from '../components/Button/GoogleButton'
import TextInput from '../components/TextInput'
import BackButton from '../components/Button/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { useAuth } from '../../Context/AuthContext'
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const { currentUser, logInWithEmailAndPassword } = useAuth();


  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    logInWithEmailAndPassword(email.value, password.value).then(() => {
      console.log('dwdfcd');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
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
      else if (error.code === "auth/wrong-password"){
        Alert.alert(
          'Error',
          'Wrong username or password',
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
  useEffect(() => {
    if (currentUser) {
      navigation.navigate('Dashboard');
    }
  }, [currentUser, navigation]);

  return (
    <Background>
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
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
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <GoogleButton mode="contained" onPress={onLoginPressed}></GoogleButton>
      </View>
    </Background>
  )
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center'
    },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 28,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
