import React from 'react'

const Buttons = ({ btnText, isDoubleBtn=false, onClick }) => {

    const btnStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    }
    return (
        <>
        {
            isDoubleBtn ?
                <div style={btnStyle} className='mb'>
                    <button className="default-button" onClick={onClick}>{btnText}</button>
                    <button className="default-button" onClick={onClick}>{btnText}</button>
                </div>
            :
                <button className="default-button" onClick={onClick}>{btnText}</button>
        }
        </>
    )
}

export default Buttons
