import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const profileData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://example.com/profile_picture.jpg',
    bio: 'Software engineer and cat lover',
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileData.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{profileData.name}</Text>
      <Text style={styles.email}>{profileData.email}</Text>
      <Text style={styles.bio}>{profileData.bio}</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Welcome')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default ProfileScreen;