'use client'

import { useState, useEffect } from 'react'
import DemoBackground from './DemoBackground'

interface TitleScreenProps {
  onMenuSelect: (option: string) => void
}

export default function TitleScreen({ onMenuSelect }: TitleScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const menuOptions = ['1P PLAY', '2P PLAY', 'OPTIONS']

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + menuOptions.length) % menuOptions.length)
          break
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % menuOptions.length)
          break
        case 'Enter':
          event.preventDefault()
          onMenuSelect(menuOptions[selectedIndex])
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, onMenuSelect])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <DemoBackground />
      
      {/* Title and Menu Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-float">
            MARIO-WEB
          </h1>
        </div>

        {/* Menu */}
        <div className="bg-black bg-opacity-80 rounded-lg p-8 border-4 border-mario-yellow">
          <div className="space-y-4">
            {menuOptions.map((option, index) => (
              <div
                key={option}
                className={`text-2xl font-bold px-6 py-3 rounded transition-all duration-200 ${
                  index === selectedIndex
                    ? 'bg-mario-yellow text-black animate-pulse-slow'
                    : 'text-white hover:text-mario-yellow'
                }`}
              >
                {index === selectedIndex && (
                  <span className="mr-4 text-mario-red">▶</span>
                )}
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-white text-lg">
          <p>↑↓ キーで選択、Enter で決定</p>
        </div>
      </div>
    </div>
  )
}