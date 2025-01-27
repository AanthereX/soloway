import React from 'react'

const NoSearchFound = ({entity}) => {
  return (
    <div className="min-h-screen flex flex-col gap-y-2 items-center justify-center">
        <img src="/images/nosearchfound.png" alt="nosearchimage" className='h-16 w-16' />
        <p className='text-base font-medium'>{`No Search Found in `}<span className='text-c_BF642B text-xl'>{`"${entity}"`}</span></p>
    </div>
  )
}

export default NoSearchFound