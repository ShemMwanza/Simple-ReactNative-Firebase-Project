import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfilePhoto from '../components/User/ProfilePhoto';
import { useAuth } from '../../Context/AuthContext';
import ProfileForm from '../components/User/ProfileForm';
import Background from '../components/Background';
const ProfileScreen = () => {
  const { currentUser } = useAuth();

  const image = currentUser?.photoURL ? currentUser.photoURL : 'https://picsum.photos/200/300';
  return (
    <Background>
      <View style={styles.container}>
        <ProfilePhoto photoUrl={
          image
        } />
        <ProfileForm />
      </View>
    </Background>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({

  container: {
    marginTop: 16,
    padding: 16,
    borderRadius: 4,
    flex: 1

  },
});