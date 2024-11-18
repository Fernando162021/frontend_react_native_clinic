import React from 'react';
import { View, Image, Text, Button, StyleSheet, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native';
import color from '../constants/color';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenido a FisioApp</Text>
      <Text style={styles.description}>Tu tiempo es nuestra prioridad</Text>
      <TouchableOpacity>
        <Button 
          title="Accede al inicio de sesión" 
          onPress={() => navigation.navigate('Login')}
          />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
    textAlign: 'center',
    color: color.PRIMARY
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  }
});

export default WelcomeScreen;