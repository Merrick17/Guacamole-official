import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0% { transform: scale(1.2, 1.2); }
  100% { transform: scale(1, 1); }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 40px;
  justify-content: center;
  place-items: center;
  width: 469px;
  height: 280px;
`;

export const Option = styled.button<{ $selected?: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  color: black;
  margin: 0;
  padding: 0;
  transition: opacity 0.1s;
  opacity: ${({ $selected }) => ($selected ? 1 : 0.6)};
  outline: none;
`;

export const Card = styled.div`
  border-radius: 5px;
  background: white;
  color: black;
  font-size: 32px;
  width: 100px;
  height: 120px;
  left: 0;
  top: 0;
  animation: ${bounce} 0.5s;
  text-align: center;
  position: relative;
  border: 4px solid #ffffff;
  user-select: none;
  background-color: #e5e7eb;
  .rank {
    font-weight: bold;
    font-size: 32px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #333;
    z-index: 1;
  }
  .suit {
    font-size: 64px;
    color: #00000033;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const OverlayText = styled.div`
  font-size: 1.5rem;
  color: red;
  font-weight: bold;
`;
