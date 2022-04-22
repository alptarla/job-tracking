import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { DEFAULT_ERROR_MESSAGE } from '../../constants'
import {
  IJob,
  IPrioritiesResponse,
  IPriority,
  ResponseStatusType,
} from '../../types'

export const fetchPriorities = createAsyncThunk(
  'job/fetchPriorities',
  async () => {
    const { data } = await axios.get<IPrioritiesResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/priorities`
    )
    return data.priorities
  }
)

interface IInitialState {
  jobs: IJob[]
  priorities: IPriority[]
  status: ResponseStatusType
  error: string | null
}

const initialState: IInitialState = {
  jobs: [],
  priorities: [],
  status: 'idle',
  error: null,
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
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
