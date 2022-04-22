import axios from 'axios'
import { IPrioritiesResponse } from '../types'

const JobService = {
  async fetchJobs() {
    const { data } = await axios.get<IPrioritiesResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/priorities`
    )
    return data.priorities
  },
}

export default JobService
