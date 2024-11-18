import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import color from '../constants/color';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email Address is Required'),
    password: yup
      .string() 
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

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
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values) => navigation.navigate('Main')}
      >
        {({ 
        handleChange, 
        handleBlur, 
        handleSubmit, 
        values, 
        errors}) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType='email-address'
            />
            {errors.email && 
              <Text style={styles.error}>{errors.email}</Text>
            }
            <TextInput
              name="password"
              placeholder="Password"
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

            <TouchableOpacity onPress={() => {/* Navigate to ForgotPasswordScreen */}}>
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
    marginBottom: 10
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

export default LoginScreen