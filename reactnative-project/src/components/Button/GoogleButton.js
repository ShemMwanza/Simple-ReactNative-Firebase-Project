import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button as PaperButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../core/theme';

export default function GoogleButton({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { borderColor: theme.colors.grey },
        style,
      ]}
      labelStyle={styles.labelStyle}
      mode={mode}
      {...props}
    >
      <View style={styles.content}>
        <Icon name="google" color="#777" size={20} style={styles.icon} />
        <Text style={styles.text}>Sign In with Google</Text>
      </View>
    </PaperButton>
  );
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
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 10,
    color: theme.colors.grey,
    marginLeft: 10, // Adjust this value to align the text and icon properly
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    marginLeft: 10,
  },
});
