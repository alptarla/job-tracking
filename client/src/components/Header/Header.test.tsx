import { render, screen } from '@testing-library/react'
import Header from './Header'

test('should renders correctly', () => {
  render(<Header />)
  expect(screen.getByText(/Job Tracking App/i)).toBeInTheDocument()
})
