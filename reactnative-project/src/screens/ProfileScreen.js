import React from 'react';
import { View, Text } from 'react-native';
import ProfilePhoto from '../components/User/ProfilePhoto';
import { useAuth } from '../../Context/AuthContext';
import ProfileForm from '../components/User/ProfileForm';

const ProfileScreen = () => {
  const { currentUser } = useAuth();

  const image = currentUser?.photoURL ? currentUser.photoURL : 'https://picsum.photos/200/300';
  return (
    <View>
      <ProfilePhoto photoUrl={
       image
      } /> 
      <ProfileForm />
    </View>
  );
};

export default ProfileScreen;
