import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const EditScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        const taskToEdit = tasks.find((task) => task.id === taskId);
        setTask(taskToEdit);
        setNewTitle(taskToEdit.title);
      } catch (error) {
        console.error('Failed to load task for editing', error);
      }
    };

    loadTask();
  }, [taskId]);

  const handleSave = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, title: newTitle } : t
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  return (
    <View style={styles.container}>
      {task ? (
        <>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
          />
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
