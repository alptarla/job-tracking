import { render, screen } from '@testing-library/react'
import { mockJobs } from '../../../testEnvironments'
import RemoveModal from './RemoveModal'

const mockJob = mockJobs[0]

test('should renders correctly', () => {
  render(
    <RemoveModal
      isShow={true}
      onClose={jest.fn()}
      onRemove={jest.fn()}
      job={mockJob}
    />
  )

  expect(
    screen.getByText(/Are you sure you want to delete it?/i)
  ).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /approve/i })).toBeInTheDocument()
})
