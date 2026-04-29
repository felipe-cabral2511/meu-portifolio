import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ isDark: true, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const toggle = () => {
    setIsDark(v => {
      const next = !v
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
