import { render, screen } from '@testing-library/react'
import Input from './Input'

test('renders correctly', () => {
  const label = 'test'
  render(<Input label={label} />)
  expect(screen.getByLabelText(label)).toBeInTheDocument()
})

test('display error message if passed', () => {
  const msg = 'error'
  render(<Input error={msg} />)
  expect(screen.getByText(msg)).toBeInTheDocument()
})
