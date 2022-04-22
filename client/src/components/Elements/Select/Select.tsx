import classNames from 'classnames'
import { nanoid } from 'nanoid'
import { SelectHTMLAttributes } from 'react'
import classes from './Select.module.scss'

type OptionType = { label: string; value: any }

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: OptionType[]
  containerClassName?: string
  error?: string
}

function Select({
  label,
  options = [],
  containerClassName,
  error,
  ...rest
}: IProps) {
  const id = rest.id || nanoid()

  return (
    <div
      className={classNames(classes.element, containerClassName, {
        [classes.error]: error,
      })}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        {...rest}
      >
        {rest.placeholder && (
          <option
            value=''
            disabled
          >
            {rest.placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className={classes.errorMessage}>{error}</div>
    </div>
  )
}

export default Select
