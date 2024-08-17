import React from 'react';
import { Button } from 'react-native';

const AddTaskButton = ({ onPress }) => {
  return <Button title="Add Task" onPress={onPress} />;
};

export default AddTaskButton;
