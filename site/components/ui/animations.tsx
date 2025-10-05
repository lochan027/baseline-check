"use client"

import { motion } from "framer-motion"

export const FadeIn = ({ children, delay = 0, duration = 0.6, ...props }: {
  children: React.ReactNode
  delay?: number
  duration?: number
  [key: string]: any
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const ScaleIn = ({ children, delay = 0, duration = 0.6, ...props }: {
  children: React.ReactNode
  delay?: number
  duration?: number
  [key: string]: any
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const SlideIn = ({ children, direction = "up", delay = 0, duration = 0.6, ...props }: {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  [key: string]: any
}) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: -20 },
    right: { x: 20 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const Stagger = ({ children, staggerDelay = 0.1, ...props }: {
  children: React.ReactNode
  staggerDelay?: number
  [key: string]: any
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}