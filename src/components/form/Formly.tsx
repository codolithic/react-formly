import type {
  PropsWithChildren,
  ComponentPropsWithoutRef,
  HTMLInputTypeAttribute,
} from "react";
import FormlyProvider, { useFormlyContext } from "./formContext";

interface FormlyProps<
  TData extends Record<string, unknown>,
> extends PropsWithChildren {
  readonly initialData: TData;
  readonly id?: string;
  readonly wrapperClassName?: string;
  readonly className?: string;
  readonly submitHandler: (data: TData) => Promise<void>;
}

interface FormInputProps extends ComponentPropsWithoutRef<"input"> {
  readonly wrapperClassName?: string;
  readonly label: string;
  readonly id: string;
  readonly inputType: HTMLInputTypeAttribute;
}

interface FormGroupProps extends PropsWithChildren {
  readonly title?: string;
  readonly className?: string;
}

function FormInput({
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

function FormGroup({ title, className, children }: Readonly<FormGroupProps>) {
  return (
    <fieldset {...(className && { className })}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

function Formly<TFormData extends Record<string, unknown>>({
  id,
  initialData,
  wrapperClassName,
  className,
  submitHandler,
  children,
}: Readonly<FormlyProps<TFormData>>) {
  return (
    <FormlyProvider initialData={initialData}>
      <div
        {...(id && { id })}
        {...(wrapperClassName && { className: wrapperClassName })}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler(
              Object.fromEntries(new FormData(e.currentTarget)) as TFormData,
            );
          }}
          {...(className && { className })}
        >
          {children}

          {/* Submit Button */}
          <button type="submit">Submit Form</button>
        </form>
      </div>
    </FormlyProvider>
  );
}

Formly.Group = FormGroup;
Formly.Input = FormInput;

export { Formly };
