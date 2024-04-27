import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useDarkMode();
  return (
    <StyledLogo>
      {darkMode ? (
        <Img src="/logo-dark.png" alt="logo" />
      ) : (
        <Img src="/logo-light.png" alt="Logo" />
      )}
    </StyledLogo>
  );
}

export default Logo;
