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
    <button className="bg-mainOrange text-mainWhite py-3 px-7 rounded text-[14px]">
      {text}
    </button>
  );
};

export default PrimaryButton;
