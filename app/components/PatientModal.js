import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import color from '../constants/color';
import DateTimePicker from '@react-native-community/datetimepicker';

const formSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  age: yup.number().required('La edad es requerida').positive('La edad debe ser positiva').integer('La edad debe ser un número entero'),
  phone: yup.string().required('El teléfono es requerido'),
});

const PatientModal = ({ visible, onClose, patient, onSave }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState(patient?.dob || '');

  useEffect(() => {
    if (patient) {
      setDob(patient.dob);
    }
  }, [patient]);

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setDob(formattedDate);
    setFieldValue('dob', formattedDate);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{patient ? 'Editar Paciente' : 'Nuevo Paciente'}</Text>
          <Formik
            initialValues={{
              name: patient?.name || '',
              age: patient?.age || '',
              phone: patient?.phone || '',
              dob: dob || '',
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              onSave(values);
              onClose();
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
              <>
                <TextInput
                  placeholder="Nombre"
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <TextInput
                  placeholder="Edad"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                />
                {errors.age && <Text style={styles.error}>{errors.age}</Text>}

                <TextInput
                  placeholder="Teléfono"
                  style={styles.input}
                  keyboardType="phone-pad"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

                <View style={styles.dateContainer}>
                  <TextInput
                    style={styles.inputDate}
                    value={values.dob || ''}
                    placeholder="Fecha de nacimiento"
                    editable={false}
                  />
                  <Button
                    title="Calendario"
                    onPress={() => setShowDatePicker(true)}
                  />
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date(values.dob || Date.now())}
                    mode="date"
                    display="default"
                    onChange={(event, date) => handleDateChange(event, date, setFieldValue)}
                  />
                )}

                <View style={styles.buttonContainer}>
                  <Button title="Cancelar" onPress={handleClose} color={color.SECONDARY} />
                  <Button title="Guardar" onPress={handleSubmit} color={color.PRIMARY} />
                </View>
              </>
            )}
          </Formik>
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
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  inputDate: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
});

export default PatientModal;
