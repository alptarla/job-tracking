/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import * as hooks from '../../hooks/useStoreHooks'
import { store } from '../../store'
import AddJob from './AddJob'

test('renders correctly', () => {
  render(
    <Provider store={store}>
      <AddJob onCreate={jest.fn()} />
    </Provider>
  )

  expect(screen.getByText(/create new job/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/job name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/job priority/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument()
})

test('should callback return the new job data', async () => {
  const mockPriority = {
    id: 'p-3',
    label: 'Regular',
    color: '#f0ad4e',
  }
  const mockJobName = 'some job'

  const mockOnCreate = jest.fn()

  const mockUseAppSelector = jest.spyOn(hooks, 'useAppSelector')
  mockUseAppSelector.mockReturnValue({
    priorities: [mockPriority],
  })

  render(
    <Provider store={store}>
      <AddJob onCreate={mockOnCreate} />
    </Provider>
  )

  const createButton = screen.getByRole('button', { name: /create/i })
  const jobName = screen.getByLabelText(/job name/i)
  const priorities = screen.getByLabelText(/job priority/i)

  await act(() => userEvent.paste(jobName, mockJobName))
  await act(() => userEvent.selectOptions(priorities, mockPriority.id))
  await act(() => userEvent.click(createButton))

  expect(mockOnCreate).toBeCalled()
  expect(mockOnCreate).toBeCalledWith({
    name: mockJobName,
    priority: mockPriority,
  })
})
