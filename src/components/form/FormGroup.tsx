import type {
  PropsWithChildren,
  ComponentPropsWithoutRef,
  HTMLInputTypeAttribute,
} from "react";

interface FormGroupProps extends PropsWithChildren {
  readonly title?: string;
  readonly className?: string;
}

export function FormGroup({
  title,
  className,
  children,
}: Readonly<FormGroupProps>) {
  return (
    <fieldset {...(className && { className })}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}
