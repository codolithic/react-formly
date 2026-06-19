import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

export interface FormContextData<TData extends Record<string, unknown>> {
  formData: TData;
  setFormData: (data: TData) => void;
}

const createFormContext = <TData extends Record<string, unknown>>() =>
  createContext<FormContextData<TData> | null>(null);

const FormContext = createFormContext();

export default function FormlyProvider<TData extends Record<string, unknown>>({
  initialData,
  children,
}: PropsWithChildren<{ initialData: TData }>) {
  const [formData, setFormData] = useState<TData>(initialData);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData(data) {
          setFormData(data as TData);
        },
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormlyContext() {
  const context = useContext(FormContext);
  if (context === undefined || context === null) {
    throw new Error("FormContext must be rendered within Formly component");
  }
  return context;
}
