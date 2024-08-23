import React from 'react';
import {
  View,
  Button,
  ActionSheetIOS,
  Platform,
  Share,
  StyleSheet,
} from 'react-native';

const iosActionSheet = ({ task }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `I have to prioritate this: ${task.title}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared on other platform: ${result.activityType}`);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Canceled');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const showActionSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Share Task', 'Cancel'],
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            onShare();
          }
        }
      );
    } else {
      onShare();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Share" onPress={showActionSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default iosActionSheet;
