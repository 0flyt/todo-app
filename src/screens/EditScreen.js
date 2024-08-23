import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDeadline, setNewDeadline] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        const taskToEdit = tasks.find((task) => task.id === taskId);
        setTask(taskToEdit);
        setNewTitle(taskToEdit.title);
        setNewDeadline(
          taskToEdit.deadline ? new Date(taskToEdit.deadline) : null
        );
      } catch (error) {
        console.error(
          'Failed to load your task. Please call support :(',
          error
        );
      }
    };

    loadTask();
  }, [taskId]);

  const handleSave = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = tasks.map((i) =>
        i.id === taskId
          ? {
              ...i,
              title: newTitle,
              deadline: newDeadline ? newDeadline.toISOString() : null,
            }
          : i
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || newDeadline;
    setShowPicker(Platform.OS === 'ios');
    setNewDeadline(currentDate);
  };

  return (
    <View style={styles.container}>
      {task ? (
        <>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder={task.title}
          />

          <Button title="Select Deadline" onPress={() => setShowPicker(true)} />

          {showPicker && (
            <DateTimePicker
              value={newDeadline || new Date()}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <Button title="Save" onPress={handleSave} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

EditScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      taskId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditScreen;
