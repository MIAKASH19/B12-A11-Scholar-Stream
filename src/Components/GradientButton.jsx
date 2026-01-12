import React from 'react'

const GradientButton = ({text}) => {
    return (
        <button className='bg-linear-to-r from-[#64c7f1] to-[#ff78e2] hover:from-[#64c7f1] hover:to-[#ff78e2] transition-colors duration-300 px-8 py-3 rounded-full text-white text-sm font-medium shadow-2xl cursor-pointer'>{text}</button>
    )
}
zz
export default GradientButton