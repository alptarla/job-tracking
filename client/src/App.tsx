import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import AddJob from './components/AddJob'
import Header from './components/Header'
import JobTable from './components/JobTable'
import { JOBS_STORAGE_KEY } from './constants'
import { useAppDispatch, useAppSelector } from './hooks/useStoreHooks'
import StorageService from './services/StorageService'
import { fetchPriorities, setJob, setJobs } from './store/slices/jobSlice'
import { IJob } from './types'

function App() {
  const { jobs } = useAppSelector((state) => state.job)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPriorities())
  }, [dispatch])

  useEffect(() => {
    const storedJobs = StorageService.get<IJob[]>(JOBS_STORAGE_KEY)
    if (!storedJobs) return
    dispatch(setJobs(storedJobs))
  }, [dispatch])

  const handleJobCreate = (job: Omit<IJob, 'id'>) => {
    dispatch(setJob({ ...job, id: nanoid() }))
  }

  return (
    <>
      <Header />
      <main className='container'>
        <AddJob onCreate={handleJobCreate} />
        <JobTable data={jobs} />
      </main>
    </>
  )
}

export default App
