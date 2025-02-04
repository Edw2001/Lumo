import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type BirthdateInputProps = {
  birthdate: Date | null; 
  setBirthdate: (date: Date) => void;
};

const BirthdateInput: React.FC<BirthdateInputProps> = ({ birthdate, setBirthdate }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setBirthdate(selectedDate);
    }
    //if (Platform.OS !== 'ios') {
      setShowPicker(false);
    //}
  };

  const displayDate = birthdate
    ? birthdate.toLocaleDateString()
    : 'Select Birthdate';

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setShowPicker(true)}
        style={styles.input}
      >
        <Text
          style={[
            styles.dateText,
            !birthdate && styles.placeholderText 
          ]}
        >
          {displayDate}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={birthdate || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          maximumDate={new Date()}   
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
    minHeight: 40,
  },
  dateText: {
    color: '#000',
  },
  placeholderText: {
    color: '#888',
  },
});

export default BirthdateInput;
