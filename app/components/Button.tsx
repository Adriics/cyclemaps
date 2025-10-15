interface ButtonProps {
  onClick?: () => void
  text: string
}

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className="cursor-pointer bg-[var(--primary)] text-[15px] md:text-[17px] w-auto h-8 rounded-sm"
    >
      {props.text}
    </button>
  )
}
