import { useState } from "react"
import { Button } from "./Button"

interface LikeButtonProps {
  onClick?: () => void
}

export function LikeButton(props: LikeButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    props.onClick?.()

    setTimeout(() => {
      setIsAnimating(false)
    }, 200)
  }

  return (
    <Button
      classname={`w-16 transition-transform ${isAnimating ? "scale-110" : ""}`}
      text="❤️"
      onClick={handleClick}
    />
  )
}
