import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const handleClose = ({ target, currentTarget, code }) => {
    if (code === 'Escape') {
      onClose();
    }

    if (target === currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  });

  return createPortal(
    <Overlay onClick={handleClose}>
      <StyledModal>{children}</StyledModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
