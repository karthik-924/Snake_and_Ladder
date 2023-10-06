import React from "react";
import "./Loader.css";
import Background from '../assets/Background.jpeg'
import { CopyButton, ActionIcon, Tooltip, rem } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

const Loader = ({ noofplayers, roomCode }) => {
  return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-16 relative">
          <img src={Background} className='w-full h-full absolute top-0 left-0 z-0' />
      <div className="flex flex-col gap-1 border w-[300px] max-sm:w-[250px] border-gray-400 rounded-md border-solid p-5 z-10 bg-white">
        <div className="flex justify-between items-center border border-solid h-[50px] border-gray-300 p-5 pt-0 pb-0 rounded-lg">
          <p className="text-xl ">{roomCode}</p>
          <CopyButton value={roomCode} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  variant="subtle"
                  onClick={copy}
                >
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
              </div>
              <div className="flex flex-col">
                  <p className="text-md m-0">Waiting for players to join</p>
                    <p className="text-md m-0">No of players: {noofplayers}</p>
              </div>
      </div>
      <div className="loader-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loader;
