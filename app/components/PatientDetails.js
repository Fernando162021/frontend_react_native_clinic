import React from 'react';
import { Modal, View, Text, StyleSheet, Button} from 'react-native';
import color from '../constants/color';

const PatientDetails = ({ visible, onClose, patient }) => {
  if (!patient) return null
  
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Detalles del paciente</Text>
          <Text>Nombre: {patient.name}</Text>
          <Text>Edad: {patient.age}</Text>
          <Text>Teléfono: {patient.phone}</Text>
          <Text>Dirección: {patient.address || 'No registrada'}</Text>
          <Text>Correo: {patient.email || 'No registrado'}</Text>
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PatientDetails;
