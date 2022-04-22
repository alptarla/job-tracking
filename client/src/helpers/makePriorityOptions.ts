import { IPriority } from '../types'

function makePriorityOptions(priorities: IPriority[]) {
  return priorities.map((priority) => ({
    label: priority.label,
    value: priority.id,
  }))
}

export default makePriorityOptions
