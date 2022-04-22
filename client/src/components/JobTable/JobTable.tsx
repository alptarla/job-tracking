import { useState } from 'react'
import { ReactComponent as EditIcon } from '../../assets/icons/ic-edit.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/ic-trash-.svg'
import { IJob } from '../../types'
import Badge from '../Badge'
import { Button } from '../Elements'
import classes from './JobTable.module.scss'

interface IProps {
  data: IJob[]
}

function JobTable({ data }: IProps) {
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowRemoveModal, setIsShowRemoveModal] = useState(false)

  const changeEditModal = (val: boolean) => () => setIsShowEditModal(val)
  const changeRemoveModal = (val: boolean) => () => setIsShowRemoveModal(val)

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
            onClick={changeEditModal(true)}
          />
          <Button
            data-testid='remove-button'
            icon={<TrashIcon />}
            variant='secondary'
            onClick={changeRemoveModal(true)}
          />
        </td>
      </tr>
    ))

  return (
    <>
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
    </>
  )
}
export default JobTable
