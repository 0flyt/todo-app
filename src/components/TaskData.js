import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskContext from '../context/TaskContext';

const TaskData = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');

        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        } else {
          const response = await fetch(
            'https://raw.githubusercontent.com/0flyt/todo-app/b545e95f426647de779d3bc01cdd6b82fded72cd/tasks.json'
          );
          const data = await response.json();

          await AsyncStorage.setItem('tasks', JSON.stringify(data));

          setTasks(data);
        }
      } catch (error) {
        console.error('Error loading tasks', error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, saveTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskData;
