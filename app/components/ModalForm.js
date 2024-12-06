import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import color from '../constants/color';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const availableTimes = ['Hora no seleccionada', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

const formSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  date: yup
    .string()
    .required('La fecha es requerida')
    .test('is-future-date', 'La fecha debe ser hoy o en el futuro', (value) => {
      const today = new Date();
      const inputDate = new Date(value);
      return inputDate >= today.setHours(0, 0, 0, 0); 
    }),
  time: yup
    .string()
    .required('La hora es requerida')
    .oneOf(availableTimes.slice(1), 'La hora es requerida'),
});

const ModalForm = ({ visible, onClose, initialValues, onSubmit, title }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setFieldValue('date', formattedDate);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Formik
            initialValues={{ 
              name: initialValues.name, 
              date: initialValues.date || '',
              time: initialValues.time || availableTimes[0] 
            }}
            validationSchema={formSchema}
            onSubmit={onSubmit}
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

                <View style={styles.dateContainer}>
                  <TextInput
                    style={styles.inputDate}
                    value={values.date || ''}
                    placeholder="Seleccionar fecha"
                    editable={false}
                  />
                  <Button
                    title="Calendario"
                    onPress={() => setShowDatePicker(true)}
                  />
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date(values.date || Date.now())}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      handleDateChange(event, date, setFieldValue);
                    }}
                    minimumDate={new Date()}
                  />
                )}
                {errors.date && <Text style={styles.error}>{errors.date}</Text>}

                <Picker
                  selectedValue={values.time}
                  onValueChange={(itemValue) => setFieldValue('time', itemValue)}
                >
                  {availableTimes.map((time, index) => (
                    <Picker.Item key={index} label={time} value={time} />
                  ))}
                </Picker>
                {errors.time && <Text style={styles.error}>{errors.time}</Text>}

                <View style={styles.buttonContainer}>
                  <Button title="Cancelar" onPress={handleClose} color={color.SECONDARY} />
                  <Button title="Enviar" onPress={handleSubmit} color={color.PRIMARY} />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default ModalForm;
