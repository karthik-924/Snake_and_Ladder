// import React from 'react'
// import { useEffect, useState } from "react";
import Dice from "react-dice-roll";
import "../pages/Home.css";
import Background from "../assets/Background.jpeg";

import ladder2 from "../assets/ladder22.png";
import snake1 from "../assets/s1.png";
import snake2 from "../assets/s2.png";
import snake3 from "../assets/s3.png";
import snake4 from "../assets/s4.png";
import snake7 from "../assets/s7.png";
import snake5 from "../assets/s5.png";
import snake8 from "../assets/s8.png";
import snake9 from "../assets/snake4.png";
const Board = ({ players, position, updateDiceValue, diceDisabled, roll }) => {
  const playerColors = ["#000000", "#000080", "#008800", "#ff9900"];
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
    <div className="bg-gray-300 font-serif w-screen h-screen flex gap-10 max-[550px]:gap-28 max-[400px]:gap-25 justify-center items-center relative max-[550px]:flex-col ">
      <img src={Background} className='w-full h-full absolute top-0 left-0 z-0' />
      <div className="bg-gray-300 font-serif max-[1200px] w-[55%] max-[1300px]:w-[60%] max-xl:w-[65%] max-[1150px]:w-[70%] max-[1040px]:w-[75%] h-[90%] grid-cols-10 grid relative max-[900px]:h-[80%] max-[900px]:w-[80%] max-[750px]:h-[70%] max-[750px]:w-[80%] max-[650px]:w-[70%] max-[650px]:h-[60%] max-[550px]:h-[60%] max-[550px]:w-[80%] max-[400px]:h-[50%] max-[400px]:w-[85%]">
      <img
          src={ladder2}
          alt=""
          id="l21"
          className="absolute top-[45%] left-[6%] w-[65px] z-10 h-[210px] rotate-[23deg] opacity-[0.8] max-[830px]:w-[63px] max-[830px]:left-[5%] max-[800px]:w-[56px] max-[750px]:w-[50px] max-[750px]:h-[180px] max-[650px]:left[3%] max-[650px]:h-[140px] max-[650px]:w-[30px] max-[650px]:rotate-[18deg] max-[440px]:w-[25px] max-[440px]:h-[130px] max-[380px]:w-[20px] max-[380px]:rotate-[16deg] max-[330px]:rotate-[14deg]"
        />
        <img
          src={ladder2}
          alt=""
          id="l4"
          className="absolute top-[72%] left-[46%] rotate-[74deg] w-[60px] h-[230px]  z-10 opacity-[0.8] max-[740px]:h-[200px] max-[740px]:w-[50px] max-[650px]:w-[40px] max-[650px]:h-[160px] max-[500px]:h-[150px] max-[500px]:rotate-[68deg] max-[500px]:w-[30px] max-[440px]:h-[130px] max-[440px]:top-[75%] max-[400px]:h-[110px] max-[320px]:h-[100px]"
        />
        <img
          src={ladder2}
          alt=""
          id="l19"
          className="absolute top-[51%] left-[21%] w-[65px] rotate-[38deg] h-[250px]  z-10 opacity-[0.8] max-[840px]:w-[63px] max-[840px]:h-[240px] max-[840px]:left-[20%] max-[750px]:h-[210px] max-[700px]:left-[18%] max-[700px]:w-[50px] max-[650px]:w-[30px] max-[650px]:h-[160px] max-[650px]:left-[20%] max-[650px]:rotate-[33deg] max-[420px]:rotate-[30deg] max-[370px]:h-[140px] max-[320px]:w-[25px]"
        />
        <img
          src={ladder2}
          alt=""
          id="l51"
          className="absolute top-[23%] left-[76.5%] -rotate-[74deg] w-[60px] z-10 opacity-[0.8] max-[750px]:h-[200px] max-[750px]:w-[50px] max-[650px]:h-[170px] max-[650px]:w-[40px] max-[650px]:top-[21%] max-[600px]:h-[150px] max-[600px]:top-[24%] max-[500px]:h-[130px] max-[500px]:-rotate-[68deg] max-[500px]:top-[26%] max-[440px]:h-[110px] max-[440px]:top-[28%] max-[440px]:w-[25px] max-[330px]:h-[100px]"
        />
        <img
          src={ladder2}
          alt=""
          id="l9"
          className="absolute top-[63%] left-[86%] rotate-[20deg] w-[65px] h-[230px]  z-10 opacity-[0.8] max-lg:w-[50px] max-sm:w-[40px] max-[770px]:w-[40px] max-[750px]:h-[200px] max-[650px]:h-[150px] max-[650px]:w-[30px] max-[530px]:rotate-[15deg] max-[500px]:h-[150px] max-[500px]:left-[85%] max-[440px]:w-[25px] max-[360px]:h-[130px]"
        />
        <img
          src={ladder2}
          alt="l72"
          className="absolute top-[2%] left-[88%] w-[45px] rotate-[30deg]  z-10 opacity-[0.8] max-[800px]:left-[85%] max-[750px]:h-[140px] max-[650px]:h-[110px] max-[650px]:w-[30px] max-[440px]:w-[25px]  max-[440px]:h-[100px] max-[400px]:h-[90px]"
        />
        <img
          src={ladder2}
          alt="l80"
          className="absolute top-[2%] left-[7%] w-[45px] rotate-[30deg]  z-10 opacity-[0.8] max-[740px]:h-[150px] max-[700px]:w-[40px] max-[650px]:w-[30px] max-[650px]:h-[120px] max-[500px]:rotate-[20deg] max-[400px]:h-[100px] max-[400px]:w-[25px] max-[320px]:left-[6%]"
        />
        <img
          src={ladder2}
          alt="l34"
          className="absolute top-[9%] left-[46%] w-[65px] -rotate-[37deg] h-[410px] z-10 opacity-[0.8] max-[900px]:h-[380px] max-[750px]:h-[350px] max-[750px]:w-[50px] max-[650px]:w-[40px] max-[650px]:h-[300px] max-[650px]:-rotate-[30deg] max-[510px]:h-[290px] max-[510px]:-rotate-[25deg] max-[400px]:h-[220px] max-[400px]:w-[25px]"
        />
        <img
          src={snake1}
          alt=""
          id="s64"
          className="absolute top-[28%] left-[9%] rotate-[25deg] w-[180px] z-20 max-[860px]:left-[5%] max-[740px]:left-[3%] max-[740px]:w-[160px] max-[740px]:rotate-[18deg] max-[650px]:w-[110px] max-[420px]:w-[90px] max-[420px]:rotate-[16deg] "
        />
        <img
          src={snake2}
          alt=""
          id="s92"
          className="absolute top-[5%] left-[73%] rotate-[70deg] w-[140px]  z-10 max-[840px]:left-[67%]  max-[750px]:w-[120px] max-[650px]:w-[100px] max-[440px]:left-[65%] max-[440px]:rotate-[65deg] max-[440px]:w-[80px]"
        />
        <img
          src={snake4}
          alt=""
          id="s95"
          className="absolute top-[2%] left-[27%] rotate-[110deg] w-[230px]  z-10 max-[940px]:left-[21%] max-[940px]:w-[220px] max-[750px]:left-[21%] max-[750px]:w-[180px] max-[750px]:rotate-[105deg] max-[650px]:w-[170px] max-[650px]:left-[20%] max-[590px]:left-[20%] max-[590px]:w-[150px] max-[460px]:w-[130px] max-[460px]:left-[20%] max-[370px]:w-[120px] max-[370px]:left-18%]"
        />
        <img
          src={snake7}
          alt=""
          id="s98"
          className="absolute top-[7%] left-[11%] -rotate-[60deg] w-[140px] z-10 max-[800px]:left-[6%] max-[640px]:top-[6%] max-[640px]:left-[1%]  max-[420px]:-left-[2%] max-[400px]:w-[100px] max-[400px]:left-[1%]"
        />
        <img
          src={snake3}
          alt=""
          id="s48"
          className="absolute top-[58%] left-[56%] rotate-[66deg] w-[200px]  z-10 max-[750px]:w-[190px] max-[750px]:left-[50%] max-[750px]:top-[56%] max-[650px]:left-[47%] max-[650px]:w-[175px] max-[475px]:left-[48%] max-[475px]:w-[160px] max-[440px]:left-[45%] max-[400px]:left-[48%] max-[400px]:w-[130px] max-[340px]:w-[110px]"
        />
        <img
          src={snake5}
          alt=""
          id="s62"
          className="absolute top-[47.3%] -left-[10%] -rotate-[80deg] w-[330px] z-10 max-[860px]:-left-[18%] max-[680px]:-left-[20%] max-[650px]:-left-[20%] max-[650px]:w-[250px] max-[480px]:w-[225px] max-[480px]:-left-[23%] max-[380px]:w-[190px] max-[380px]:-left-[20%]  "
        />
        <img
          src={snake8}
          alt=""
          id="s17"
          className="absolute top-[78%] left-[33%] w-[270px] rotate-[18deg]  z-10 max-[920px]:left-[29%] max-[780px]:w-[250px] max-[715px]:w-[220px] max-[650px]:w-[170px] max-[490px]:w-[140px] max-[490px]:rotate-[25deg] max-[490px]:top-[80%] max-[370px]:w-[120px]"
        />
        <img
          src={snake9}
          alt=""
          id="s87"
          className="absolute top-[13%] left-[45%] rotate-[52deg] w-[190px]  z-10 max-[900px]:left-[43%] max-[900px]:w-[150px] max-[650px]:left-[40%] max-[650px]:w-[120px] max-[440px]:left-[35%] max-[440px]:w-[120px] max-[440px]:rotate-[50deg] max-[400px]:left-[38%] max-[400px]:w-[100px]"
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
              {players?.map((player, index) => {
                // console.log(position);
                return(
                <div
                  key={index}
                  id={player}
                  className={`players absolute ${String(position[player]) === String(value)
                    ? "visible"
                    : "invisible"
                    } h-10 w-10 rounded-full opacity-[0.7]`}
                  style={{
                    backgroundColor: playerColors[index],
                  }}
                ></div>)
              })}
              {value}
            </div>
          );
        })}
      </div>
      <div id="dice-wrapper">
      <Dice
        onRoll={(value) => {
          updateDiceValue(value);
        }}
        triggers={['click']}
        size={100}
        disabled={diceDisabled}
        />
        </div>
    </div>
  );
};

export default Board;
