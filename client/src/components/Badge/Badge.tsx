import classes from './Badge.module.scss'

interface IProps {
  label: string
  color?: string
}

function Badge({ label, color = '#333' }: IProps) {
  return (
    <div
      className={classes.badge}
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  )
}

export default Badge
