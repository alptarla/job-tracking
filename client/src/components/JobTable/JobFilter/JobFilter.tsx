import { ChangeEvent, useState } from 'react'
import { DEFAULT_FILTER_PRIORITY } from '../../../constants'
import { useAppSelector } from '../../../hooks/useStoreHooks'
import { Input, Select } from '../../Elements'
import classes from './JobFilter.module.scss'

interface IProps {
  onSearch: (search: string) => void
  onPriorityChange: (priorityId: string) => void
}

function JobFilter({ onSearch, onPriorityChange }: IProps) {
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState(DEFAULT_FILTER_PRIORITY)

  const makeOptionLabel = (label: string) => {
    return `Priority (${label})`
  }

  const { priorities } = useAppSelector((state) => state.job)
  const priorityOptions = priorities.map((priority) => ({
    value: priority.id,
    label: makeOptionLabel(priority.label),
  }))
  priorityOptions.push({
    value: DEFAULT_FILTER_PRIORITY,
    label: makeOptionLabel(DEFAULT_FILTER_PRIORITY),
  })

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
    onSearch(value)
  }

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setPriority(value)
    onPriorityChange(value)
  }

  return (
    <div className={classes.filter}>
      <Input
        containerClassName={classes.jobName}
        placeholder='Job Name'
        value={search}
        onChange={handleSearchChange}
      />
      <Select
        containerClassName={classes.priority}
        options={priorityOptions}
        value={priority}
        onChange={handlePriorityChange}
      />
    </div>
  )
}

export default JobFilter
