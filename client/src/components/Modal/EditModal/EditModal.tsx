import { ChangeEvent, useEffect, useState } from 'react'
import makePriorityOptions from '../../../helpers/makePriorityOptions'
import { useAppSelector } from '../../../hooks/useStoreHooks'
import { IJob, IPriority } from '../../../types'
import { Button, Input, Select } from '../../Elements'
import Modal from '../Modal'
import classes from './EditModal.module.scss'

interface IProps {
  isShow?: boolean
  onCancel: VoidFunction
  onSave: (job: IJob) => void
  job: IJob | null
}

function EditModal({ isShow = false, onCancel, onSave, job }: IProps) {
  const [selectedPriority, setSelectedPriority] = useState<IPriority | null>(
    null
  )
  const { priorities } = useAppSelector((state) => state.job)
  const priorityOptions = makePriorityOptions(priorities)

  useEffect(() => {
    if (job) setSelectedPriority(job.priority)
  }, [job])

  const handleSave = () => {
    if (!selectedPriority || !job) return
    onSave({ ...job, priority: selectedPriority })
  }

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const foundedPriority = priorities.find((priority) => {
      return priority.id === e.target.value
    })

    if (!foundedPriority) return
    setSelectedPriority(foundedPriority)
  }

  return (
    <Modal
      title='Job Edit'
      onClose={onCancel}
      isShow={isShow}
    >
      <Input
        containerClassName={classes.input}
        label='Job Name'
        value={job?.name}
        disabled
      />
      <Select
        containerClassName={classes.input}
        label='Job Priority'
        options={priorityOptions}
        placeholder='Choose'
        value={selectedPriority?.id || ''}
        onChange={handlePriorityChange}
      />
      <div className={classes.action}>
        <Button
          variant='secondary'
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant='danger'
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </Modal>
  )
}
export default EditModal
