import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const UpdateAppointmentScreen = ({ route, navigation }) => {
  const { appointment } = route.params;
  const [status, setStatus] = useState(appointment.status);

  const handleUpdate = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Cita</Text>
      <Text>Título: {appointment.title}</Text>
      <TextInput
        style={styles.input}
        placeholder="Estado (pendiente, en proceso, completado, cancelado)"
        value={status}
        onChangeText={setStatus}
      />
      <Button title="Actualizar" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default UpdateAppointmentScreen;