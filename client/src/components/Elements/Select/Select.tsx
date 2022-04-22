import classNames from 'classnames'
import { nanoid } from 'nanoid'
import { SelectHTMLAttributes } from 'react'
import classes from './Select.module.scss'

type OptionType = { label: string; value: any }

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: OptionType[]
  containerClassNames?: string
  error?: string
}

function Select({
  label,
  options = [],
  containerClassNames,
  error,
  ...rest
}: IProps) {
  const id = rest.id || nanoid()

  return (
    <div
      className={classNames(classes.element, containerClassNames, {
        [classes.error]: error,
      })}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        defaultValue=''
        {...rest}
      >
        <option
          value=''
          disabled
        >
          {rest.placeholder}
        </option>
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
