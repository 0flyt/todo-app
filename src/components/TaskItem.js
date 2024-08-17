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
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default TaskItem;
