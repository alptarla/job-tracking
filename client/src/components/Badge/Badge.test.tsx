import { render, screen } from '@testing-library/react'
import Badge from './Badge'

test('renders correctly', () => {
  const label = 'Ungent'
  render(<Badge label={label} />)
  expect(screen.getByText(label)).toBeInTheDocument()
})
