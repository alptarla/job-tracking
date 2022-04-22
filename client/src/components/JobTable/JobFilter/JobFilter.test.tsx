import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { DEFAULT_FILTER_PRIORITY } from '../../../constants'
import { store } from '../../../store'
import JobFilter from './JobFilter'

test('should renders correctly', () => {
  render(
    <Provider store={store}>
      <JobFilter
        onSearch={jest.fn()}
        onPriorityChange={jest.fn()}
      />
    </Provider>
  )

  expect(screen.getByPlaceholderText(/job name/i)).toBeInTheDocument()
  expect(screen.getByTestId('priority-select')).toBeInTheDocument()
})

test('should return filters into cb', () => {
  const mockOnSearch = jest.fn()
  const mockOnPriorityChange = jest.fn()

  const mockFilters = {
    search: 'some search',
    priorityId: DEFAULT_FILTER_PRIORITY,
  }

  render(
    <Provider store={store}>
      <JobFilter
        onSearch={mockOnSearch}
        onPriorityChange={mockOnPriorityChange}
      />
    </Provider>
  )

  const searchInput = screen.getByPlaceholderText(/job name/i)
  const prioritySelect = screen.getByTestId('priority-select')

  userEvent.paste(searchInput, mockFilters.search)
  userEvent.selectOptions(prioritySelect, mockFilters.priorityId)

  expect(mockOnSearch).toBeCalledWith(mockFilters.search)
  expect(mockOnPriorityChange).toBeCalledWith(mockFilters.priorityId)
})
