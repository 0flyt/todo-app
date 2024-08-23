import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import propTypes from 'prop-types';

const TaskItem = ({ item, checkedOnOff, onEdit, onDelete }) => {
  return (
    <Swipeable
      renderLeftActions={() => (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(item.id)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <TouchableOpacity onPress={() => checkedOnOff(item.id)}>
        <View style={styles.container}>
          <Checkbox
            status={item.completed ? 'checked' : 'unchecked'}
            onPress={() => checkedOnOff(item.id)}
            color="green"
          />
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            {item.deadline && (
              <Text style={styles.deadline}>
                Deadline: {new Date(item.deadline).toLocaleDateString()}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

TaskItem.propTypes = {
  item: propTypes.shape({
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
    deadline: propTypes.string,
  }).isRequired,
  checkedOnOff: propTypes.func.isRequired,
  onEdit: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  deadline: {
    fontSize: 12,
    marginTop: 2,
    color: 'red',
  },
  editButton: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
  },
  editButtonText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default TaskItem;
