import * as React from "react";
import styled from "styled-components";
import { useProgress } from "@react-three/drei";

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20vw;
  font-family: sans-serif;
`;

export function Loader() {
  const { active, progress } = useProgress();

  return active ? (
    <LoaderWrapper>
      <span>{Math.floor(progress)}%</span>
    </LoaderWrapper>
  ) : null;
}
