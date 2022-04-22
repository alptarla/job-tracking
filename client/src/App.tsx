import { nanoid } from 'nanoid'
import { useEffect, useMemo, useState } from 'react'
import AddJob from './components/AddJob'
import Header from './components/Header'
import JobTable from './components/JobTable'
import { DEFAULT_FILTER_PRIORITY, JOBS_STORAGE_KEY } from './constants'
import { useAppDispatch, useAppSelector } from './hooks/useStoreHooks'
import StorageService from './services/StorageService'
import { fetchPriorities, setJob, setJobs } from './store/slices/jobSlice'
import { IJob } from './types'

function App() {
  const { jobs } = useAppSelector((state) => state.job)
  const [filters, setFilters] = useState({
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

  const jobsTableData = useMemo(() => {
    let data: IJob[] = []

    if (filters.priorityId === DEFAULT_FILTER_PRIORITY) {
      data = jobs
    } else {
      data = jobs.filter((job) => job.priority.id === filters.priorityId)
    }

    const regex = new RegExp(filters.search, 'i')
    data = data.filter((job) => job.name.match(regex))

    return data
  }, [filters, jobs])

  const handleJobCreate = (job: Omit<IJob, 'id'>) => {
    dispatch(setJob({ ...job, id: nanoid() }))
  }

  const handleSearch = (search: string) => {
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
          data={jobsTableData}
          onSearch={handleSearch}
          onPriorityChange={handlePriorityChange}
        />
      </main>
    </>
  )
}

export default App
