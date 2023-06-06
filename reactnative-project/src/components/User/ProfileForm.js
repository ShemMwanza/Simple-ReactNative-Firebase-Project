import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useAuth } from '../../../Context/AuthContext';
import TextInput from '../TextInput';
import Button from '../Button/Button';
import { theme } from '../../core/theme';
import { useNavigation } from '@react-navigation/native';
import { emailValidator } from '../../helpers/emailValidator'
import { nameValidator } from '../../helpers/nameValidator'
import React from 'react'

export default function ProfileForm() {
  const { currentUser, updateProfileDetails, updateUserInfo } = useAuth();
  const [email, setEmail] = useState({ value: currentUser.email, error: '' })
  const [name, setName] = useState({ value: currentUser.displayName, error: '' })
  const handleNameChange = (text) => {
    setName({ value: text, error: '' })
  }
  const [showProfileMessage, setProfileMessage] = useState(false);
  const handleEmailChange = (text) => {
    setEmail({ value: text, error: '' })
  }
  const handleSubmit = async () => {
    const emailError = emailValidator(email.value)
    const nameError = nameValidator(name.value);
    const phoneError = nameValidator(phoneNumber.value);
    const locationError = nameValidator(location.value);
    if (emailError || nameError || locationError || phoneError) {
      setEmail({ ...email, error: emailError });
      setName({ ...name, error: nameError });
      setLocation({ ...location, error: locationError });
      setPhoneNumber({ ...phoneNumber, error: phoneError });
      return
    }
    try {
      await updateProfileDetails(name.value, email.value);
      return (

        <CustomModal
          visible={showProfileMessage}
          title="Success"
          message="Your profile has been updated"
          onPress={() => setProfileMessage(false)}
        />);
    } catch (error) {
      return (
        <CustomModal
          visible={showProfileMessage}
          title="Error!"
          message="Something went wrong"
          onPress={() => setProfileMessage(false)}
        />);
    }

  };
  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>2. User Information</Text>
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
        Proceed to Payment
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
    fontSize: 24,
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


