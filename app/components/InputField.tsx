interface InputFieldProps {
  id: string
  label: string
  type: string
  placeholder?: string
}

export function InputField(props: InputFieldProps) {
  return (
    <>
      <label id={props.id} htmlFor={props.id} className="text-white">
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        className="rounded-md p-2 text-white"
      ></input>
    </>
  )
}
