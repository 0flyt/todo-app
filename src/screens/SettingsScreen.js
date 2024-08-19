import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Button,
  List,
  Dialog,
  Portal,
  Paragraph,
  useTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const showConfirmDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Storage data deleted!');
    } catch (e) {
      Alert.alert('Something went wrong! Storage data not deleted.');
    }
    hideDialog();
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Clear all data"
          description="Removes all tasks"
          left={() => (
            <List.Icon icon="trash-can-outline" color={theme.colors.primary} />
          )}
          onPress={showConfirmDialog}
        />
      </List.Section>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to delete all data? This can not be
              restored.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Abort</Button>
            <Button onPress={clearStorage}>DELETE</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SettingsScreen;
