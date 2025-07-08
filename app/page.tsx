'use client'

import { useState, useEffect } from 'react'
import TitleScreen from '@/components/TitleScreen'
import GameScreen from '@/components/GameScreen'
import OptionsScreen from '@/components/OptionsScreen'

export type GameState = 'title' | 'game' | 'options'
export type GameMode = '1P' | '2P' | null

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('title')
  const [gameMode, setGameMode] = useState<GameMode>(null)

  const handleMenuSelect = (option: string) => {
    switch (option) {
      case '1P PLAY':
        setGameMode('1P')
        setGameState('game')
        break
      case '2P PLAY':
        setGameMode('2P')
        setGameState('game')
        break
      case 'OPTIONS':
        setGameState('options')
        break
    }
  }

  const handleBackToTitle = () => {
    setGameState('title')
    setGameMode(null)
  }

  return (
    <div className="game-container">
      {gameState === 'title' && (
        <TitleScreen onMenuSelect={handleMenuSelect} />
      )}
      {gameState === 'game' && (
        <GameScreen mode={gameMode} onBackToTitle={handleBackToTitle} />
      )}
      {gameState === 'options' && (
        <OptionsScreen onBackToTitle={handleBackToTitle} />
      )}
    </div>
  )
}