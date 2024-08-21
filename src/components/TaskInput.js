import React, { useState } from 'react';
import { StyleSheet, View, Button, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

const TaskInput = ({ value, onChangeText, deadline, setDeadline }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowPicker(Platform.OS === 'ios');
    setDeadline(currentDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Enter a task"
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        style={styles.input}
      />

      <Button onPress={() => setShowPicker(true)} title="Set Deadline" />

      {showPicker && (
        <DateTimePicker
          value={deadline || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

TaskInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  deadline: PropTypes.instanceOf(Date),
  setDeadline: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default TaskInput;
