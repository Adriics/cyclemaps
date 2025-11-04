interface InputFieldProps {
  id: string
  label: string
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputField(props: InputFieldProps) {
  return (
    <>
      <label
        id={props.id}
        htmlFor={props.id}
        className="text-white text-[15px] md:text-[17px]"
      >
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required
        className="rounded-md text-[15px] md:text-[17px] p-2 border border-white text-white bg-transparent"
      />
    </>
  )
}
