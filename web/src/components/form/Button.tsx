import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
}
const Button = ({ children, color, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`
  w-60
  border-2 py-2 bg-${color}-400 border-${color}-400 text-white  rounded-md
  ${className}
  
  
  `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
