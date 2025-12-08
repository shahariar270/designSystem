import React, { useState } from 'react'

export const DashData = () => {
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const userText = 'dhaka is the capital of {dash} '
    const renderText = userText.split('{dash}')

    const onsubmitHandler = (e) => {
        e.preventDefault();
        setData([text]);
        setText('');
    }

    return (
        <>
            <form onSubmit={onsubmitHandler}>
                {renderText.map((item, index) => (
                    <React.Fragment key={index}>
                        {item}
                        {index < renderText.length - 1 && (
                            <input
                                type="text"
                                style={{
                                    border: 'none',
                                    borderBottom: '2px solid #000',
                                    width: '100px',
                                    outline: 'none'
                                }}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        )}
                    </React.Fragment>
                ))}
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
