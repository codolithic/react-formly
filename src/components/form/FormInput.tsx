import type { ComponentPropsWithoutRef, HTMLInputTypeAttribute } from "react";

interface FormInputProps extends ComponentPropsWithoutRef<"input"> {
  readonly wrapperClassName?: string;
  readonly label: string;
  readonly id: string;
  readonly inputType: HTMLInputTypeAttribute;
}

export function FormInput({
  id,
  label,
  inputType,
  wrapperClassName,
  ...rest
}: FormInputProps) {
  const { name } = rest;

  return (
    <div key={id} {...(wrapperClassName && { className: wrapperClassName })}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name || id} type={inputType} {...rest} />
    </div>
  );
}
