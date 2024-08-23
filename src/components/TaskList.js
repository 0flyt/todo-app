import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import propTypes from 'prop-types';

const TaskList = ({ tasks, checkedOnOff, onEdit, onDelete }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem
          item={item}
          checkedOnOff={checkedOnOff}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

TaskList.propTypes = {
  tasks: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      completed: propTypes.bool.isRequired,
      deadline: propTypes.string,
    })
  ).isRequired,
  checkedOnOff: propTypes.func.isRequired,
  onEdit: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default TaskList;
