import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

const TaskItem = ({ item, checkedOnOff }) => {
  return (
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
});

export default TaskItem;
