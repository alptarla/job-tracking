import { render, screen } from '@testing-library/react'
import { IJob } from '../../types'
import JobTable from './JobTable'

const data: IJob[] = [
  {
    id: 'j-1',
    name: 'Adaylarla ilgili teknik bir odev hazirlamam gerekiyor',
    priority: {
      id: 'p-1',
      label: 'Ungent',
      color: '#B20600',
    },
  },
  {
    id: 'j-2',
    name: 'Yapilan islerle ilgili activity kayitlari olsuturmam gerekiyor',
    priority: {
      id: 'p-1',
      label: 'Regular',
      color: '#f0ad4e',
    },
  },
  {
    id: 'j-3',
    name: 'Teknik tasklari planlayacagim',
    priority: {
      id: 'p-1',
      label: 'Important',
      color: '#d9534f',
    },
  },
]

test('should renders correctly', () => {
  render(<JobTable data={data} />)

  data.forEach((item) => {
    expect(screen.getByText(item.name)).toBeInTheDocument()
    expect(screen.getByText(item.priority.label)).toBeInTheDocument()
    expect(screen.getAllByTestId('remove-button').length).toBe(data.length)
    expect(screen.getAllByTestId('edit-button').length).toBe(data.length)
  })
})
