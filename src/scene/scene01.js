import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import ReactAudioPlayer from "react-audio-player";

import styled from "styled-components";
import { RecoilRoot } from "recoil";
import io from "socket.io-client";

import Plane from "../components/Envirionment/Plane";
import Player from "../components/CharacterSystem/Player";
import LightControl from "../components/Envirionment/LightControl";
import GroupCube from "../components/Envirionment/GroupCube";
import MoviePlane from "../components/Envirionment/MoviePlane";
import { Loader } from "../components/Loader/Loader";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
`;
const MusicBox = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  h1 {
    margin: 10px;
    color: #fff;
  }
`;

// const socket = io("https://mogame-server-01.herokuapp.com/");
const socket = io("http://localhost:5000");

function scene01() {
  socket.on("connect", () => {
    console.log("connected");
  });

  return (
    <Container>
      <MusicBox>
        <h1>Hello, world! "TOM BODY" I_DLE</h1>
        <ReactAudioPlayer
          preload="auto"
          src="g_i_dle_tomboy.ogg"
          autoPlay={true}
          controls
          repeat
          volume={0.05}
        ></ReactAudioPlayer>
        <h1> | w | a | s | d |</h1>
      </MusicBox>
      <Loader />
      <Canvas shadows>
        <RecoilRoot>
          <LightControl />
          <Suspense fallback={null}>
            <Physics>
              <GroupCube />
              <Player></Player>
              <Plane rotation={[-Math.PI / 2, 0, 0]}></Plane>
            </Physics>
            {/* <MoviePlane position={[15, 7, -10]} rotation={[0, 5, 0]} /> */}
            <MoviePlane position={[0, 7, -20]} />
            {/* <MoviePlane position={[-15, 7, -10]} rotation={[0, -5, 0]} /> */}
            <Stats />
          </Suspense>
          <Stats />
        </RecoilRoot>
        <axesHelper scale={3} />
      </Canvas>
    </Container>
  );
}

export default scene01;
