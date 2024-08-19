import { useEffect, useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskList from '../components/TaskList';
import AddTaskButton from '../components/AddTaskButton';
import TaskInput from '../components/TaskInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, IconButton } from 'react-native-paper';

const TaskListScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deadline, setDeadline] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="cog-outline"
          size={24}
          onPress={() => navigation.navigate('Settings')}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('tasks');
        if (storedData) {
          setTasks(JSON.parse(storedData));
        } else {
          const response = await fetch(
            'https://raw.githubusercontent.com/0flyt/todo-app/json-data/tasks.json'
          );
          const data = await response.json();
          setTasks(data);
          await AsyncStorage.setItem('tasks', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Failed loading data', error);
      } finally {
        setLoading(false);
      }
    };
    getTaskData();
  }, []);

  const makeId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const addTask = (task) => {
    if (task.trim()) {
      const newTask = {
        id: makeId(),
        title: task,
        completed: false,
        createdAt: new Date().toISOString(),
        deadline: deadline ? deadline.toISOString() : null,
      };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTask('');
      setDeadline(null);
    }
  };

  const checkedOnOff = (taskId) => {
    const newTasks = tasks.map((i) =>
      i.id === taskId ? { ...i, completed: !i.completed } : i
    );
    setTasks(newTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => a.completed - b.completed);
  };

  return (
    <View styles={styles.container}>
      <TaskInput
        value={task}
        onChangeText={setTask}
        deadline={deadline}
        setDeadline={setDeadline}
      />
      <AddTaskButton onPress={() => addTask(task)} />
      <TaskList tasks={sortTasks(tasks)} checkedOnOff={checkedOnOff} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default TaskListScreen;
