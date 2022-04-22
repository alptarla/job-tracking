import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import * as hooks from '../../../hooks/useStoreHooks'
import { store } from '../../../store'
import { mockJobs, mockPriority } from '../../../testEnvironments'
import EditModal from './EditModal'

const mockJob = mockJobs[0]

test('should renders correctly', () => {
  render(
    <Provider store={store}>
      <EditModal
        isShow={true}
        onCancel={jest.fn()}
        onSave={jest.fn()}
        job={mockJob}
      />
    </Provider>
  )

  expect(screen.getByText(/job edit/i)).toBeInTheDocument()
  expect(screen.getByDisplayValue(mockJob.name)).toBeInTheDocument()
  expect(screen.getByLabelText(/job priority/i)).toBeInTheDocument()
})

test('should return updated job data', () => {
  const mockOnSave = jest.fn()

  const mockUseAppSelector = jest.spyOn(hooks, 'useAppSelector')
  mockUseAppSelector.mockReturnValue({
    priorities: [mockPriority],
  })

  render(
    <Provider store={store}>
      <EditModal
        isShow={true}
        onCancel={jest.fn()}
        onSave={mockOnSave}
        job={mockJob}
      />
    </Provider>
  )

  const saveButton = screen.getByRole('button', { name: /save/i })
  const prioritySelect = screen.getByLabelText(/job priority/i)

  userEvent.selectOptions(prioritySelect, mockPriority.id)
  userEvent.click(saveButton)

  expect(mockOnSave).toBeCalledWith({ ...mockJob, priority: mockPriority })
})
