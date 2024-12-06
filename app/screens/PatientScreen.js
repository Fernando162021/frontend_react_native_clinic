import React, { useState } from 'react';
import { Platform, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../constants/color';
import PatientDetails from '../components/PatientDetails';
import PatientModal from '../components/PatientModal';

const PatientScreen = () => {
  const navigation = useNavigation();

  const [patients, setPatients] = useState([
    { id: '1', name: 'Fernando Quintero', age: 29, phone: '123-456-7890' },
    { id: '2', name: 'Ernesto Quintero', age: 35, phone: '987-654-3210' },
    { id: '3', name: 'Armando Madrigal', age: 41, phone: '456-789-1234' },
    { id: '4', name: 'Carolina Pérez', age: 25, phone: '321-654-9870' },
    { id: '5', name: 'Noelia Aguiar', age: 38, phone: '789-123-4560' },
  ]);

  const [filter, setFilter] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false); // Estado para el modal de añadir/editar pacientes
  const [isViewModalVisible, setViewModalVisible] = useState(false);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddPatient = () => {
    setSelectedPatient(null); // Resetea paciente seleccionado para añadir uno nuevo
    setModalVisible(true); // Abre el modal para añadir
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient); // Establece el paciente seleccionado
    setModalVisible(true); // Abre el modal para edición
  };
  
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setViewModalVisible(true);
  };

  const handleSavePatient = (newPatient) => {
    if (selectedPatient) {
      // Editar paciente existente
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === selectedPatient.id ? { ...selectedPatient, ...newPatient } : patient
        )
      );
    } else {
      // Añadir nuevo paciente
      const newId = (patients.length + 1).toString();
      setPatients([...patients, { ...newPatient, id: newId }]);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setViewModalVisible(false)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gestión de pacientes FisioApp</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Buscar pacientes"
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>Edad: {item.age}</Text>
            <Text>Teléfono: {item.phone}</Text>
            <View style={styles.buttonContainer}> 
              <View style={styles.buttonWrapper}>
                <Button
                  title="Ver"
                  onPress={() => handleViewPatient(item)}  
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Editar"
                  onPress={() => handleEditPatient(item)}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <PatientModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        patient={selectedPatient}
        onSave={handleSavePatient}
      />
      <PatientDetails
        visible={isViewModalVisible}
        onClose={handleCloseModal}
        patient={selectedPatient}
      />
      <TouchableOpacity>
        <Button title="Añadir Paciente" onPress={handleAddPatient} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  header: {
    padding: 20,
    backgroundColor: color.PRIMARY,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.WHITE,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardContainer: {
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
  cardTitle: {
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

export default PatientScreen;