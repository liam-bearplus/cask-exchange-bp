import { FieldValues, UseFormReturn } from "react-hook-form";

export const useDisableButtonForm = <T extends FieldValues>(
  form: UseFormReturn<T>
) => {
  const values = form.getValues();
  return !Object.values(values).every(
    (value) => value !== undefined && value !== "" && value !== null
  );
};
