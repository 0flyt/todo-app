import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import TaskItem from './TaskItem';
import propTypes from 'prop-types';

const TaskList = ({ tasks, checkedOnOff, onEdit, onDelete }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
