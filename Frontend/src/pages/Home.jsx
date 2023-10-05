// import React from 'react'

import { useEffect, useState } from "react";
import Board from "../components/Board";
import io from 'socket.io-client';
import { Button } from "@mantine/core";
import Start from "../components/Start";

const Home = () => {
  const playerColors = ["#000000", "#000080","#008800","#ff9900"];
  const [play, setPlay] = useState(false);
  const [position, setPosition] = useState({});
  // const [currentPlayer, setCurrentPlayer] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [diceValue, setDiceValue] = useState(0);
  const [diceDisabled, setDiceDisabled] = useState(false);
  const [turn, setTurn] = useState("");
  const [rolled, setRolled] = useState(false);
  const [noofplayers, setNoofplayers] = useState(-1);
  const socket = io('http://localhost:5000');
  const laddersfrom = [4, 9, 19, 21, 34, 51, 72, 80];
  const laddersto = [14, 31, 44, 59, 84, 67, 91, 99];
  const snakesfrom = [17, 48, 62, 64, 87, 92, 95, 98];
  const snakesto = [7, 27, 20, 41, 36, 73, 78, 79];

  const startPlay = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8);
    setRoomCode(newRoomCode);

    const playerName = prompt("Enter your name:");
    const noofplayers = prompt("Enter no of players:");
    setPlayerName(playerName);
    setNoofplayers(noofplayers);
    socket.emit("createRoom", { roomCode: newRoomCode, playerName, noofplayers });
    socket.on("playerList", (players) => {
      setPlayers(players.reduce((acc, player) => {
        acc.push(player.name);
        return acc;
      }, []));
      console.log(players);
      setPosition(players.reduce((acc, player) => {
        acc[player] = 1;
        return acc;
      }, {}));
      setTurn(players[0].name);
      
    });
    // const name = prompt("Enter your name:");
  };

  const startPlayWithComputer = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8);
    setRoomCode(newRoomCode);
  
    const playerName = prompt("Enter your name:");
    setPlayerName(playerName);
  
    socket.emit("createRoom", { roomCode: newRoomCode, playerName, noofplayers: 2 });
  
    const computerName = "Computer";
    setPlayers([playerName, computerName]);
  
    setPosition((prevPosition) => ({
      ...prevPosition,
      [playerName]: 1,
      [computerName]: 1,
    }));
  
    setTurn(playerName);
    setPlay(true);
  
    // Start the computer's turn
    setTimeout(() => {
      startComputerTurn(computerName);
    }, 1000); // Delay for 1 second before starting the computer's turn
  };
  
  const startComputerTurn = (computerName) => {
    // Simulate the computer rolling the dice and make a random move
    const diceValue = Math.floor(Math.random() * 6) + 1;
    updateDiceValue(diceValue);
  
    // Calculate the target position for the computer
    const currentPlayerPosition = position[computerName];
    const targetPosition = currentPlayerPosition + diceValue;
  
    // Move the computer
    movePlayer(computerName, currentPlayerPosition, targetPosition);
  };
  

  const startPlayWithFriend = () => {
    const newRoomCode = prompt("Enter room code:")
    setRoomCode(newRoomCode);
    const playerName = prompt("Enter your name:");
    socket.emit("joinRoom", { roomCode: newRoomCode, playerName });
    socket.on("playerList", (players) => {
      setPlayers(players.reduce((acc, player) => {
        acc.push(player.name);
        return acc;
      }, []));
      console.log(players);
      setPosition(players.reduce((acc, player) => {
        acc[player] = 1;
        return acc;
      }, {}));
      setTurn(players[0].name);
      
      
    });
    
    
    
    
  };
  
  useEffect(() => {
    if (players.length === noofplayers) 
      setPlay(true);

  }, [players]);


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

  useEffect(() => {
    // Listening for updates from the server
    socket.on("gameStateUpdate", (updatedPosition) => {
      setPosition(updatedPosition);
    });

    socket.on("gameStartWithFriend", () => {
      alert("The game has started with your friend. It's your turn.");
    });

    socket.on("nextTurn", ({ nextPlayer }) => {
      
    });

    return () => {
      socket.off("gameStateUpdate");
      socket.off("gameStartWithFriend");
      socket.off("nextTurn");
    };
  }, [roomCode]);

  const movePlayer = (player, from, to) => {
    if (from === to) {
      // If already at the target position, proceed to the next player's turn
      if (laddersfrom.includes(from)) {
        const index = laddersfrom.indexOf(from);
        movePlayerDirectly(player, from, laddersto[index]);
      } else if (snakesfrom.includes(from)) {
        const index = snakesfrom.indexOf(from);
        movePlayerDirectly(player, from, snakesto[index]);
      }

      const currentPlayerIndex = players.indexOf(`${turn}`);
      if (players.length === 1) {
        setTurn(turn);
        setDiceDisabled(false);
        return;
      }
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
      console.log(position);
      // socket.emit("find",{name:turn,dice:diceValue})
      // Calculate the target position
      const currentPlayerPosition = position[turn];
      const targetPosition = currentPlayerPosition + diceValue;

      // Move the player

      movePlayer(turn, currentPlayerPosition, targetPosition);
    }
  }, [rolled]);
  
  return (
    <div>
      <div className={`${play?"hidden":"w-screen h-screen justify-center items-center flex"}`}>
      <Start startPlay={startPlay} startPlayWithComputer={startPlayWithComputer} startPlayWithFriend={startPlayWithFriend}/>
      </div>
    <div className={`${play?"":"hidden"}`}>
      <Board
          players={players}
          playerColors={playerColors}
        position={position}
        setPosition={setPosition}
        diceValue={diceValue}
        setDiceValue={setDiceValue}
        diceDisabled={diceDisabled}
        setDiceDisabled={setDiceDisabled}
        turn={turn}
        setTurn={setTurn}
        rolled={rolled}
        setRolled={setRolled}
        updateDiceValue={updateDiceValue}
        movePlayer={movePlayer}
      />
      </div>
      </div>
  );
};

export default Home;