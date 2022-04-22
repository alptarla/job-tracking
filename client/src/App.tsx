import { useEffect } from 'react'
import AddJob from './components/AddJob'
import Header from './components/Header'
import { useAppDispatch } from './hooks/useStoreHooks'
import { fetchPriorities } from './store/slices/jobSlice'
import { IJob } from './types'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPriorities())
  }, [dispatch])

  const handleJobCreate = (job: IJob) => {
    console.log('job', job)
  }

  return (
    <>
      <Header />
      <main className='container'>
        <AddJob onCreate={handleJobCreate} />
      </main>
    </>
  )
}

export default App
