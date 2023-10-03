// import React from 'react'
import { useEffect, useState } from "react";
import Dice from "react-dice-roll";
import "./Home.css"
const Home = () => {
  const colors = [
    "#ed1f28",
    "#fefffe",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#8ec73c",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#8ec73c",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
    "#d8dc29",
    "#fefffe",
    "#ed1f28",
    "#0f75bd",
    "#11934c",
  ];
  const players = ["#000000", "#000080"];
  const [position, setPosition] = useState({
    [players[0].split("#")[1]]: 1,
    [players[1].split("#")[1]]: 1,
  });
  const [diceValue, setDiceValue] = useState(0);
  const [diceDisabled, setDiceDisabled] = useState(false);
  const [turn, setTurn] = useState("000000");
  const [rolled, setRolled] = useState(false);
  
  const updateDiceValue = async (value) => {
    console.log(value);
    setRolled(!rolled);
    setDiceValue(value);
  };

  const movePlayer = (player, from, to) => {
    if (from === to) {
      // If already at the target position, proceed to the next player's turn
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
    <div className="bg-gray-300 font-serif w-screen h-screen flex gap-10 justify-center items-center relative">
      <div className="bg-gray-300 font-serif max-[1200px] w-[80%] h-[95%] grid-cols-10 grid">
        {[...Array(100)].map((_, i) => {
          const value =
            String(i).length === 1 ||
            (String(i).length === 2 && Number(String(i)[0]) % 2 === 0)
              ? 100 - i
              : String(Number(`${9 - Number(String(i)[0])}${String(i)[1]}`) + 1);

          return (
            <div
              key={i}
              id={String(value)}
              className={`h-full w-full relative border-[0.1vmin] ${
                i === 0 || i % 10 === 0 ? "border-l-2" : ""
              } ${i < 10 ? "border-t-2" : ""} ${
                i >= 90 ? "border-b-2" : ""
              } ${
                i + 1 % 10 === 0 ? "border-r-2" : ""
              } border-solid border-black flex justify-center items-center`}
              style={{ backgroundColor: colors[i] }}
            >
              {players.map((player, index) => (
                <div
                  key={index}
                  id={player.split("#")[1]}
                  className={`players ${player.split("#")[1]}_${value} absolute ${
                    String(position[player.split("#")[1]]) === String(value)
                      ? "visible"
                      : "invisible"
                  } h-10 w-10 rounded-full opacity-[0.7]`}
                  style={{
                    backgroundColor: player,
                  }}
                ></div>
              ))}
              {value}
            </div>
          );
        })}
      </div>
      <Dice
        onRoll={(value) => {
          updateDiceValue(value);
        }}
        size={100}
        disabled={diceDisabled}
      />
    </div>
  );
};

export default Home;
