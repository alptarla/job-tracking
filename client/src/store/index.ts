import { configureStore } from '@reduxjs/toolkit'
import { JOBS_ORDER } from '../constants'
import reorderJobsByPriority from '../helpers/reorderJobsByPriority'
import jobSlice from './slices/jobSlice'

export const store = configureStore({
  reducer: {
    job: jobSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const selectJobs = (state: RootState) =>
  reorderJobsByPriority(state.job.jobs, JOBS_ORDER)
