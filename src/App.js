import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import styled from "styled-components";
import { RecoilRoot } from "recoil";
import ReactAudioPlayer from "react-audio-player";

import Plane from "./components/Plane";
import Player from "./components/Player";

import LightControl from "./components/LightControl";

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

function App() {
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
      </MusicBox>
      <Canvas shadows>
        <RecoilRoot>
          <LightControl />
          <Suspense fallback={null}>
            <Player></Player>
            <Plane></Plane>
          </Suspense>
          <Stats />
        </RecoilRoot>
      </Canvas>
    </Container>
  );
}

export default App;
