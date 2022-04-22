import { render, screen } from '@testing-library/react'
import Button, { ButtonVariantType } from './Button'

test('renders correctly', () => {
  const label = 'test button'
  const variants: ButtonVariantType[] = ['danger', 'primary', 'secondary']

  const { rerender } = render(<Button>{label}</Button>)
  const button = screen.getByRole('button', { name: label })
  expect(button).toBeInTheDocument()

  variants.forEach((variant) => {
    rerender(<Button variant={variant}>{label}</Button>)
    expect(button.classList.contains(variant)).toBeTruthy()
  })
})
