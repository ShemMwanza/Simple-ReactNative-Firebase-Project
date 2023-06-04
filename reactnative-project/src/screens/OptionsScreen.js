import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../components/Button/Button'
import { useAuth } from '../../Context/AuthContext';

export default function OptionsScreen() {
    const { logout } = useAuth();

  return (
      <View style={styles.container}>
          <Button mode="outlined" onPress={logout}>
              Logout
          </Button>
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
    },
});