import React, { useState } from 'react';
import {
  View,
  Pressable,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type GenderInputProps = {
  gender: string;               
  setGender: (val: string) => void;
};

const GenderInput: React.FC<GenderInputProps> = ({ gender, setGender }) => {
  const [showModal, setShowModal] = useState(false);

  const onSelectGender = (value: string) => {
    setGender(value);
  };

  return (
    <View style={styles.container}>
      {/* touch then Model */}
      <Pressable onPress={() => setShowModal(true)} style={styles.input}>
        <Text style={[styles.inputText, !gender && styles.placeholder]}>
          {gender || 'Select Gender'}
        </Text>
      </Pressable>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          {/* 点击半透明背景也能关 */}
          <Pressable style={styles.backdrop} onPress={() => setShowModal(false)} />
          
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => onSelectGender(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem} 
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Non-Binary" value="Non-binary" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.doneButton}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GenderInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    minHeight: 40,
  },
  inputText: {
    color: '#000',
  },
  placeholder: {
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0,0,0,0.2)', 
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 200,
    backgroundColor: '#fff',
  },
  pickerItem: {
    color: '#000',
    fontSize: 16,
  },
  doneButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
