'use client'

import { useEffect } from 'react'
import { GameMode } from '@/app/page'

interface GameScreenProps {
  mode: GameMode
  onBackToTitle: () => void
}

export default function GameScreen({ mode, onBackToTitle }: GameScreenProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBackToTitle()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBackToTitle])

  return (
    <div className="w-full h-screen bg-mario-blue flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          {mode === '1P' ? '1 PLAYER GAME' : '2 PLAYER GAME'}
        </h2>
        <p className="text-2xl text-white mb-8">ゲーム画面（準備中）</p>
        <p className="text-lg text-mario-yellow mb-4">
          ここにゲームの実装が入ります
        </p>
        <p className="text-sm text-white">
          ESCキーでタイトル画面に戻る
        </p>
      </div>
    </div>
  )
}