import styled, { keyframes } from "styled-components";

const jackpotGradient = keyframes`
  0% {
    background: #6666ff;
  }
  15% {
    background: #0099ff;
  }
  30% {
    background: #00ff55;
  }
  45% {
    background: #ffe44d;
  }
  60% {
    background: #ff5c4d;
  }
  75% {
    background: #ff3399;
  }
  90% {
    background: #6666ff;
  }
  100% {
    background: #6666ff;
  }
`;

const skeletonAnimation = keyframes`
  0%, 100% {
    background-color: #cccccc11;
  }
  50% {
    background-color: #cccccc22;
  }
`;

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Profit = styled.div<{ $win: boolean }>`
  display: flex;
  gap: 0.5em;
  align-items: center;
  color: ${(props) => (props.$win ? "#69E277" : "#FF6060")};
  border-radius: 10px;
  padding: 1px 5px;
`;

export const Jackpot = styled.div`
  animation: ${jackpotGradient} 1s linear 0s infinite;
  display: flex;
  gap: 0.5em;
  align-items: center;
  color: black;
  border-radius: 10px;
  padding: 1px 5px;
`;

export const Recent = styled.a`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5em;
  text-wrap: nowrap;
  padding: 10px;
  color: unset;
  text-decoration: none;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid rgba(168, 168, 168, 0.10);
  background: #0F0F0F;
  &:hover {
    background: #131724;
  }
`;

export const Skeleton = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s infinite;
`;
