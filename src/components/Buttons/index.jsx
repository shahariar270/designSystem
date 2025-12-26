import React from 'react'
import './styles.scss'

const Button = ({
  label = 'click me',
  type = 'button',
  style = {},
  border = 'none',
  onclick = () => { },
  variant = 'primary',
  size = 'md'
}) => {
  return (
    <button
      type={type}
      style={style}
      className={`btn btn__border--${border} btn--${variant} btn--${size}`}
      onClick={onclick}
    >
      {label}
    </button>
  )
}

export default Button;