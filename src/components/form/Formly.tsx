import type { PropsWithChildren } from "react";
import FormlyProvider from "./formContext";
import { FormGroup } from "./FormGroup";
import { FormInput } from "./FormInput";

interface FormlyProps<
  TData extends Record<string, unknown>,
> extends PropsWithChildren {
  readonly initialData: TData;
  readonly id?: string;
  readonly wrapperClassName?: string;
  readonly className?: string;
  readonly submitHandler: (data: TData) => Promise<void>;
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
