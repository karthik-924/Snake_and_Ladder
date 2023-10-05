import { Button } from '@mantine/core'
import React from 'react'

const Start = ({startPlay,startPlayWithComputer,startPlayWithFriend}) => {
  return (
    <div className='w-full h-full flex flex-col gap-5 justify-center items-center'>
          <Button onClick={startPlayWithComputer} variant='filled'>Play with Computer</Button>
          <Button onClick={startPlay} variant='filled'>Create a room</Button>
            <Button onClick={startPlayWithFriend} variant='filled'>Join a room</Button>
    </div>
  )
}

export default Start
