import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../core/theme'

export default function GoogleButton({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { borderColor: theme.colors.grey },
        style,
      ]}
      labelStyle={[styles.text, { color: theme.colors.grey }]}
      mode={mode}
      {...props}
    >
      <Icon name="google" color="#777" size={20} style={styles.icon} />
      Sign In with Google
    </PaperButton>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.grey,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
    color: theme.colors.grey,
  },
  icon: {
    marginRight: 10,
  },
})
