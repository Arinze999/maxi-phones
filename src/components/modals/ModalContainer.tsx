'use client';

import { ReactNode, useContext } from 'react';
import { ModalContext } from '@/context/ModalContext';
import { CancelCircle } from '../icons/CancelCircle';

interface ModalContainerProps {
  children: ReactNode;
  /** CSS width (e.g. '500px' or '50%') */
  width?: string;
  /** CSS padding (e.g. '30px 20px') */
  padding?: string;
  /** CSS margin-top */
  marginTop?: string;
}

export default function ModalContainer({
  children,
  width,
  padding,
  marginTop,
}: ModalContainerProps) {
  const { displayModal } = useContext(ModalContext) ?? {};
  const handleClose = () => displayModal?.(false);

  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg flex flex-col gap-9 ${
        !width ? 'w-fit' : ''
      }`}
      style={{
        width: width,
        padding: padding,
        marginTop: marginTop,
        marginBottom: '60px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleClose}
        className="self-end p-2 hover:scale-110 transition-transform"
      >
        <CancelCircle />
      </button>
      {children}
    </div>
  );
}
