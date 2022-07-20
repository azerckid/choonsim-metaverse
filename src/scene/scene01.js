import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import styled from "styled-components";
import { RecoilRoot } from "recoil";
import ReactAudioPlayer from "react-audio-player";

import Plane from "../components/Envirionment/Plane";
import Player from "../components/CharacterSystem/Player";
import LightControl from "../components/Envirionment/LightControl";
import Cube from "../components/Envirionment/Cube";

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
  h1 {
    margin: 10px;
    color: #fff;
  }
`;

function scene01() {
  return (
    <Container>
      <MusicBox>
        <h1>Hello, world! "TOM BODY" I_DLE</h1>
        <ReactAudioPlayer
          preload="auto"
          src="g_i_dle_tomboy.ogg"
          autoPlay={true}
          controls={true}
          volume={0.05}
        ></ReactAudioPlayer>
        <h1> | w | a | s | d |</h1>
      </MusicBox>
      <Canvas shadows>
        <RecoilRoot>
          <LightControl />
          <Suspense fallback={null}>
            <Physics>
              <Cube position={[0.5, 10, 1.5]} color={"teal"} />
              <Cube position={[1.5, 12, -0.5]} color={"teal"} />
              <Cube position={[0.5, 14, -2.5]} color={"teal"} />
              <Cube position={[1.5, 16, 0.5]} color={"teal"} />
              <Cube position={[0.5, 18, -0.5]} color={"teal"} />
              <Cube position={[1.5, 20, 0]} color={"teal"} />
              <Player></Player>
              <Plane rotation={[-Math.PI / 2, 0, 0]}></Plane>
            </Physics>
          </Suspense>
          <Stats />
        </RecoilRoot>
        <axesHelper scale={3} />
      </Canvas>
    </Container>
  );
}

export default scene01;
