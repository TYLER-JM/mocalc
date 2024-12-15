import React, {useCallback, useState} from "react"
import { debounce } from "../utils/debounce"
import {InputIconOptions} from "../definitions/CalculatorDefinitions.ts";

interface InputProps {
  label: string,
  inputName: string,
  placeholder: string
  defaultValue?: string,
  setState: (val: number) => void,
  formatter?: any
  icon?: InputIconOptions
}
export default function Input({
  label,
  inputName,
  placeholder,
  defaultValue,
  setState,
  formatter,
  icon
}: InputProps) {
  const [userFeedback, setUserFeedback] = useState<string>('')
  const [ariaInvalid, setAriaInvalid] = useState<boolean | undefined>(undefined)
  const [value, setValue] = useState<string>(defaultValue || '')


  const debounceStateUpdate = useCallback(debounce((val: string) => {
    if (!val) {
      setUserFeedback('')
      setAriaInvalid(undefined)
      setState(0)
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
  }, 750), [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value
    if (formatter) {
      const rawValue = formatter.removeFormatting(val)
      if (rawValue === '') {
        setValue('')
        debounceStateUpdate('0')
        return
      }
      const numericValue = parseFloat(rawValue)
      if (numericValue >= 0) {
        setValue(formatter.format(numericValue))
        debounceStateUpdate(rawValue)
      }
    } else {
      setValue(val)
      debounceStateUpdate(val)
    }
  }
  
  return (
    <label htmlFor={inputName}>

      <span>{label}</span>
      <div className="input-wrapper">
        {icon &&
          <div className={`icon-wrapper ${icon.placement}`}>
            <svg className="input-icon">
              <use xlinkHref={`img/sprite.svg#${icon.name}`}></use>
            </svg>
          </div>
        }
        <input
          className={`form-input ${icon?.placement}`}
          type="text"
          name={inputName}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={value}
          aria-invalid={ariaInvalid}
        />
      </div>
      <small className="input-feedback">{userFeedback}</small>

    </label>
  )
}