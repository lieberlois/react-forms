import { Checkbox, CheckboxProps, FormControlLabel } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

export interface CustumCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export function CustomCheckbox(props: CustumCheckboxProps) {
  const { name, value, label } = props;

  const [field] = useField({
    name: name,
    type: "checkbox",
    value: value
  })
  return <FormControlLabel control={<Checkbox {...props} {...field} />} label={label} />
}