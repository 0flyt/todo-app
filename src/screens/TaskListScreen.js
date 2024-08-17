import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskList from '../components/TaskList';
import AddTaskButton from '../components/AddTaskButton';
import TaskInput from '../components/TaskInput';

const TaskListScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: task, completed: false },
      ]);
      setTask('');
    }
  };

  const checkedOnOff = (taskId) => {
    const newTasks = tasks.map((i) =>
      i.id === taskId ? { ...i, completed: !i.completed } : i
    );
    setTasks(newTasks);
  };

  return (
    <View>
      <TaskInput value={task} onChangeText={setTask} />
      <AddTaskButton onPress={addTask} />
      <TaskList tasks={tasks} checkedOnOff={checkedOnOff} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default TaskListScreen;
