import { Card, CardContent, TextField, Typography, FormGroup, Box, Button, LinearProgress } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, number, object, string } from 'yup';
import { CustomCheckboxHookForm } from './CostumCheckboxHookForm';


const validationSchema = object({
  fullName: string().required().min(2).max(100),
  initialInvestment: number().required().min(100),
  acceptedTermsAndConditions: boolean().required().oneOf([true]),
})


export function FormDemoHookForm() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(data)
        resolve()
      }, 5000)
    })
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={2} />
          {formState.isSubmitting && <LinearProgress />}
          <Box marginBottom={1} />
          <FormGroup>
            <TextField name="fullName" id="fullName" label="Full Name" inputRef={register} />
          </FormGroup>
          <Box marginBottom={3} />

          <FormGroup>
            <TextField name="initialInvestment" id="initialInvestment" label="Initial Investment" inputRef={register} />
          </FormGroup>
          <Box marginBottom={3} />

          <FormGroup>
            <TextField name="commentAboutInvestmentRisk" id="commentAboutInvestmentRisk" multiline rows={3} rowsMax={10} label="Comment" inputRef={register} />
          </FormGroup>
          <Box marginBottom={3} />

          <FormGroup>
            <CustomCheckboxHookForm name="acceptedTermsAndConditions" label="Accept Terms and Conditions" inputRef={register} />
          </FormGroup>
          <Box marginBottom={3} />

          <Button type="submit" color="primary" variant="contained" disabled={!formState.isDirty || !formState.isValid || formState.isSubmitting}>
            Submit
          </Button>


          <pre>{JSON.stringify(errors, null, 4)}</pre>
        </form>
      </CardContent>
    </Card>
  );
}


