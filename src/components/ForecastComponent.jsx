import React from 'react'

const ForecastComponent = ({ title, icon, temp }) => {
  return (
    <div className='flex flex-col items-center justify-center '>
      <p className=' text-sm font-bold'>{title}</p>
      <img className='w-16 my-1' src={icon} />
      <p className='font-medium'>{temp + "°"}</p>
    </div>
  )
}

export default ForecastComponent