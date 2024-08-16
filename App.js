import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskData from './src/components/TaskData';
import TaskListScreen from './src/screens/TaskListScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <TaskData>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={TaskListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskData>
  );
}

export default App;
