import classes from './Header.module.scss'

function Header() {
  return (
    <header className={classes.header}>
      <div className='container'>
        <h1 className={classes.brand}>Job Tracking App</h1>
      </div>
    </header>
  )
}

export default Header
