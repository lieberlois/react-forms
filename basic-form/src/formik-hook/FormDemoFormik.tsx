import { Card, CardContent, TextField, Typography, FormGroup, Box, Button, LinearProgress, FormControlLabel, Checkbox } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { boolean, number, object, string } from 'yup';
import { InvestmentDetails } from '../InvestmentDetails';

type SubInvestmentDetails = Pick<InvestmentDetails, "fullName" | "initialInvestment" | "commentAboutInvestmentRisk" | "acceptedTermsAndConditions">


export function FormikHook() {
  const initialValues: SubInvestmentDetails = {
    fullName: '',
    initialInvestment: 0,
    commentAboutInvestmentRisk: '',
    acceptedTermsAndConditions: false
  }

  const formik = useFormik({
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema:
      object({
        fullName: string().required().min(2).max(100),
        initialInvestment: number().required().min(100),
        acceptedTermsAndConditions: boolean().required().oneOf([true]),
      }),


    initialValues: initialValues,
    onSubmit: (values: SubInvestmentDetails) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(values)
          resolve()
        }, 5000)
      })
    }
  })



  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box marginBottom={2} />
          {formik.isSubmitting && <LinearProgress />}
          <Box marginBottom={1} />

          <FormGroup>
            <TextField name="fullName" label="Full Name" onChange={formik.handleChange} value={formik.values.fullName} />
          </FormGroup>
          <Box marginBottom={3} />

          <FormGroup>
            <TextField name="initialInvestment" label="Initial Investment" type="number" onChange={formik.handleChange} value={formik.values.initialInvestment} />
          </FormGroup>
          <Box marginBottom={3} />

          <FormGroup>
            <TextField name="commentAboutInvestmentRisk" label="Comment" multiline rows={3} rowsMax={10} onChange={formik.handleChange} value={formik.values.commentAboutInvestmentRisk} />
          </FormGroup>

          <Box marginBottom={3} />

          <FormGroup>
            <FormControlLabel control={<Checkbox name={"acceptedTermsAndConditions"} onChange={formik.handleChange} value={formik.values.acceptedTermsAndConditions} />} label={"Accept terms and conditions"} />
          </FormGroup>

          <Box marginBottom={3} />

          <Button type="submit" color="primary" variant="contained" disabled={formik.isSubmitting || !formik.isValid}>
            Submit
          </Button>


          <pre>{JSON.stringify(formik.errors, null, 4)}</pre>
          <pre>{JSON.stringify(formik.isValid, null, 4)}</pre>
          <pre>{JSON.stringify(formik.touched, null, 4)}</pre>
        </form>

      </CardContent>
    </Card>
  );
}


