import { render, screen } from '@testing-library/react'
import Modal from './Modal'

test('should renders correctly', () => {
  const inner = 'Test'
  let isShow = true
  const { rerender } = render(
    <Modal
      onClose={jest.fn}
      isShow={isShow}
    >
      {inner}
    </Modal>
  )

  expect(screen.getByText(inner)).toBeInTheDocument()

  isShow = false
  rerender(
    <Modal
      onClose={jest.fn}
      isShow={isShow}
    >
      {inner}
    </Modal>
  )

  expect(screen.queryByText(inner)).toBeNull()
})
