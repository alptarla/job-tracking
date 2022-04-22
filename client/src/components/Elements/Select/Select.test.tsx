import { render, screen } from '@testing-library/react'
import Select from './Select'

test('renders correctly', () => {
  const label = 'test'
  const options = [{ label: 'test option label', value: 'test value' }]

  render(
    <Select
      label={label}
      options={options}
      placeholder='Choose'
    />
  )

  options.forEach((option) => {
    expect(screen.getByText(option.label)).toBeInTheDocument()
  })
  expect(screen.getByLabelText(label)).toBeInTheDocument()
})

test('display error message if passed', () => {
  const msg = 'error'
  render(<Select error={msg} />)
  expect(screen.getByText(msg)).toBeInTheDocument()
})
