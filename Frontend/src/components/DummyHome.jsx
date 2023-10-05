// import React from 'react'

import { useEffect, useState } from "react";
import Board from "../components/Board";
import io from 'socket.io-client';
import { Button } from "@mantine/core";
import Start from "../components/Start";

const Home = () => {
  const players = ["#000000", "#000080"];
  const [play, setPlay] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [position, setPosition] = useState({
    [players[0].split("#")[1]]: 1,
    [players[1].split("#")[1]]: 1,
  });
  const [diceValue, setDiceValue] = useState(0);
  const [diceDisabled, setDiceDisabled] = useState(false);
  const [turn, setTurn] = useState("000000");
  const [rolled, setRolled] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const socket = io('http://localhost:5000');
  const laddersfrom = [4, 9, 19, 21, 34, 51, 72, 80];
  const laddersto = [14, 31, 44, 59, 84, 67, 91, 99];
  const snakesfrom = [17, 48, 62, 64, 87, 92, 95, 98];
  const snakesto = [7, 27, 20, 41, 36, 73, 78, 79];

  const startPlay = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8);
    setRoomCode(newRoomCode);

    const playerName = prompt("Enter your name:");
    setPlayerName(playerName);

    socket.emit("createRoom", { roomCode: newRoomCode, playerName });
    setPlay(true);
  };

  const startPlayWithComputer = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8);
    setRoomCode(newRoomCode);

    const playerName = prompt("Enter your name:");
    setPlayerName(playerName);

    socket.emit("createRoom", { roomCode: newRoomCode, playerName });
    setPlay(true);
    setIsComputerTurn(true);
    startComputerTurn();
  };

  const startPlayWithFriend = () => {
    const newRoomCode = prompt("Enter room code:")
    setRoomCode(newRoomCode);

    const playerName = prompt("Enter your name:");
    setPlayerName(playerName);

    socket.emit("createRoom", { roomCode: newRoomCode, playerName });
    setPlay(true);
  };

  const startComputerTurn = () => {
    const computerDiceValue = Math.floor(Math.random() * 6) + 1;
    updateDiceValue(computerDiceValue);

    setTimeout(() => {
      movePlayer(turn, position[turn], position[turn] + computerDiceValue);
    }, 1000);
  };

  useEffect(() => {
    // Listening for updates from the server
    socket.on("gameStateUpdate", (updatedPosition) => {
      setPosition(updatedPosition);
    });

    socket.on("gameStartWithFriend", () => {
      setIsComputerTurn(false);
      alert("The game has started with your friend. It's your turn.");
    });

    socket.on("nextTurn", ({ nextPlayer }) => {
      if (nextPlayer === playerName) {
        setIsComputerTurn(false);
        alert(`It's your turn, ${nextPlayer}!`);
      } else {
        setIsComputerTurn(true);
        alert(`It's ${nextPlayer}'s turn.`);
        startComputerTurn();
      }
    });

    return () => {
      socket.off("gameStateUpdate");
      socket.off("gameStartWithFriend");
      socket.off("nextTurn");
    };
  }, [roomCode]);

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
      } else if (snakesfrom.includes(from)) {
        const index = snakesfrom.indexOf(from);
        movePlayerDirectly(player, from, snakesto[index]);
      }

      const currentPlayerIndex = players.indexOf(`#${turn}`);
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      const nextPlayerTurn = players[nextPlayerIndex].split("#")[1];
      setTurn(nextPlayerTurn);
      setDiceDisabled(false);
      // Emit an event to update game state on the server
      socket.emit("updateGameState", { roomCode, position });
      return;
    }

    // Direction of movement
    const direction = from < to ? 1 : -1;

    // Updating the position with the new step
    setPosition((prevPosition) => ({
      ...prevPosition,
      [player]: prevPosition[player] + direction,
    }));

    setTimeout(() => {
      // Moving to the next step
      movePlayer(player, from + direction, to);
    }, 300);
  };

  useEffect(() => {
    if (!isComputerTurn && diceValue !== 0) {
      setDiceDisabled(true);
      socket.emit("find", { name: turn, dice: diceValue });
      const currentPlayerPosition = position[turn];
      const targetPosition = currentPlayerPosition + diceValue;

      movePlayer(turn, currentPlayerPosition, targetPosition);
    }
  }, [isComputerTurn, rolled]);
  
  return (
    <div>
      <div className={`${play?"hidden":"w-screen h-screen justify-center items-center flex"}`}>
        <Start startPlay={startPlay} startPlayWithComputer={startPlayWithComputer} startPlayWithFriend={startPlayWithFriend}/>
        </div>
      <div className={`${play ? "" : "hidden"}`}>
      {roomCode && <p>Room Code: {roomCode}</p>}
      <Board
        players={players}
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
