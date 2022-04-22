import { ReactComponent as AlertIcon } from '../../../assets/icons/ic-alert.svg'
import { IJob } from '../../../types'
import { Button } from '../../Elements'
import Modal from '../Modal'
import classes from './RemoveModal.module.scss'

interface IProps {
  isShow?: boolean
  onClose: VoidFunction
  onRemove: (job: IJob) => void
  job: IJob | null
}

function RemoveModal({ isShow = true, onClose, onRemove, job }: IProps) {
  const handleRemove = () => {
    if (job) onRemove(job)
  }

  return (
    <Modal
      onClose={onClose}
      isShow={isShow}
      title='Are you sure you want to delete it?'
    >
      <AlertIcon className={classes.alertIcon} />
      <div className={classes.action}>
        <Button
          variant='secondary'
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant='danger'
          onClick={handleRemove}
        >
          Approve
        </Button>
      </div>
    </Modal>
  )
}

export default RemoveModal
