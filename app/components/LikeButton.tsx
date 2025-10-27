import { Button } from "./Button"

interface LikeButtonProps {
  onClick?: () => void
}

export function LikeButton(props: LikeButtonProps) {
  return <Button text="Me gusta ❤️" onClick={props.onClick} />
}
