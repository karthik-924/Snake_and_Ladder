// import React from 'react'
// import { useEffect, useState } from "react";
import Dice from "react-dice-roll";
import "../pages/Home.css";

import ladder2 from "../assets/ladder22.png";
import snake1 from "../assets/s1.png";
import snake2 from "../assets/s2.png";
import snake3 from "../assets/s3.png";
import snake4 from "../assets/s4.png";
import snake7 from "../assets/s7.png";
import snake5 from "../assets/s5.png";
import snake8 from "../assets/s8.png";
import snake9 from "../assets/snake4.png";
const Board = ({ players,playerColors, position, updateDiceValue, diceDisabled }) => {
  console.log(players);
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

  return (
    <div className="bg-gray-300 font-serif w-screen h-screen flex gap-10 justify-center items-center relative">
      <div className="bg-gray-300 font-serif max-[1200px] w-[55%] max-[1300px]:w-[60%] max-xl:w-[65%] max-[1150px]:w-[70%] max-[1040px]:w-[75%] h-[90%] grid-cols-10 grid relative">
      <img
          src={ladder2}
          alt=""
          id="l21"
          className="absolute top-[45%] left-[6%] w-[65px] z-10 h-[210px] rotate-[23deg] opacity-[0.8]"
        />
        <img
          src={ladder2}
          alt=""
          id="l4"
          className="absolute top-[72%] left-[46%] rotate-[74deg] w-[60px] h-[230px]  z-10 opacity-[0.8]"
        />
        <img
          src={ladder2}
          alt=""
          id="l19"
          className="absolute top-[51%] left-[21%] w-[65px] rotate-[38deg] h-[250px]  z-10 opacity-[0.8]"
        />
        <img
          src={ladder2}
          alt=""
          id="l51"
          className="absolute top-[23%] left-[76.5%] -rotate-[74deg] w-[60px] z-10 opacity-[0.8]"
        />
        <img
          src={ladder2}
          alt=""
          id="l9"
          className="absolute top-[63%] left-[86%] rotate-[20deg] w-[65px] h-[230px]  z-10 opacity-[0.8]"
        />
        <img
          src={ladder2}
          alt="l72"
          className="absolute top-[2%] left-[88%] w-[45px] rotate-[30deg]  z-10 opacity-[0.8]"
        />
        <img
          src={ladder2}
          alt="l80"
          className="absolute top-[2%] left-[7%] w-[45px] rotate-[30deg]  z-10 opacity-[0.8]"
        />
        <img
          src={ladder2}
          alt="l34"
          className="absolute top-[9%] left-[46%] w-[65px] -rotate-[37deg] h-[410px] z-10 opacity-[0.8]"
        />
        <img
          src={snake1}
          alt=""
          id="s64"
          className="absolute top-[28%] left-[8%] rotate-[25deg] w-[180px]  z-20"
        />
        <img
          src={snake2}
          alt=""
          id="s92"
          className="absolute top-[5%] left-[73%] rotate-[70deg] w-[140px]  z-10"
        />
        <img
          src={snake4}
          alt=""
          id="s95"
          className="absolute top-[2%] left-[27%] rotate-[110deg] w-[230px]  z-10"
        />
        <img
          src={snake7}
          alt=""
          id="s98"
          className="absolute top-[7%] left-[11%] -rotate-[60deg] w-[140px]  z-10"
        />
        <img
          src={snake3}
          alt=""
          id="s48"
          className="absolute top-[58%] left-[56%] rotate-[66deg] w-[200px]  z-10"
        />
        <img
          src={snake5}
          alt=""
          id="s62"
          className="absolute top-[47%] -left-[10%] -rotate-[80deg] w-[330px] z-10"
        />
        <img
          src={snake8}
          alt=""
          id="s17"
          className="absolute top-[78%] left-[33%] w-[270px] rotate-[18deg]  z-10"
        />
        <img
          src={snake9}
          alt=""
          id="s87"
          className="absolute top-[13%] left-[45%] rotate-[52deg] w-[190px]  z-10"
        />

        {[...Array(100)].map((_, i) => {
          const value =
            String(i).length === 1 ||
            (String(i).length === 2 && Number(String(i)[0]) % 2 === 0)
              ? 100 - i
              : String(
                  Number(`${9 - Number(String(i)[0])}${String(i)[1]}`) + 1
                );
          return (
            <div
              key={i}
              id={String(value)}
              className={`h-full w-full relative border-[0.1vmin] ${
                i === 0 || i % 10 === 0 ? "border-l-2" : ""
              } ${i < 10 ? "border-t-2" : ""} ${i >= 90 ? "border-b-2" : ""} ${
                (i + 1) % 10 === 0 ? "border-r-2" : ""
              } border-solid border-black flex justify-center items-center`}
              style={{ backgroundColor: colors[i] }}
            >
              {players?.map((player, index) => (
                <div
                  key={index}
                  id={player}
                  className={`players absolute ${
                    String(position[player]) === String(value)
                      ? "visible"
                      : "invisible"
                  } h-10 w-10 rounded-full opacity-[0.7]`}
                  style={{
                    backgroundColor: playerColors[index],
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

export default Board;
