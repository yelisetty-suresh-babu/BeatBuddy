import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Define keyframes
const quietAnimation = keyframes`
  25% {
    transform: scaleY(0.6);
  }
  50% {
    transform: scaleY(0.4);
  }
  75% {
    transform: scaleY(0.8);
  }
`;

const normalAnimation = keyframes`
  25% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.4);
  }
  75% {
    transform: scaleY(0.6);
  }
`;

const loudAnimation = keyframes`
  25% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.4);
  }
  75% {
    transform: scaleY(1);
  }
`;

// Define styled components
const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 150px;
  // width: 300px;
  border-radius: 10%;
  // border: 1px black solid;
  padding: 4px;
`;

const Box = styled.div`
  transform: scaleY(0.4);
  height: 100%;
  width: 12px;
  // background: white;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 48px;
  margin: 0px 4px;

  &.box1 {
    animation-name: ${quietAnimation};
  }

  &.box2 {
    animation-name: ${normalAnimation};
  }

  &.box3 {
    animation-name: ${quietAnimation};
  }

  &.box4 {
    animation-name: ${loudAnimation};
  }

  &.box5 {
    animation-name: ${quietAnimation};
  }
`;

const AnimeBtn = () => {
  const [clicked, setClicked] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BoxContainer
        onClick={() => {
          setClicked(false);
          setTimeout(() => setClicked(true), 5000);
        }}
        className=""
      >
        {clicked ? (
          <>
            <Box className="box bg-skin-fill-2" />
            <Box className="box bg-skin-fill-2" />
            <Box className="box bg-skin-fill-2" />
            <Box className="box bg-skin-fill-2" />
            <Box className="box bg-skin-fill-2" />
          </>
        ) : (
          <>
            <Box className="box box1 bg-skin-fill-2" />
            <Box className="box box2 bg-skin-fill-2" />
            <Box className="box box3 bg-skin-fill-2" />
            <Box className="box box4 bg-skin-fill-2" />
            <Box className="box box5 bg-skin-fill-2" />
          </>
        )}
      </BoxContainer>
    </div>
  );
};

export default AnimeBtn;
