import React from 'react'

const NoDataAvailable = ({entity}) => {
  return (
    <div className="h-[15rem] flex flex-col gap-y-2 items-center justify-center">
        <img src="/images/nosearchfound.png" alt="nosearchimage" className='h-16 w-16' />
        <p className='text-base font-medium'>{`No Data Available of `}<span className='text-c_BF642B text-xl'> {`"${entity}"`}</span></p>
    </div>
  )
}

export default NoDataAvailable