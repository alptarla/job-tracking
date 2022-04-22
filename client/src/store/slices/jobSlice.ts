import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_ERROR_MESSAGE } from '../../constants'
import { jobs as initialJobs } from '../../initialData'
import JobService from '../../services/JobService'
import { IJob, IPriority, ResponseStatusType } from '../../types'

export const fetchPriorities = createAsyncThunk(
  'job/fetchPriorities',
  async () => JobService.fetchJobs()
)

interface IInitialState {
  jobs: IJob[]
  priorities: IPriority[]
  status: ResponseStatusType
  error: string | null
}

const initialState: IInitialState = {
  jobs: initialJobs,
  priorities: [],
  status: 'idle',
  error: null,
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobs(state, { payload }: PayloadAction<IJob[]>) {
      state.jobs = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPriorities.fulfilled, (state, { payload }) => {
      state.status = 'idle'
      state.priorities = payload
      state.error = null
    })
    builder.addCase(fetchPriorities.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPriorities.rejected, (state, { error }) => {
      state.status = 'error'
      state.error = error.message || DEFAULT_ERROR_MESSAGE
    })
  },
})

export default jobSlice.reducer
export const { setJobs } = jobSlice.actions
