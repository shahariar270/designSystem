import React from 'react'
import './styles.scss'

const Button = ({
  label = 'click me',
  type = 'button',
  style = {},
  border = 'none',
  onclick = () => { },
  variant = 'primary'
}) => {
  return (
    <button type={type} style={style} className={`btn btn--${border} btn--${variant}`} onClick={onclick}>
      {label}
    </button>
  )
}

export default Button;