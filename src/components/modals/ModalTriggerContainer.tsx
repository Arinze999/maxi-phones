'use client';

import React, { useContext, forwardRef } from 'react';
import { ModalContext } from '@/context/ModalContext';

interface ModalTriggerContainerProps {
  children: React.ReactNode;
  /** Custom CSS width (e.g. '200px' or '50%') */
  width?: string;
  /** Additional Tailwind classes */
  className?: string;
}

const ModalTriggerContainer = forwardRef<
  HTMLDivElement,
  ModalTriggerContainerProps
>(({ children, width, className }, ref) => {
  const { displayModal } = useContext(ModalContext) ?? {};

  const handleClick = () => {
    displayModal?.(true);
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`${className ?? ''} inline-block cursor-pointer`}
      style={width ? { width } : undefined}
    >
      {children}
    </div>
  );
});

ModalTriggerContainer.displayName = 'ModalTriggerContainer';
export default ModalTriggerContainer;
