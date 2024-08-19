import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, checkedOnOff }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem item={item} checkedOnOff={checkedOnOff} />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default TaskList;
