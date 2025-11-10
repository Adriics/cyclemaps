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
      classname={`w-16 transition-transform ${
        isAnimating ? "scale-110" : ""
      } md:w-25 md:h-12 text-2xl`}
      text="❤️"
      onClick={handleClick}
    />
  )
}
