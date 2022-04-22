export interface IJob {
  id: string
  name: string
  priority: IPriority
}

export interface IPriority {
  id: string
  label: string
  color: string
}

export interface IPrioritiesResponse {
  priorities: IPriority[]
}

export type ResponseStatusType = 'idle' | 'loading' | 'error'

export type JobFilterType = { search: string; priorityId: string }
