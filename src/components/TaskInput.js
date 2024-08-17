import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const TaskInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        label="New Task"
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        style={StyleSheet.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default TaskInput;
