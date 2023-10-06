import React from 'react'

const DisplayBoard = ({ playerColors, players, position }) => {
    console.log(position);
  return (
      <div className='w-full border flex justify-center items-center flex-col bg-white border-gray-400 rounded-md z-10'>
          {players.map((player, index) => {
              return(
                  <div key={index} className='w-[80%] border border-gray-300 rounded justify-between'>
                      <div className='flex justify-between items-center p-2'>
                          <div className='flex gap-5 justify-between items-center'>
                              <div className={`w-4 h-4 rounded-full mr-2`} style={{backgroundColor:playerColors[index]}}></div>
                              <p className='text-sm'>{player}</p>
                          </div>
                          <p className='text-sm'>{position[player]}</p>
                      </div>
                    </div>
              )
          }
            )}
      </div>
  )
}

export default DisplayBoard
