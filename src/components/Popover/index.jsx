import React, { useEffect, useRef, useState } from 'react'
import './styles.scss';

export const Popover = ({ label, children, hoverType = 'button' }) => {
    const [trigger, setTrigger] = useState(false);
    const Wrapper = hoverType === 'button' ? 'button' : 'div';

    return (
        <div
            className='st-popover-container'
            onMouseEnter={() => { setTrigger(true) }}
            onMouseLeave={() => setTrigger(false)}
        >
            <Wrapper>
                {label}
            </Wrapper>

            {trigger && (
                <div className="st-popover">
                    <div className="st-popover-arrow"></div>
                    <div className="st-popover-body">{children}</div>
                </div>
            )}
        </div>
    )
}
