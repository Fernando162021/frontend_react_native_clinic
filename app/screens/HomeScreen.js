import React from 'react';
import { View, SafeAreaView, Text, Button, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Welcome')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold' },
});

export default DashboardScreen;
