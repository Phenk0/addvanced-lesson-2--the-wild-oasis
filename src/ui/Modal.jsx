import styled from 'styled-components';
import { HiOutlineXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick.js';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();
function Modal({ children }) {
  const [activeModalName, setActiveModalName] = useState('');

  const closeModal = () => setActiveModalName('');
  const openModal = setActiveModalName;
  return (
    <ModalContext.Provider value={{ activeModalName, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({ children, modalName }) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal(modalName) });
}

function Window({ children, modalName }) {
  const { activeModalName, closeModal } = useContext(ModalContext);
  const ref = useOutsideClick(closeModal);
  if (modalName !== activeModalName) return null;
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <Overlay>
      <StyledModal
        onKeyDown={handleKeyDown}
        role="dialog"
        tabIndex={-1}
        ref={ref}
      >
        <Button onClick={closeModal} aria-label="Close Modal">
          <HiOutlineXMark />
        </Button>
        {cloneElement(children, { onCloseModal: closeModal })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Trigger = Trigger;
Modal.Window = Window;
export default Modal;
