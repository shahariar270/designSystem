import React from 'react'
import './styles.scss'

const Button = ({
  label = 'click me',
  type = 'button',
  style = {},
  border = 'none',
  onclick = () => { }
}) => {
  return (
    <div>
      <button type={type} className={`button-${style} button-border-${border}`} onClick={onclick}>
        {label}
      </button>
    </div>
  )
}

export default Button;