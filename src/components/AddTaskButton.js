import React from 'react';
import { Button } from 'react-native';
import propTypes from 'prop-types';

const AddTaskButton = ({ onPress }) => {
  return <Button title="Add Task" onPress={onPress} />;
};

AddTaskButton.propTypes = {
  onPress: propTypes.func.isRequired,
};

export default AddTaskButton;
