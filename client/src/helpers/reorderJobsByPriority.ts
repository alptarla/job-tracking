import { IJob } from '../types'

function reorderJobsByPriority(jobs: IJob[], order: string[]): IJob[] {
  const sortBy: any = {}

  order.forEach((item, index) => {
    sortBy[item.toUpperCase()] = index
  })

  return [...jobs].sort((a, b) => {
    return (
      sortBy[a.priority.label.toUpperCase()] -
      sortBy[b.priority.label.toUpperCase()]
    )
  })
}

export default reorderJobsByPriority
