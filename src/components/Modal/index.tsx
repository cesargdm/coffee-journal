import React from 'react'
import { Modal as RNModal, Platform } from 'react-native'

interface ModalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  animationType?: 'fade' | 'slide' | 'none'
  transparent?: boolean
}

export function Modal({ visible, onClose, children, animationType = 'fade', transparent = true }: ModalProps) {
  // For now, use React Native's modal on all platforms
  // WebModal can be imported dynamically when needed to avoid SSR issues
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