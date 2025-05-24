// components/Modal.tsx
'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '@/context/ModalContext';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const modalContext = useContext(ModalContext);
  const [mounted, setMounted] = useState(false);

  // Wait until we're on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !modalContext?.showModal) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        p-4 h-screen overflow-hidden border
      "
    >
 
        {children}

    </div>,
    modalRoot
  );
}
