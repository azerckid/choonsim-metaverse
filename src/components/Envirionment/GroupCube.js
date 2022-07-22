import React from "react";
import Cube from "./Cube";

function GroupCube(props) {
  return (
    <group>
      <Cube
        position={[6.5, 10, -4.5]}
        rotation={[10, 20, -30]}
        color={"teal"}
      />
      <Cube
        position={[5.5, 12, -3.5]}
        rotation={[30, -10, 20]}
        color={"teal"}
      />
      <Cube
        position={[2.5, 14, -5.5]}
        rotation={[-30, 20, 10]}
        color={"teal"}
      />
      <Cube
        position={[-4.5, 16, -4.5]}
        rotation={[20, -10, 30]}
        color={"teal"}
      />
      <Cube
        position={[-2.5, 18, -3.5]}
        rotation={[10, 30, -20]}
        color={"teal"}
      />
      <Cube
        position={[-1.5, 20, -3.5]}
        rotation={[20, -10, 30]}
        color={"teal"}
      />
    </group>
  );
}

export default GroupCube;
