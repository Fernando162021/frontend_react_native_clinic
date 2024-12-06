import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import color from '../constants/color';
import UserService from '../services/UserService';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = yup.object().shape({
    username: yup
      .string()
      .required('El nombre de usuario es requerido'),
    password: yup
      .string()
      .required('La contraseña es requerida'),
  });

  const handleLogin = async (values) => {
    try {
      const response = await UserService.login(values);
      Alert.alert('Inicio de sesión exitoso', 'Bienvenido a FisioApp', [
        { text: 'OK', onPress: () => navigation.navigate('Main') },
      ]);
    } catch (error) {
      Alert.alert('Error en el inicio de sesión', error.message);
    }
  };  

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image 
          source={require('../assets/images/logo.png')}
          style={styles.image}  
        />
        <Text>FisioApp</Text>
      </View>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin} // Usa la función handleLogin
      >
        {({ 
          handleChange, 
          handleBlur, 
          handleSubmit, 
          values, 
          errors 
        }) => (
          <>
            <TextInput
              name="username"
              placeholder="Nombre de usuario"
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && 
              <Text style={styles.error}>{errors.username}</Text>
            }
            <TextInput
              name="password"
              placeholder="Contraseña"
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={!showPassword}
            />
            {errors.password && 
              <Text style={styles.error}>{errors.password}</Text>
            }

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPassword}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {/* Navegar a pantalla de recuperar contraseña */}}>
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: color.WHITE
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  input: { 
    borderWidth: 1, 
    borderColor: color.PRIMARY, 
    marginBottom: 10, 
    padding: 10,
    borderRadius: 5,
  },
  showPassword: {
    marginBottom: 10,
    color: color.PRIMARY,
    textAlign: 'left',
  },
  error: { 
    color: color.ERROR,
    marginBottom: 10,
  },
  button: {
    backgroundColor: color.PRIMARY,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: color.WHITE,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 15,
    textAlign: 'center',
    color: color.SECONDARY,
  },
});

export default LoginScreen;
