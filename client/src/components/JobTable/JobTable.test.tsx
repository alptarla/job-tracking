import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { mockJobs } from '../../testEnvironments'
import JobTable from './JobTable'

test('should renders correctly', () => {
  render(
    <Provider store={store}>
      <JobTable data={mockJobs} />
    </Provider>
  )

  mockJobs.forEach((item) => {
    expect(screen.getByText(item.name)).toBeInTheDocument()
    expect(screen.getByText(item.priority.label)).toBeInTheDocument()
    expect(screen.getAllByTestId('remove-button').length).toBe(mockJobs.length)
    expect(screen.getAllByTestId('edit-button').length).toBe(mockJobs.length)
  })
})

test('should open edit modal', () => {
  render(
    <Provider store={store}>
      <JobTable data={mockJobs} />
    </Provider>
  )

  const editButton = screen.getAllByTestId('edit-button')[0]
  userEvent.click(editButton)

  expect(screen.getByText(/job edit/i)).toBeInTheDocument()
})
