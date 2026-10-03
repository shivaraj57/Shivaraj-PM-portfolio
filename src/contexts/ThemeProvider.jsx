import { MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ThemeContext } from './themeContextValue'
import { themes } from './themeOptions'

const storageKey = 'portfolio-theme'
const visualModeStorageKey = 'portfolio-visual-mode'
const defaultTheme = 'champagne-gold'
const visualModes = ['cinematic', 'balanced', 'performance']

const getSavedTheme = () => {
  try {
    const savedTheme = window.localStorage.getItem(storageKey)
    return themes.some((theme) => theme.id === savedTheme) ? savedTheme : defaultTheme
  } catch (error) {
    console.warn('Unable to read the saved appearance preference.', error)
    return defaultTheme
  }
}

const getSavedVisualMode = () => {
  try {
    const savedMode = window.localStorage.getItem(visualModeStorageKey)
    return visualModes.includes(savedMode) ? savedMode : 'cinematic'
  } catch (error) {
    console.warn('Unable to read the saved visual mode preference.', error)
    return 'cinematic'
  }
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getSavedTheme)
  const [visualMode, setVisualMode] = useState(getSavedVisualMode)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.classList.add('theme-morphing')
    const transitionTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-morphing')
    }, 520)

    try {
      window.localStorage.setItem(storageKey, theme)
    } catch (error) {
      console.warn('Unable to save the appearance preference.', error)
    }

    return () => window.clearTimeout(transitionTimer)
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.visualMode = visualMode

    try {
      window.localStorage.setItem(visualModeStorageKey, visualMode)
    } catch (error) {
      console.warn('Unable to save the visual mode preference.', error)
    }
  }, [visualMode])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, visualMode, setVisualMode }}>
      <MotionConfig reducedMotion={visualMode === 'performance' ? 'always' : 'user'}>
        {children}
      </MotionConfig>
    </ThemeContext.Provider>
  )
}
