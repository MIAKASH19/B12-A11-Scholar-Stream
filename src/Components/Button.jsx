import React from 'react'

const Button = ({ text, onClick, className }) => {
    return (
        <button onClick={onClick} className={`bg-[#0CB3FA] hover:bg-[#0CB3FA]/70 transition-colors duration-300 px-8 py-3 rounded-full text-white text-sm font-medium shadow-2xl cursor-pointer ${className}`}>{text}</button>
    )
}


export default Button