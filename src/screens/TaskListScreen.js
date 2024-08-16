import React, { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import TaskContext from '../context/TaskContext';

const TaskListScreen = ({ navigation }) => {
  const { tasks, loading } = useContext(TaskContext);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate('EditTask', { taskId: item.id })
              }
            />
          </View>
        )}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
    </View>
  );
};

export default TaskListScreen;
