import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskData from './src/components/TaskData';
import TaskListScreen from './src/screens/TaskListScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { PaperProvider, Provider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <TaskData>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TaskList">
            <Stack.Screen
              name="Home"
              component={TaskListScreen}
              options={{ title: 'Tasks' }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: 'Settings' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </TaskData>
  );
}

export default App;
