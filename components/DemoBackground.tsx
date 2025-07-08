'use client'

import { useEffect, useState } from 'react'

interface CloudProps {
  x: number
  y: number
  size: number
}

interface BlockProps {
  x: number
  y: number
  type: 'brick' | 'question' | 'pipe'
}

interface CharacterProps {
  x: number
  y: number
  direction: 'left' | 'right'
  isJumping: boolean
}

export default function DemoBackground() {
  const [clouds, setClouds] = useState<CloudProps[]>([])
  const [blocks, setBlocks] = useState<BlockProps[]>([])
  const [character, setCharacter] = useState<CharacterProps>({
    x: 50,
    y: 400,
    direction: 'right',
    isJumping: false,
  })

  useEffect(() => {
    // Initialize clouds
    const initialClouds: CloudProps[] = [
      { x: 100, y: 150, size: 60 },
      { x: 400, y: 100, size: 80 },
      { x: 700, y: 180, size: 70 },
      { x: 1000, y: 120, size: 90 },
    ]
    setClouds(initialClouds)

    // Initialize blocks
    const initialBlocks: BlockProps[] = [
      { x: 200, y: 400, type: 'brick' },
      { x: 240, y: 400, type: 'brick' },
      { x: 280, y: 400, type: 'question' },
      { x: 320, y: 400, type: 'brick' },
      { x: 500, y: 400, type: 'brick' },
      { x: 540, y: 400, type: 'brick' },
      { x: 580, y: 350, type: 'brick' },
      { x: 620, y: 350, type: 'brick' },
      { x: 800, y: 400, type: 'pipe' },
    ]
    setBlocks(initialBlocks)
  }, [])

  useEffect(() => {
    const moveCharacter = () => {
      setCharacter((prev) => {
        let newX = prev.x
        let newY = prev.y
        let newDirection = prev.direction
        let newIsJumping = prev.isJumping

        // Move character
        if (prev.direction === 'right') {
          newX += 2
          if (newX > window.innerWidth - 50) {
            newDirection = 'left'
          }
        } else {
          newX -= 2
          if (newX < 0) {
            newDirection = 'right'
          }
        }

        // Random jump
        if (Math.random() < 0.01) {
          newIsJumping = true
          newY = 350
        } else if (prev.isJumping) {
          newIsJumping = false
          newY = 400
        }

        return {
          x: newX,
          y: newY,
          direction: newDirection,
          isJumping: newIsJumping,
        }
      })
    }

    const interval = setInterval(moveCharacter, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 game-container">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-mario-blue to-mario-blue"></div>

      {/* Clouds */}
      {clouds.map((cloud, index) => (
        <div
          key={index}
          className="absolute cloud-pattern"
          style={{
            left: `${cloud.x}px`,
            top: `${cloud.y}px`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
          }}
        />
      ))}

      {/* Ground */}
      <div className="absolute bottom-0 w-full h-32 bg-mario-brown"></div>

      {/* Blocks */}
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`absolute w-10 h-10 ${
            block.type === 'brick'
              ? 'bg-mario-orange brick-pattern'
              : block.type === 'question'
              ? 'bg-mario-yellow border-2 border-mario-orange'
              : 'bg-mario-green'
          }`}
          style={{
            left: `${block.x}px`,
            bottom: `${window.innerHeight - block.y - 40}px`,
          }}
        >
          {block.type === 'question' && (
            <div className="flex items-center justify-center h-full text-mario-orange font-bold text-xl">
              ?
            </div>
          )}
          {block.type === 'pipe' && (
            <div className="w-full h-20 bg-mario-green border-2 border-green-700"></div>
          )}
        </div>
      ))}

      {/* Character */}
      <div
        className="absolute w-8 h-8 bg-mario-red rounded-sm transition-all duration-100 z-10"
        style={{
          left: `${character.x}px`,
          bottom: `${window.innerHeight - character.y - 32}px`,
        }}
      >
        {/* Character body */}
        <div className="w-full h-full bg-mario-red rounded-sm relative">
          {/* Cap */}
          <div className="absolute -top-1 left-1 w-6 h-2 bg-mario-red rounded-t-full"></div>
          {/* Face */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-200 rounded-full"></div>
          {/* Shirt */}
          <div className="absolute top-3 left-0 w-full h-3 bg-mario-blue"></div>
          {/* Legs */}
          <div className="absolute bottom-0 left-1 w-2 h-2 bg-mario-brown"></div>
          <div className="absolute bottom-0 right-1 w-2 h-2 bg-mario-brown"></div>
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-8 bg-mario-yellow rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}