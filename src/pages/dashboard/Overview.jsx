import React from 'react'
import useAuth from '../../hooks/useAuth'

export default function Overview() {
  const { user } = useAuth();
  return (
    <div className='flex items-center justify-center'>
      <h3 className='text-xl text-center font-bold'>{user.email}</h3>
    </div>
  )
}
