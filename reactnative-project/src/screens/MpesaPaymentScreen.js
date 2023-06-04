import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Alert, ScrollView } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button/Button';
import Paragraph from '../components/Paragraph';
import { numberValidator } from '../helpers/numberValidator';
import CustomModal from '../components/Alert/CustomModal';
import { LipaNaMpesa } from '../helpers/MPESA';

const MpesaPaymentScreen = () => {
  const [number, setNumber] = useState({ value: '', error: '' });
  const [successMessage, setSuccessMessage] = useState(false);

  const onSubmit = () => {
    const numberError = numberValidator(number.value);
    if (numberError) {
      setNumber({ ...number, error: numberError });
      return;
    }
    LipaNaMpesa(number.value)
      .then(() => {
        setSuccessMessage(true);
      })
      .catch((error) => {
        Alert.alert('Payment Error', error, [{ text: 'OK' }]);
      });
  };

  if (successMessage) {
    return (
      <CustomModal
        title="Important"
        message="Please wait for an MPESA prompt"
        onPress={() => setSuccessMessage(false)}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524',
          }}
          style={styles.image}
        />
        <Paragraph>Enter your Mpesa number</Paragraph>
        <View style={styles.textArea}>
          <TextInput
            label="Phone Number"
            returnKeyType="next"
            value={number.value}
            onChangeText={(text) => setNumber({ value: text, error: '' })}
            error={!!number.error}
            errorText={number.error}
            autoCapitalize="none"
            autoCompleteType="number"
            keyboardType="numeric"
          />
        </View>

        <Button mode="contained" onPress={onSubmit}>
          Submit
        </Button>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textArea: {
    marginBottom: 10,
  },
});

export default MpesaPaymentScreen;
