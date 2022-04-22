import classNames from 'classnames'
import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import classes from './Button.module.scss'

export type ButtonVariantType = 'primary' | 'secondary' | 'danger'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement
  children?: ReactNode
  variant?: ButtonVariantType
}

function Button({ icon, children, variant = 'primary', ...rest }: IProps) {
  const buttonClassNames = classNames(
    classes.button,
    classes[variant],
    rest.className
  )

  return (
    <button
      {...rest}
      className={buttonClassNames}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

export default Button
