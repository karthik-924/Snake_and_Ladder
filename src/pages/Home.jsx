// import React from 'react'

import { useEffect, useState } from "react";
import Board from "./Board"

const Home = () => {
    const players = ["#000000", "#000080"];
  const [position, setPosition] = useState({
    [players[0].split("#")[1]]: 1,
    [players[1].split("#")[1]]: 1,
  });
  const [diceValue, setDiceValue] = useState(0);
  const [diceDisabled, setDiceDisabled] = useState(false);
  const [turn, setTurn] = useState("000000");
  const [rolled, setRolled] = useState(false);
 
    const laddersfrom = [4, 9, 19, 21, 34, 51, 72, 80]
    const laddersto = [14, 31, 44, 59, 84, 67, 91, 99]
    const snakesfrom = [17, 48, 62, 64, 87, 92, 95, 98]
    const snakesto = [7, 27, 20, 41, 36, 73, 78, 79]

  
  const updateDiceValue = async (value) => {
    console.log(value);
    setRolled(!rolled);
    setDiceValue(value);
    };
    
    const movePlayerDirectly = (player, from, to) => {
        setPosition((prevPosition) => ({
          ...prevPosition,
          [player]: to,
        }));
        
    };

  const movePlayer = (player, from, to) => {
    if (from === to) {
        // If already at the target position, proceed to the next player's turn
        if (laddersfrom.includes(from)) {
            const index = laddersfrom.indexOf(from);
            movePlayerDirectly(player, from, laddersto[index]);
            
          }
        else if (snakesfrom.includes(from)) {
            const index = snakesfrom.indexOf(from);
            movePlayerDirectly(player, from, snakesto[index]);
            
        }
      
      const currentPlayerIndex = players.indexOf(`#${turn}`);
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      const nextPlayerTurn = players[nextPlayerIndex].split("#")[1];
      setTurn(nextPlayerTurn);
      setDiceDisabled(false);
      return;
    }

    // Calculate the direction of movement
    const direction = from < to ? 1 : -1;

    // Update the position with the new step
    setPosition((prevPosition) => ({
      ...prevPosition,
      [player]: prevPosition[player] + direction,
    }));

    // Wait for a short delay
    setTimeout(() => {
      // Move to the next step
      movePlayer(player, from + direction, to);
    }, 300); // Adjust the delay as needed
  };

  useEffect(() => {
    if (diceValue !== 0) {
      // Disable the dice while processing
      setDiceDisabled(true);

      // Calculate the target position
      const currentPlayerPosition = position[turn];
      const targetPosition = currentPlayerPosition + diceValue;

        // Move the player
      
            
      movePlayer(turn, currentPlayerPosition, targetPosition);
    }
  }, [rolled]);
  return (
      <div>
      <Board players={players} position={position} setPosition={setPosition} diceValue={diceValue} setDiceValue={setDiceValue} diceDisabled={diceDisabled} setDiceDisabled={setDiceDisabled} turn={turn} setTurn={setTurn} rolled={rolled} setRolled={setRolled} updateDiceValue={updateDiceValue} movePlayer={movePlayer} />
    </div>
  )
}

export default Home
