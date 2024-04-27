import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HiOutlineCog6Tooth, HiOutlineUsers } from "react-icons/hi2";
import { FaRegHandshake } from "react-icons/fa";
import { TbHomeStats } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <FaArrowTrendUp />
            <span>Market</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/shares">
            <FaRegHandshake />
            <span>Shares</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/stocks">
            <TbHomeStats />
            <span>Stocks</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
        <li style={{}}>
          <StyledNavLink to="/account">
            <MdOutlineAdminPanelSettings />
            <span>Account</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
