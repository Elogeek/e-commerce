import styled from "styled-components";
import { useContext } from "react";
import { ThemeContextProvider } from "../context/ThemeContext";

export const ThemeChooser = function () {
  const { theme, toggleMode } = useContext(ThemeContextProvider);
  return (
    <ButtonContainer>
      <button onClick={toggleMode}>Vers le mode</button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
