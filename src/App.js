import { Canvas } from "@react-three/fiber";

import Plane from "./components/Plane";
import Player from "./components/Player";
import styled from "styled-components";

// import CameraHelper from "./components/CameraHelper";
// import Box from "./components/Box";
import { Suspense } from "react";
import InputKeys from "./components/InputKeys";
import { RecoilRoot } from "recoil";
// import Controls from "./components/Controls";

import ReactAudioPlayer from "react-audio-player";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <h1>Hello, world! "TOM BODY" I_DLE</h1>
      <ReactAudioPlayer
        preload="auto"
        src="g_i_dle_tomboy.ogg"
        autoPlay={true}
        controls={true}
        volume={0.05}
      ></ReactAudioPlayer>
      <Canvas shadows>
        <RecoilRoot>
          <ambientLight />
          <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
          <directionalLight
            intensity={1.5}
            position={[-60, 100, -10]}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={200}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          <Suspense fallback={null}>
            <Player></Player>
            <Plane></Plane>
          </Suspense>
          <InputKeys />
        </RecoilRoot>
      </Canvas>
    </Container>
  );
}

export default App;
