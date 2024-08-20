import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';

const TaskItem = ({ item, checkedOnOff, onEdit }) => {
  return (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.editButton}>
          <Text style={styles.editButtonText} onPress={() => onEdit(item.id)}>
            Edit
          </Text>
        </View>
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
});

export default TaskItem;
