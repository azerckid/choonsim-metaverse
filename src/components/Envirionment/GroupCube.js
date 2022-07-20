import React from "react";
import Cube from "./Cube";

function GroupCube(props) {
  return (
    <group>
      <Cube position={[0.5, 10, 2.5]} rotation={[10, 20, -30]} color={"teal"} />
      <Cube
        position={[5.5, 12, -2.5]}
        rotation={[30, -10, 20]}
        color={"teal"}
      />
      <Cube
        position={[0.5, 14, -2.5]}
        rotation={[-30, 20, 10]}
        color={"teal"}
      />
      <Cube position={[4.5, 16, 1.5]} rotation={[20, -10, 30]} color={"teal"} />
      <Cube
        position={[0.5, 18, -0.5]}
        rotation={[10, 30, -20]}
        color={"teal"}
      />
      <Cube position={[1.5, 20, 2]} rotation={[20, -10, 30]} color={"teal"} />
    </group>
  );
}

export default GroupCube;
