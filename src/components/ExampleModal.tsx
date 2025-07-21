import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { Modal } from './Modal'

export function ExampleModal() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <TouchableOpacity 
        style={styles.openButton} 
        onPress={() => setVisible(true)}
      >
        <FontAwesome6 name="plus" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      <Modal visible={visible} onClose={() => setVisible(false)}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Coffee Details</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <FontAwesome6 name="xmark" size={24} color="#666666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalText}>
            This is an example of the reanimated modal implementation for web.
            It supports fade, slide, and spring animations.
          </Text>
          
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create((theme) => ({
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalContent: {
    width: 300,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  modalText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  closeButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
}))