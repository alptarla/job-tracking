import { ReactNode, useEffect, useRef } from 'react'
import classes from './Modal.module.scss'

interface IProps {
  children: ReactNode
  title?: string
  isShow?: boolean
  onClose: VoidFunction
}

function Modal({ children, title, isShow = true, onClose }: IProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (contentRef.current?.contains(e.target as Node)) return
      onClose()
    }

    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [onClose])

  if (!isShow) return null
  return (
    <div className={classes.modal}>
      <div
        className={classes.content}
        ref={contentRef}
      >
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.main}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
