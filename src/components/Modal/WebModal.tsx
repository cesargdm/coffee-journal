import React, { useEffect } from 'react'
import { Pressable, View, Platform } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

interface WebModalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  animationType?: 'fade' | 'slide' | 'spring'
}

export function WebModal({ visible, onClose, children, animationType = 'spring' }: WebModalProps) {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.9)
  const translateY = useSharedValue(50)

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 })
      
      if (animationType === 'spring') {
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 150,
        })
      } else if (animationType === 'slide') {
        translateY.value = withTiming(0, { duration: 300 })
      } else {
        scale.value = withTiming(1, { duration: 200 })
      }
    } else {
      opacity.value = withTiming(0, { duration: 200 })
      scale.value = withTiming(0.9, { duration: 200 })
      translateY.value = withTiming(50, { duration: 200 })
    }
  }, [visible, animationType])

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: visible ? 'auto' : 'none',
  }))

  const contentStyle = useAnimatedStyle(() => {
    if (animationType === 'slide') {
      return {
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
      }
    } else if (animationType === 'spring') {
      return {
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
      }
    } else {
      return {
        opacity: opacity.value,
      }
    }
  })

  if (!visible && opacity.value === 0) {
    return null
  }

  return (
    <Animated.View style={[styles.backdrop, backdropStyle]}>
      <Pressable style={styles.backdropPressable} onPress={onClose} />
      <Animated.View style={[styles.content, contentStyle]}>
        {children}
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create((theme) => ({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  backdropPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    maxWidth: '90%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
}))