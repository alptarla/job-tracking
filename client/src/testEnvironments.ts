import { IJob } from './types'

export const mockPriority = {
  id: 'p-3',
  label: 'Regular',
  color: '#f0ad4e',
}

export const mockJobs: IJob[] = [
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
