import React, { ReactNode } from 'react';
import { LoadingTwotoneLoop } from './icons/LoadingLoop';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  loading?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  className,
  icon,
  loading,
}) => {
  return (
    <button
      className={`${className} flex items-center gap-3 bg-mainOrange text-mainWhite py-3 px-7 rounded text-[14px] transition duration-200 ease-in-out hover:translate-y-[-5px] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {text} {icon}{' '}
      {loading && (
        <span className="w-4 h-4 text-mainWhite">
          <LoadingTwotoneLoop />
        </span>
      )}
    </button>
  );
};

export default PrimaryButton;
