'use client'

import { useEffect, useState } from 'react'

interface OptionsScreenProps {
  onBackToTitle: () => void
}

interface KeyBinding {
  up: string
  right: string
  down: string
  left: string
  jump: string
  dash: string
  start: string
}

export default function OptionsScreen({ onBackToTitle }: OptionsScreenProps) {
  const [keyBindings, setKeyBindings] = useState<KeyBinding>({
    up: 'e',
    right: 'f',
    down: 'd',
    left: 's',
    jump: 'k',
    dash: 'j',
    start: 'Enter',
  })

  const [selectedAction, setSelectedAction] = useState<keyof KeyBinding | null>(null)
  const [isWaitingForKey, setIsWaitingForKey] = useState(false)

  const actionLabels = {
    up: '上',
    right: '右',
    down: '下',
    left: '左',
    jump: 'ジャンプ',
    dash: 'ダッシュ',
    start: 'スタート',
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isWaitingForKey && selectedAction) {
        event.preventDefault()
        setKeyBindings(prev => ({
          ...prev,
          [selectedAction]: event.key
        }))
        setIsWaitingForKey(false)
        setSelectedAction(null)
        return
      }

      if (event.key === 'Escape') {
        if (isWaitingForKey) {
          setIsWaitingForKey(false)
          setSelectedAction(null)
        } else {
          onBackToTitle()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isWaitingForKey, selectedAction, onBackToTitle])

  const handleKeyBindingClick = (action: keyof KeyBinding) => {
    setSelectedAction(action)
    setIsWaitingForKey(true)
  }

  return (
    <div className="w-full h-screen bg-mario-blue flex flex-col items-center justify-center">
      <div className="bg-black bg-opacity-80 rounded-lg p-8 border-4 border-mario-yellow max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          設定
        </h2>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-mario-yellow mb-4">
            キーコンフィグ
          </h3>

          {Object.entries(keyBindings).map(([action, key]) => (
            <div
              key={action}
              className={`flex justify-between items-center p-3 rounded cursor-pointer transition-all duration-200 ${
                selectedAction === action && isWaitingForKey
                  ? 'bg-mario-red text-white animate-pulse-slow'
                  : 'bg-mario-yellow text-black hover:bg-yellow-400'
              }`}
              onClick={() => handleKeyBindingClick(action as keyof KeyBinding)}
            >
              <span className="font-bold">
                {actionLabels[action as keyof KeyBinding]}
              </span>
              <span className="font-mono bg-white px-2 py-1 rounded text-black">
                {selectedAction === action && isWaitingForKey ? '待機中...' : key}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white text-sm mb-2">
            {isWaitingForKey
              ? 'キーを押してください（ESCでキャンセル）'
              : 'キーをクリックして変更、ESCでタイトルに戻る'}
          </p>
        </div>
      </div>
    </div>
  )
}