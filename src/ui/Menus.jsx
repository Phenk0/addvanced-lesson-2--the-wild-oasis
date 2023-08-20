import styled from 'styled-components';
import { createContext, useContext, useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick.js';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props?.$position?.x}px;
  top: ${(props) => props?.$position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext({});

function Menus({ children }) {
  const [activeMenusName, setActiveMenusName] = useState('');
  const [activeMenuPosition, setActiveMenuPosition] = useState(null);
  const closeMenus = () => setActiveMenusName('');
  const openMenus = setActiveMenusName;
  const setMenuPosition = setActiveMenuPosition;
  return (
    <MenusContext.Provider
      value={{
        activeMenusName,
        closeMenus,
        openMenus,
        activeMenuPosition,
        setMenuPosition
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ menusName }) {
  const { activeMenusName, closeMenus, openMenus, setMenuPosition } =
    useContext(MenusContext);
  function handleClick(event) {
    const rect = event.target.closest('button').getBoundingClientRect();
    activeMenusName === '' || activeMenusName !== menusName
      ? openMenus(menusName)
      : closeMenus();
    setMenuPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8
    });
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ menusName, children }) {
  const { activeMenusName, activeMenuPosition, closeMenus } =
    useContext(MenusContext);
  const ref = useOutsideClick(closeMenus);
  if (activeMenusName !== menusName) return null;
  return createPortal(
    <StyledList ref={ref} $position={activeMenuPosition}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ icon, children, onClick }) {
  const { closeMenus } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    closeMenus();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
