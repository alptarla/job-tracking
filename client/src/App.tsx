import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import AddJob from './components/AddJob'
import Header from './components/Header'
import JobTable from './components/JobTable'
import { DEFAULT_FILTER_PRIORITY, JOBS_STORAGE_KEY } from './constants'
import { useAppDispatch, useAppSelector } from './hooks/useStoreHooks'
import StorageService from './services/StorageService'
import {
  fetchPriorities,
  filterJobs,
  setJob,
  setJobs,
} from './store/slices/jobSlice'
import { IJob, JobFilterType } from './types'

function App() {
  const { jobs } = useAppSelector((state) => state.job)
  const [filters, setFilters] = useState<JobFilterType>({
    search: '',
    priorityId: DEFAULT_FILTER_PRIORITY,
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPriorities())
  }, [dispatch])

  useEffect(() => {
    const storedJobs = StorageService.get<IJob[]>(JOBS_STORAGE_KEY)
    if (!storedJobs) return
    dispatch(setJobs(storedJobs))
  }, [dispatch])

  useEffect(() => {
    dispatch(filterJobs(filters))
  }, [filters, dispatch])

  const handleJobCreate = (job: Omit<IJob, 'id'>) => {
    dispatch(setJob({ ...job, id: nanoid() }))
  }

  const handleSearchChange = (search: string) => {
    setFilters({ ...filters, search })
  }

  const handlePriorityChange = (priorityId: string) => {
    setFilters({ ...filters, priorityId })
  }

  return (
    <>
      <Header />
      <main className='container'>
        <AddJob onCreate={handleJobCreate} />
        <JobTable
          data={jobs}
          onSearch={handleSearchChange}
          onPriorityChange={handlePriorityChange}
        />
      </main>
    </>
  )
}

export default App
