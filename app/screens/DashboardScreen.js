import React, { useState } from 'react';
import { Platform } from 'react-native';
import { View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../constants/color'

const DashboardScreen = () => {
  const navigation = useNavigation();

  const [appointments, setAppointments] = useState([
    { id: '1', name: 'Fernando Quintero', date: '2023-10-01', time: '10:00' },
    { id: '2', name: 'Ernesto Quintero', date: '2023-10-02', time: '12:00' },
    { id: '3', name: 'Armando Madrigal', date: '2023-10-03', time: '14:00' },
    { id: '4', name: 'Carolina Pérez', date: '2023-10-04', time: '16:00' },
    { id: '5', name: 'Noelia Aguiar', date: '2023-10-05', time: '18:00' },
  ]);

  const [filter, setFilter] = useState('');

  const filteredAppointments = appointments.filter(app => 
    app.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Citas Agendadas</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar citas"
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        data={filteredAppointments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentContainer}>
            <Text style={styles.appointmentTitle}>{item.name}</Text>
            <Text>Fecha: {item.date}</Text>
            <Text>Hora: {item.time}</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button title="Editar" onPress={() => {/* acción del botón 1 */}} />
              </View>
              <View style={styles.buttonWrapper}>
                <Button title="Cancelar" onPress={() => {/* acción del botón 2 */}} />
              </View>
            </View>
          </View>
        )}
      />
      <Button title="Agendar nueva cita" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  appointmentContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: color.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonWrapper: {
    marginLeft: 10,
    borderRadius: 10
  },
});

export default DashboardScreen;