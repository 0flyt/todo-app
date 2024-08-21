import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, checkedOnOff, onEdit }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem item={item} checkedOnOff={checkedOnOff} onEdit={onEdit} />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      deadline: PropTypes.string,
    })
  ).isRequired,
  checkedOnOff: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default TaskList;
