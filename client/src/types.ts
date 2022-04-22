export interface IJob {
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
