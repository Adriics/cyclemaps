interface ButtonProps {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  text: string
  classname?: string
}

export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={`bg-[#63d471] hover:bg-green-600 text-black font-semibold px-4 rounded-lg cursor-pointer hover:rounded-xl transition-all ${props.classname}`}
    >
      {props.text}
    </button>
  )
}
