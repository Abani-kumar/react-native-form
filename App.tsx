import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const relations = ['Friend', 'Family', 'Colleague', 'Other'];
const professions = ['Doctor', 'Engineer', 'Artist', 'Teacher', 'Other'];

type FormState = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date | null;
  bloodGroup: string;
  relation: string;
  profession: string;
  ethnicity: string;
  religion: string;
  nationality: string;
};

type Errors = {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
};

const App: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    gender: '',
    dob: null,
    bloodGroup: '',
    relation: '',
    profession: '',
    ethnicity: '',
    religion: '',
    nationality: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name: keyof FormState, value: any) => {
    setForm({...form, [name]: value});
  };

  const validateFields = (): boolean => {
    let newErrors: Errors = {};
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      // Submit form
      console.log('Form submitted', form);
    }
  };

  const areCompulsoryFieldsCompleted = (): boolean => {
    return !!(form.firstName && form.lastName && form.gender && form.dob);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={[styles.input,  styles.errorBorder]}
        placeholder="First Name"
        value={form.firstName}
        onChangeText={text => handleInputChange('firstName', text)}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

      <TextInput
        style={[styles.input, styles.errorBorder]}
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={text => handleInputChange('lastName', text)}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

      <TextInput
        style={[styles.input,  styles.errorBorder]}
        placeholder="Gender"
        value={form.gender}
        onChangeText={text => handleInputChange('gender', text)}
      />
      {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>
          {form.dob ? form.dob.toDateString() : 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={form.dob || new Date()}
          mode="date"
          display="default"
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            setShowDatePicker(false);
            if (selectedDate) handleInputChange('dob', selectedDate);
          }}
        />
      )}
      {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

      {areCompulsoryFieldsCompleted() && (
        <>
          <Text style={styles.label}>Blood Group:</Text>
          <View style={styles.tapSelectContainer}>
            {bloodGroups.map(group => (
              <Button
                key={group}
                title={group}
                onPress={() => handleInputChange('bloodGroup', group)}
              />
            ))}
          </View>

          <Text style={styles.label}>Relation:</Text>
          <View style={styles.tapSelectContainer}>
            {relations.map(relation => (
              <Button
                key={relation}
                title={relation}
                onPress={() => handleInputChange('relation', relation)}
              />
            ))}
          </View>

          <Text style={styles.label}>Profession:</Text>
          <Picker
            selectedValue={form.profession}
            onValueChange={value => handleInputChange('profession', value)}>
            {professions.map(profession => (
              <Picker.Item
                key={profession}
                label={profession}
                value={profession}
              />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Ethnicity"
            value={form.ethnicity}
            onChangeText={text => handleInputChange('ethnicity', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Religion"
            value={form.religion}
            onChangeText={text => handleInputChange('religion', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Nationality"
            value={form.nationality}
            onChangeText={text => handleInputChange('nationality', text)}
          />
        </>
      )}

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
  label: {
    marginBottom: 10,
  },
  tapSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
  datePickerButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  datePickerText: {
    textAlign: 'center',
  },
});

export default App;
