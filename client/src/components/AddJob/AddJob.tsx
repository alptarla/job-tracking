import { useFormik } from 'formik'
import { ChangeEvent } from 'react'
import * as Yup from 'yup'
import { ReactComponent as PlusIcon } from '../../assets/icons/ic-plus.svg'
import { MAX_JOB_NAME_LENGTH } from '../../constants'
import makePriorityOptions from '../../helpers/makePriorityOptions'
import { useAppSelector } from '../../hooks/useStoreHooks'
import { IJob, IPriority } from '../../types'
import { Button, Input, Select } from '../Elements'
import classes from './AddJob.module.scss'

interface IProps {
  onCreate: (job: Omit<IJob, 'id'>) => void
}

interface IJobFormValues {
  name: string
  priority: IPriority | null
}

function AddJob({ onCreate }: IProps) {
  const formik = useFormik<IJobFormValues>({
    initialValues: {
      name: '',
      priority: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Job Name is required').max(255),
      priority: Yup.object().nullable().required('Job Priority is required'),
    }),
    onSubmit({ name, priority }) {
      onCreate({ name, priority: priority! })
      formik.resetForm()
    },
  })

  const { priorities } = useAppSelector((state) => state.job)
  const priorityOptions = makePriorityOptions(priorities)

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value

    const foundedPriority = priorities.find((priority) => priority.id === id)
    if (!foundedPriority) return

    formik.setFieldValue('priority', foundedPriority)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <h4 className={classes.title}>Create New Job</h4>
      <div className={classes.formWrapper}>
        <Input
          value={formik.values.name}
          onChange={formik.handleChange}
          label='Job Name'
          name='name'
          maxLength={MAX_JOB_NAME_LENGTH}
          containerClassName={classes.jobName}
          error={formik.errors.name}
        />
        <Select
          value={formik.values.priority?.id || ''}
          onChange={handlePriorityChange}
          placeholder='Choose'
          name='priority'
          containerClassNames={classes.priority}
          label='Job Priority'
          options={priorityOptions}
          error={formik.errors.priority}
        />
        <Button
          className={classes.button}
          icon={<PlusIcon />}
          variant='primary'
          type='submit'
        >
          Create
        </Button>
      </div>
    </form>
  )
}

export default AddJob
