import React, { useCallback, useState } from "react"
import { debounce } from "../utils/debounce"

interface InputProps {
  label: string,
  inputName: string,
  placeholder: string
  defaultValue?: string,
  setState: (val: number) => void
}
export default function Input({
  label,
  inputName,
  placeholder,
  defaultValue,
  setState
}: InputProps) {
  const [userFeedback, setUserFeedback] = useState<string>('')
  const [ariaInvalid, setAriaInvalid] = useState<boolean | undefined>(undefined)
  const [value, setValue] = useState<string>(defaultValue || '')

  const debounceStateUpdate = useCallback(debounce((val: string) => {
    if (!val) {
      setUserFeedback('')
      setAriaInvalid(undefined)
      return
    }

    const num = parseFloat(val)
    if (isNaN(num)) {
      setUserFeedback('Please enter a valid number')
      setAriaInvalid(true)
      return
    }

    setState(num)
    setUserFeedback('')
    setAriaInvalid(false)
  }, 400), [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value
    setValue(val)
    debounceStateUpdate(val)
  }
  
  return (
    <label htmlFor={inputName}>
      <span>{label}</span>
      <input
        className="form-input"
        type="text"
        name={inputName}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={value}
        aria-invalid={ariaInvalid}
      />
      <small className="input-feedback">{userFeedback}</small>
    </label>
  )
}