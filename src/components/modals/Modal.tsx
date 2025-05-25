// components/Modal.tsx
'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '@/context/ModalContext';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const { showModal } = useContext(ModalContext) ?? {};
  const [mounted, setMounted] = useState(false);

  // Only render on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (!mounted) return;
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal, mounted]);

  if (!mounted || !showModal) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-h-full overflow-auto">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
}
