// import React from 'react'

import { useEffect, useState } from "react";
import Board from "../components/Board";
import io from "socket.io-client";
import { Button, Modal, Select, TextInput } from "@mantine/core";
import Start from "../components/Start";
import { useDisclosure } from "@mantine/hooks";
import Loader from "../components/Loader";

const Home = () => {
  const [play, setPlay] = useState(false);
  const [position, setPosition] = useState({});
  // const [currentPlayer, setCurrentPlayer] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  // const [pfrom, setPFrom] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [createRoom, setCreateRoom] = useState(false);
  const [joinRoom, setJoinRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [diceDisabled, setDiceDisabled] = useState(false);
  const [turn, setTurn] = useState("");
  const [rolled, setRolled] = useState(false);
  const [noofplayers, setNoofplayers] = useState(-1);
  const [opened, { open, close }] = useDisclosure(false);
  const [sixrolled, setSixrolled] = useState(0);
  const [roll, setRoll] = useState(false);
  const socket = io("http://localhost:5000");
  const laddersfrom = [4, 9, 19, 21, 34, 51, 72, 80];
  const laddersto = [14, 31, 44, 59, 84, 67, 91, 99];
  const snakesfrom = [17, 48, 62, 64, 87, 92, 95, 98];
  const snakesto = [7, 27, 20, 41, 36, 73, 78, 79];

  const bet = () => {
    console.log(document.querySelector("#dice-wrapper"));
    document.querySelector("#dice-wrapper").click();
  };

  const startPlay = () => {
    setCreateRoom(true);
    // const name = prompt("Enter your name:");
  };
  const startPlaying = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8);
    setRoomCode(newRoomCode);

    window.history.replaceState(null, "", `/${newRoomCode}`);
    setPlayerName(playerName);
    console.log(noofplayers);
    setNoofplayers(noofplayers);
    socket.emit("createRoom", {
      roomCode: newRoomCode,
      playerName,
      noofplayers,
    });
    socket.on("playerList", (players) => {
      const newPlayers = players.reduce((acc, player) => {
        acc.push(player.name);
        return acc;
      }, []);
      console.log(newPlayers);
      setPlayers((prevPlayers) => newPlayers);
      const newPosition = players.reduce((acc, player) => {
        acc[player.name] = 1;
        return acc;
      }, {});
      console.log(newPosition);
      setPosition(newPosition);
      setTurn(players[0].name);
    });
    setCreateRoom(false);
    setLoading(true);
    setDiceValue(0);
    setDiceDisabled(false);
  };

  const startPlayWithComputer = () => {
    open();

    // Start the computer's turn
  };

  const PlayWithComputer = () => {
    close();
    const newRoomCode = Math.random().toString(36).substring(2, 8);
    setRoomCode(newRoomCode);
    window.history.replaceState(null, "", `/${newRoomCode}`);
    // const playerName = prompt("Enter your name:");
    // setPlayerName(playerName);

    socket.emit("createRoom", {
      roomCode: newRoomCode,
      playerName,
      noofplayers: 2,
    });

    const computerName = "Computer";
    setPlayers([playerName, computerName]);

    setPosition((prevPosition) => ({
      ...prevPosition,
      [playerName]: 1,
      [computerName]: 1,
    }));

    setTurn(playerName);
    setDiceValue(0);
    setDiceDisabled(false);
    setPlay(true);
  };

  const startComputerTurn = (computerName) => {
    // Simulate the computer rolling the dice and make a random move
    console.log("Computer's turn");
    const diceValue = Math.floor(Math.random() * 6) + 1;
    updateDiceValue(diceValue);

    // Calculate the target position for the computer
    const currentPlayerPosition = position[computerName];
    const targetPosition = currentPlayerPosition + diceValue;

    // Move the computer
    movePlayer(
      players,
      computerName,
      currentPlayerPosition,
      targetPosition,
      diceValue === 6 ? true : false
    );
  };

  const startPlayWithFriend = () => {
    setJoinRoom(true);
  };

  const startPlayingWithFriend = () => {
    // const newRoomCode = prompt("Enter room code:");
    // setRoomCode(newRoomCode);
    // const playerName = prompt("Enter your name:");
    // setPlayerName(playerName);
    socket.emit("joinRoom", { roomCode: roomCode, playerName });
    socket.on("playerList", (players, noofplayers) => {
      const newPlayers = players.reduce((acc, player) => {
        acc.push(player.name);
        return acc;
      }, []);
      console.log(newPlayers);
      setPlayers((prevPlayers) => newPlayers);
      setNoofplayers(noofplayers);
      console.log(players);
      const newPosition = players.reduce((acc, player) => {
        acc[player.name] = 1;
        return acc;
      }, {});
      console.log(newPosition);
      setJoinRoom(false);
      setPosition(newPosition);
      setTurn(players[0].name);
      setLoading(true);
    });
  };

  useEffect(() => {
    console.log(players, noofplayers);
    // setLoading(true);
    console.log(parseInt(noofplayers), players.length);
    if (parseInt(noofplayers) === players.length) {
      setLoading(false);
      setPlay(true);
      
    }
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

  // useEffect(() => {
  //   // Listening for updates from the server
  //   socket.on("gameStateUpdate", (updatedPosition) => {
  //     setPosition(updatedPosition);
  //   });

  //   socket.on("gameStartWithFriend", () => {
  //     alert("The game has started with your friend. It's your turn.");
  //   });

  //   socket.on("nextTurn", ({ nextPlayer }) => {

  //   });

  //   return () => {
  //     socket.off("gameStateUpdate");
  //     socket.off("gameStartWithFriend");
  //     socket.off("nextTurn");
  //   };
  // }, [roomCode]);

  const movePlayer = async (players, player, from, to, anotherchance) => {
    console.log(player, from, to);
    if (from === to) {
      // If already at the target position, proceed to the next player's turn
      if (laddersfrom.includes(from)) {
        const index = laddersfrom.indexOf(from);
        movePlayerDirectly(player, from, laddersto[index]);
      } else if (snakesfrom.includes(from)) {
        const index = snakesfrom.indexOf(from);
        movePlayerDirectly(player, from, snakesto[index]);
      }
      if (!anotherchance) {
        const currentPlayerIndex = players.indexOf(`${player}`);
        console.log(players.length, currentPlayerIndex);
        if (players.length === 1) {
          setTurn(playerName);
          
          setDiceDisabled(false);
          return;
        }
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        const nextPlayerTurn = players[nextPlayerIndex];
        console.log(
          players,
          nextPlayerTurn,
          currentPlayerIndex,
          nextPlayerIndex
        );
        setTurn(nextPlayerTurn);
        return;
      } else {
        setTurn(player);
        setDiceDisabled(false);
        return;
      }
    }

    // if (pfrom !== from) {
    //   setPFrom(from);
    //   console.log(pfrom, from);
    // } else {
    //   return;
    // }

    // Calculate the direction of movement
    const direction = from < to ? 1 : -1;

    // Update the position with the new step
    setPosition((prevPosition) => ({
      ...prevPosition,
      [player]: prevPosition[player] + direction,
    }));

    // Wait for a short delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Move to the next step
    await movePlayer(players, player, from + direction, to, anotherchance);
  };

  // useEffect(() => {
  //   console.log(position,turn);
  //   socket.emit("updateGameState", { roomCode, position, turn });
  // }, [position,turn]);
  useEffect(() => {
    console.log(turn, "\n", playerName);
    if (playerName === turn) {
      setDiceDisabled(false);
    } else if (turn === "Computer") {
      startComputerTurn(turn);
    } else {
      setDiceDisabled(true);
    }
  }, [turn]);

  // useEffect(() => {
  //   // Listening for updates from the server

  //   // ...
  // }, []);

  useEffect(() => {
    if (diceValue !== 0 && players.length > 0 && turn === playerName) {
      setRoll(!roll);
      // Disable the dice while processing
      setDiceDisabled(true);
      console.log(position);
      // bet();
      // socket.emit("find",{name:turn,dice:diceValue})
      // Calculate the target position
      const currentPlayerPosition = position[turn];
      const targetPosition = currentPlayerPosition + diceValue;
      if (targetPosition > 100) {
        // If the target position exceeds 100, stay in the same position
        const currentPlayerIndex = players.indexOf(`${turn}`);
        if (players.length === 1) {
          setTurn(turn);
          setDiceDisabled(false);
          return;
        }
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        const nextPlayerTurn = players[nextPlayerIndex];
        console.log(
          players,
          nextPlayerTurn,
          currentPlayerIndex,
          nextPlayerIndex
        );
        setTurn(nextPlayerTurn);
      }

      // Move the player
      // movePlayer(players,turn, currentPlayerPosition, targetPosition);
      // movePlayer(turn, currentPlayerPosition, targetPosition);
      if (diceValue === 6 && sixrolled < 3) {
        setSixrolled(sixrolled + 1);
        socket.emit("updateGameState", {
          roomCode,
          players,
          position,
          turn,
          currentPlayerPosition,
          targetPosition,
          anotherchance: true,
        });
      } else {
        setSixrolled(0);
        socket.emit("updateGameState", {
          roomCode,
          players,
          position,
          turn,
          currentPlayerPosition,
          targetPosition,
          anotherchance: false,
        });
      }
    }
  }, [rolled]);

  socket.on(
    "gameStateUpdate",
    (
      players,
      updatedPosition,
      turn,
      currentPlayerPosition,
      targetPosition,
      anotherchance
    ) => {
      console.log(updatedPosition);
      bet();
      movePlayer(
        players,
        turn,
        currentPlayerPosition,
        targetPosition,
        anotherchance
      );
    }
  );

  return (
    <>
      {loading ? <Loader noofplayers={players.length} roomCode={roomCode} /> :
    <div>
      
      <div
        className={`${
          play ? "hidden" : "w-screen h-screen justify-center items-center flex"
        }`}
      >
        <Modal
          opened={opened}
          onClose={close}
          title="Play with Computer"
          centered
        >
          <div className="flex flex-col justify-center items-center gap-5">
            <TextInput
              label="Enter your name"
              placeholder="Enter your name"
              value={playerName}
              className="w-[90%]"
              onChange={(event) => setPlayerName(event.currentTarget.value)}
            />
            <Button onClick={PlayWithComputer} variant="filled">
              Start
            </Button>
          </div>
        </Modal>
        <Modal
          opened={createRoom}
          onClose={() => setCreateRoom(false)}
          title="Create Room"
          centered
        >
          <div className="flex flex-col justify-center items-center gap-5">
            <TextInput
              label="Enter your name"
              placeholder="Enter your name"
              value={playerName}
              className="w-[90%]"
              onChange={(event) => setPlayerName(event.currentTarget.value)}
            />
            <Select
              label="No of players"
              placeholder="Pick value"
                  data={[1, 2, 3, 4]}
                  value={noofplayers}
                  onChange={setNoofplayers}
              className="w-[90%]"
            />
            <Button onClick={startPlaying} variant="filled">
              Start
            </Button>
          </div>
            </Modal>
            <Modal 
              opened={joinRoom}
              onClose={() => setJoinRoom(false)}
              title="Join Room" 
              centered
            >
              <div className="flex flex-col justify-center items-center gap-5">
                <TextInput
                  label="Enter your name"
                  placeholder="Enter your name"
                  value={playerName}
                  className="w-[90%]"
                  onChange={(event) => setPlayerName(event.currentTarget.value)}
                />
                <TextInput
                  label="Enter room code"
                  placeholder="Enter room code"
                  value={roomCode}
                  className="w-[90%]"
                  onChange={(event) => setRoomCode(event.currentTarget.value)}
                />
                <Button onClick={startPlayingWithFriend} variant="filled">
                  Start
                </Button>
              </div>
            </Modal>
        <Start
          startPlay={startPlay}
          startPlayWithComputer={startPlayWithComputer}
          startPlayWithFriend={startPlayWithFriend}
        />
      </div>
      
        <div className={`${play ? "" : "hidden"}`}>
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
            roll={roll}
          />
        </div>
      
      </div>
    }
      </>
  );
};

export default Home;
