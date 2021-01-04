import { Checkbox, CheckboxProps, FormControlLabel } from "@material-ui/core";
import React from "react";

export interface CustumCheckboxProps extends CheckboxProps {
  name: string;
  label?: string;
  inputRef: React.Ref<any>;
}

export function CustomCheckboxHookForm({ name, label, inputRef }: CustumCheckboxProps) {
  return <FormControlLabel control={<Checkbox name={name} inputRef={inputRef} />} label={label} />
}