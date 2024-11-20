import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const appointmentSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  date: yup.string().required('La fecha es requerida'),
  time: yup.string().required('La hora es requerida'),
});

const AppointmentFormModal = ({ visible, onClose, appointment, onSubmit }) => {
  const initialValues = {
    name: appointment ? appointment.name : '',
    date: appointment ? appointment.date : '',
    time: appointment ? appointment.time : '',
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{appointment ? 'Editar Cita' : 'Registrar Cita'}</Text>
          <Formik
            initialValues={initialValues}
            validationSchema={appointmentSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
                  placeholder="Fecha (YYYY-MM-DD)"
                  style={styles.input}
                  onChangeText={handleChange('date')}
                  onBlur={handleBlur('date')}
                  value={values.date}
                />
                {errors.date && <Text style={styles.error}>{errors.date}</Text>}

                <TextInput
                  placeholder="Hora (HH:mm)"
                  style={styles.input}
                  onChangeText={handleChange('time')}
                  onBlur={handleBlur('time')}
                  value={values.time}
                />
                {errors.time && <Text style={styles.error}>{errors.time}</Text>}

                <Button title={appointment ? 'Actualizar Cita' : 'Registrar Cita'} onPress={handleSubmit} />
                <Button title="Cancelar" onPress={onClose} color="red" />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AppointmentFormModal;