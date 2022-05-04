import { Canvas } from "@react-three/fiber";

import Plane from "./components/Plane";
import Player from "./components/Player";
import styled from "styled-components";

// import CameraHelper from "./components/CameraHelper";
// import Box from "./components/Box";
import { Suspense } from "react";
import InputKeys from "./components/InputKeys";
import { RecoilRoot } from "recoil";
import Controls from "./components/Controls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <h1>Hello, world!</h1>
      <Canvas
        shadows
        // camera={{
        //   position: [-1, 2, 2],
        //   fov: 60,
        //   near: 1,
        //   far: 1000,
        // }}
      >
        <RecoilRoot>
          {/* <CameraHelper></CameraHelper> */}
          <Controls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
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
