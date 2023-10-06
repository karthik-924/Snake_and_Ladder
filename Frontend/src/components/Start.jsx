import { Button } from '@mantine/core'
import React from 'react'
import Background from '../assets/Background.jpeg'
import Heading from '../assets/Heading.png'

const Start = ({startPlay,startPlayWithComputer,startPlayWithFriend}) => {
  return (
    <div className='w-full h-full relative'>
      <img src={Background} className='w-full h-full absolute top-0 left-0 z-0' />
    <div className='w-full h-full flex flex-col gap-5 justify-center items-center relative'>
        <img src={Heading} className='w-[500px] h-[300px] z-10' />

        <Button onClick={startPlayWithComputer} className='w-[250px]' color="green" variant='filled'>Play with Computer</Button>
        
          <Button onClick={startPlay} className='w-[250px]' color="green" variant='filled'>Create a room</Button>
          <Button onClick={startPlayWithFriend} className='w-[250px]' color="green" variant='filled'>Join a room</Button>
      </div>
      </div>
  )
}

export default Start
