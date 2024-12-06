import React, { useState } from 'react';
import { Platform, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfirmModal from '../components/ConfirmModal';
import ModalForm from '../components/ModalForm';
import color from '../constants/color';

const AppointmentScreen = () => {
  const navigation = useNavigation();

  const [appointments, setAppointments] = useState([
    { id: '1', name: 'Fernando Quintero', date: '2024-12-10', time: '09:00' },
    { id: '2', name: 'Ernesto Quintero', date: '2024-12-10', time: '10:00' },
    { id: '3', name: 'Armando Madrigal', date: '2024-12-10', time: '11:00' },
    { id: '4', name: 'Carolina Pérez', date: '2024-12-10', time: '14:00' },
    { id: '5', name: 'Noelia Aguiar', date: '2024-12-10', time: '15:00' },
  ]);
  
  const [filter, setFilter] = useState('');
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({ name: '', date: '', time: '' });
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const filteredAppointments = appointments.filter(app =>
    app.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCancelPress = (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      setAppointments(appointments.filter(app => app.id !== appointmentToDelete));
    }
    setConfirmModalVisible(false);
    setAppointmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmModalVisible(false);
    setAppointmentToDelete(null);
  };

  const handleEditPress = (appointment) => {
    setInitialValues(appointment);
    setFormModalVisible(true);
  };

  const handleNewAppointment = () => {
    setInitialValues({ name: '', date: '', time: '' });
    setFormModalVisible(true);
  };

  const handleSubmit = (values) => {
    if (initialValues.id) {
      setAppointments(prevAppointments => 
        prevAppointments.map(app => 
          app.id === initialValues.id ? { ...app, ...values } : app
        )
      );
    } else {
        const newAppointment = { id: (appointments.length + 1).toString(), ...values };
        setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    }
    setFormModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gestión de citas FisioApp</Text>
      </View>
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
                <Button
                  title="Cancelar"
                  onPress={() => handleCancelPress(item.id)}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button 
                  title="Editar" 
                  onPress={() => handleEditPress(item)} 
                />
              </View>
            </View>
          </View>
        )}
      />
      <ConfirmModal
        visible={confirmModalVisible}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de que deseas cancelar esta cita?"
      />
      <ModalForm
        visible={formModalVisible}
        onClose={() => setFormModalVisible(false)}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        title={initialValues.name ? 'Editar Cita' : 'Agendar nueva cita'}
      />
      <TouchableOpacity>
        <Button title='Agendar nueva cita' onPress={() => handleNewAppointment()} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20
  },
  header: {
    padding: 20,
    backgroundColor: color.PRIMARY,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.WHITE
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

export default AppointmentScreen;