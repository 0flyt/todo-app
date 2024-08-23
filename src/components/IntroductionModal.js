import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
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
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Welcome! Swipe left on a task for an edit button or right for a
            delete button, and tap anywhere on a task to mark it as completed.
          </Text>
          <Button title="Got it!" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default IntroductionModal;
