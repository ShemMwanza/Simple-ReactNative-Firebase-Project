import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useAuth } from '../../../Context/AuthContext';
import TextInput from '../TextInput';
import Button from '../Button/Button';
import { theme } from '../../core/theme';
import { emailValidator } from '../../helpers/emailValidator'
import { nameValidator } from '../../helpers/nameValidator'
import React, { useState } from 'react'
import CustomModal from '../Alert/CustomModal'
import Loading from '../../screens/LoadingScreen';

export default function ProfileForm() {
  const { currentUser, updateProfileDetails, sendPasswordReset } = useAuth();
  const [email, setEmail] = useState({ value: currentUser.email, error: '' })
  const [name, setName] = useState({ value: currentUser.displayName, error: '' })
  const handleNameChange = (text) => {
    setName({ value: text, error: '' })
  }
  const [showProfileMessage, setProfileMessage] = useState(false);
  const [showErrorProfileMessage, setErrorProfileMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail({ value: text, error: '' })
  }
  const handleSubmit = async () => {
    const emailError = emailValidator(email.value)
    const nameError = nameValidator(name.value);
    if (emailError || nameError) {
      setEmail({ ...email, error: emailError });
      setName({ ...name, error: nameError });
      return
    }
    try {
      await updateProfileDetails(name.value, email.value).then(() => {
        setProfileMessage(true);

      }).catch(() => {
        setErrorProfileMessage(true);
      });

    } catch (error) {
      setErrorProfileMessage(true);
    }
  };

  const handlePassword = async () => {
    setIsLoading(true);

    try {
      await Promise.all([
        sendPasswordReset(currentUser.email),
        new Promise((resolve) => setTimeout(resolve, 5000)) // Timeout of 5 seconds
      ]);
      setProfileMessage(true);
    } catch (error) {
      console.log(error.code);
      setErrorProfileMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>

      <CustomModal
        visible={showProfileMessage}
        title="Success"
        message="Your request has been processed"
        onPress={() => setProfileMessage(false)}
      />
      <CustomModal
        visible={showErrorProfileMessage}
        title="Error!"
        message="Something went wrong"
        onPress={() => setErrorProfileMessage(false)}
      />
      <Text style={styles.sectionText}>User Information</Text>
      <>
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={handleNameChange}
            error={!!name.error}
            errorText={name.error}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={handleEmailChange}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </View>
      </>
      <Button mode="contained" onPress={handleSubmit}>
        Update
      </Button>

      <Button mode="outlined" onPress={handlePassword}>
        Change Password
      </Button>
    </View>
  )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    marginVertical: 4,
    marginHorizontal: 0,
    paddingVertical: 16,
    paddingHorizontal: 20, // Add horizontal padding
    width: width * 0.9,
    alignSelf: 'center',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.title,
    marginTop: 16,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputDescription: {
    fontSize: 12,
    color: theme.colors.grey,
    marginTop: 2,
  },
  button: {
    backgroundColor: theme.colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
});


