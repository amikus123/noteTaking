import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProsp extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  label?: string;
  error: FieldError | undefined;
}
const Input = ({
  register,
  label,
  id,
  error,
  required,
  type,
  ...rest
}: InputProsp) => {
  return (
    <div className="flex flex-col gap-4">
      {label !== undefined && (
        <label htmlFor={id}>
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        className="border border-1 p-2 rounded-md"
        required={required}
        type={type}
        {...register}
        {...rest}
      ></input>
      {error && <p>{error?.message}</p>}
    </div>
  );
};

export default Input;
