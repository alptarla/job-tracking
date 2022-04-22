import classNames from 'classnames'
import { nanoid } from 'nanoid'
import { InputHTMLAttributes } from 'react'
import classes from './Input.module.scss'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  containerClassName?: string
  error?: string
}

function Input({ label, containerClassName, error, ...rest }: IProps) {
  const id = rest.id || nanoid()

  return (
    <div
      className={classNames(classes.element, containerClassName, {
        [classes.error]: error,
      })}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        {...rest}
      />
      <div className={classes.errorMessage}>{error}</div>
    </div>
  )
}

export default Input
