import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import AddJob from './components/AddJob'
import Header from './components/Header'
import JobTable from './components/JobTable'
import { useAppDispatch } from './hooks/useStoreHooks'
import { fetchPriorities } from './store/slices/jobSlice'
import { IJob } from './types'

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
      id: 'p-3',
      label: 'Regular',
      color: '#f0ad4e',
    },
  },
  {
    id: 'j-3',
    name: 'Teknik tasklari planlayacagim',
    priority: {
      id: 'p-2',
      label: 'Important',
      color: '#d9534f',
    },
  },
]

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPriorities())
  }, [dispatch])

  const handleJobCreate = (job: Omit<IJob, 'id'>) => {
    console.log('job', { ...job, id: nanoid() })
  }

  return (
    <>
      <Header />
      <main className='container'>
        <AddJob onCreate={handleJobCreate} />
        <JobTable data={data} />
      </main>
    </>
  )
}

export default App
