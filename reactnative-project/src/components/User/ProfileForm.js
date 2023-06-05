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
  const { currentUser, placeOrder, cartItems, updateUserInfo } = useAuth();
  const [email, setEmail] = useState({ value: currentUser.email, error: '' })
  const [name, setName] = useState({ value: currentUser.displayName, error: '' })
  const [location, setLocation] = useState({ value: '', error: '' })
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' })
  const handleNameChange = (text) => {
    setName({ value: text, error: '' })
  }
  const navigation = useNavigation();
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
      await updateUserInfo(email.value, name.value, phoneNumber.value, total);
      navigation.navigate('PaymentMethodScreen');
    } catch (error) {
      console.log(error);
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
        <View style={styles.inputContainer}>
          <TextInput
            label="Phone Number"
            returnKeyType='next'
            keyboardType='numeric'
            value={phoneNumber.value}
            error={!!name.error}
            errorText={name.error}
            onChangeText={(text) => setPhoneNumber({ value: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Delivery Location"
            returnKeyType="next"
            value={location.value}
            error={!!name.error}
            errorText={name.error}
            onChangeText={(text) => setLocation({ value: text })}
          />
          <Text style={styles.inputDescription}>
            *Please be specific
          </Text>
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


