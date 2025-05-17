import React from 'react'
import './styles.scss'

const Button = ({
label,
type,
style,
border,
onClickHandle,
}) => {
    console.log(type);
  return (
    <div>
        <button className={`button-${style} button-border-${border}`} onClick={onClickHandle}>
        {label}
        </button>
    </div>
  )
}

export default Button;