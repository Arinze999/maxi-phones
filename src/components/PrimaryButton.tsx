import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={`${className} bg-mainOrange text-mainWhite py-3 px-7 rounded text-[14px] transition duration-200 ease-in-out hover:translate-y-[-5px] cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
