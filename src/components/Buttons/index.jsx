import React from 'react'
import './styles.scss'

const Button = ({
label,
type,
border,
onClickHandle,
}) => {
    console.log(type);
  return (
    <div>
        <button className={`button-${type} button-border-${border}`} onClick={onClickHandle}>
        {label}
        </button>
    </div>
  )
}

export default Button;