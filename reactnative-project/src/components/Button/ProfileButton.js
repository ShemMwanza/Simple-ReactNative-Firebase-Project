import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements';
import { useAuth } from '../../../Context/AuthContext';

export default function ProfileButton({ openDashboardModal }) {
    const { currentUser } = useAuth();
    const image = currentUser?.photoURL ? currentUser.photoURL : 'https://picsum.photos/200/300';

    return (
        <TouchableOpacity onPress={openDashboardModal}>
            <Avatar
                rounded
                source={{
                    uri: image,
                }}
                containerStyle={{ marginRight: 10 }}
            />
        </TouchableOpacity>
    )
}
