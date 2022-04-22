import { useState } from 'react'
import { ReactComponent as EditIcon } from '../../assets/icons/ic-edit.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/ic-trash-.svg'
import { useAppDispatch } from '../../hooks/useStoreHooks'
import { removeJob, updateJob } from '../../store/slices/jobSlice'
import { IJob } from '../../types'
import Badge from '../Badge'
import { Button } from '../Elements'
import { EditModal, RemoveModal } from '../Modal'
import JobFilter from './JobFilter'
import classes from './JobTable.module.scss'

interface IProps {
  data: IJob[]
  onSearch: (search: string) => void
  onPriorityChange: (priorityId: string) => void
}

function JobTable({ data, onSearch, onPriorityChange }: IProps) {
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowRemoveModal, setIsShowRemoveModal] = useState(false)

  const dispatch = useAppDispatch()

  const openEditModal = (job: IJob) => () => {
    setIsShowEditModal(true)
    setSelectedJob(job)
  }
  const closeEditModal = () => setIsShowEditModal(false)

  const openRemoveModal = (job: IJob) => () => {
    setIsShowRemoveModal(true)
    setSelectedJob(job)
  }
  const closeRemoveModal = () => setIsShowRemoveModal(false)

  const handleRemoveJob = (job: IJob) => {
    dispatch(removeJob(job))
    closeRemoveModal()
  }

  const handleEditJob = (job: IJob) => {
    dispatch(updateJob(job))
    closeEditModal()
  }

  const renderBody = () =>
    data.map((item, index) => (
      <tr key={index}>
        <td className={classes.jobName}>{item.name}</td>
        <td>
          <Badge
            label={item.priority.label}
            color={item.priority.color}
          />
        </td>
        <td className={classes.actionCol}>
          <Button
            data-testid='edit-button'
            icon={<EditIcon />}
            variant='secondary'
            onClick={openEditModal(item)}
          />
          <Button
            data-testid='remove-button'
            icon={<TrashIcon />}
            variant='secondary'
            onClick={openRemoveModal(item)}
          />
        </td>
      </tr>
    ))

  return (
    <>
      <div className={classes.tableWrapper}>
        <JobFilter
          onPriorityChange={onPriorityChange}
          onSearch={onSearch}
        />
        <table className={classes.table}>
          <thead className={classes.tableHead}>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Priority</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody className={classes.tableBody}>{renderBody()}</tbody>
        </table>
      </div>

      <EditModal
        isShow={isShowEditModal}
        onCancel={closeEditModal}
        onSave={handleEditJob}
        job={selectedJob}
      />
      <RemoveModal
        isShow={isShowRemoveModal}
        onClose={closeRemoveModal}
        onRemove={handleRemoveJob}
        job={selectedJob}
      />
    </>
  )
}

export default JobTable
