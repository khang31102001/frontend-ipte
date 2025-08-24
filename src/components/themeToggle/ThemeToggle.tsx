'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

import Button from '../button/Button'

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [isDarkMode, setIsDarkMode] = useState(theme === 'dark' ? true : false)

    const onToggle = () => {
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        isDarkMode ? setTheme('dark') : setTheme('light')
    }, [isDarkMode, setTheme])

    return (
        <Button
            onClick={onToggle}
            className="p-2 border-2 rounded-full border-transparent  hover:border-blue-600"
        >
            {isDarkMode ? (
                <SunIcon className="h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            ) : (
                <MoonIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            )}
        </Button>
    )
}
