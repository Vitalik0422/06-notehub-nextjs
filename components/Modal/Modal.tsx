//styles
import css from './Modal.module.css';

import { createPortal } from 'react-dom';
import React, { useEffect, type MouseEvent } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEscClick = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscClick);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscClick);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackDropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackDropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
};

export default Modal;
