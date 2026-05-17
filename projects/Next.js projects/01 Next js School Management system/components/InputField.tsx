import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from "react-hook-form";

type RHFError = FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;

type InputFieldProps = {
  label: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  name: string;
  defaultValue?: string;
  error?: RHFError;
  hidden?: boolean;
  min?: string;
  max?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
  min,
  max
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label htmlFor={name} className="text-xs text-gray-400">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        id={name}
        name={name}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
        {...inputProps}
        defaultValue={defaultValue}
        min={min}
        max={max}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
