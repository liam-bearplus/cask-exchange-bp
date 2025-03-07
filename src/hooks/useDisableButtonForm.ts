import { FieldValues, UseFormReturn } from "react-hook-form";

export const useDisableButtonForm = <T extends FieldValues>(
  form: UseFormReturn<T>
) => {
  const values = form.getValues();
  const defaultValues = form.formState.defaultValues || {};

  return !Object.entries(values).every(([key, value]) => {
    const isOptional =
      !(key in defaultValues) ||
      defaultValues[key as keyof typeof defaultValues] === undefined;
    return (
      isOptional || (value !== undefined && value !== "" && value !== null)
    );
  });
};
