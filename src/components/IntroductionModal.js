import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntroductionModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkFirstUse = async () => {
      const firstUse = await AsyncStorage.getItem('firstUse');
      if (!firstUse) {
        setVisible(true);
      }
    };
    checkFirstUse();
  }, []);

  const handleClose = async () => {
    await AsyncStorage.setItem('firstUse', 'false');
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
        >
          <Text>
            Welcome! Swipe on a task to edit it, and tap anywhere on a task to
            mark it as completed.
          </Text>
          <Button title="Got it!" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

export default IntroductionModal;
