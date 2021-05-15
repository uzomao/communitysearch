import React from 'react'

const Buttons = ({ btnText }) => {

    const btnStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    }
    return (
        <div style={btnStyle}>
            <button className="default-button">{btnText}</button>
            <button className="default-button">{btnText}</button>
        </div>
    )
}

export default Buttons
