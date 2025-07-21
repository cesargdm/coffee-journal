import React from 'react'
import { Modal as RNModal, Platform } from 'react-native'
import { WebModal } from './WebModal'

interface ModalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  animationType?: 'fade' | 'slide' | 'none'
  transparent?: boolean
}

export function Modal({ visible, onClose, children, animationType = 'fade', transparent = true }: ModalProps) {
  if (Platform.OS === 'web') {
    return (
      <WebModal 
        visible={visible} 
        onClose={onClose} 
        animationType={animationType === 'none' ? 'fade' : animationType as any}
      >
        {children}
      </WebModal>
    )
  }

  return (
    <RNModal
      visible={visible}
      onRequestClose={onClose}
      animationType={animationType}
      transparent={transparent}
    >
      {children}
    </RNModal>
  )
}