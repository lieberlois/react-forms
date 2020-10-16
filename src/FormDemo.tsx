import { Card, CardContent, TextField, Typography, MenuItem, FormGroup, Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { CustomCheckbox } from './CostumCheckbox';
import { InvestmentDetails } from './InvestmentDetails';



export function FormDemo() {
  const initialValues: InvestmentDetails = {
    fullName: '',
    initialInvestment: undefined,
    investmentRisk: [],
    commentAboutInvestmentRisk: '',
    dependents: -1,
    acceptedTermsAndConditions: false
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>

        <Formik initialValues={initialValues} onSubmit={() => { }}>
          {({ values }) => (
            <Form>
              <Box marginBottom={2} />
              <FormGroup>
                <Field name="fullName" as={TextField} label="Full Name" />
              </FormGroup>
              <Box marginBottom={3} />

              <FormGroup>
                <Field name="initialInvestment" type="number" as={TextField} label="Initial Investment" />
              </FormGroup>
              <Box marginBottom={3} />

              <FormGroup>
                <Typography variant="h5">Select the risk you want to take</Typography>
                <CustomCheckbox name="investmentRisk" label="High - Risky" value="Minimum" />
                <CustomCheckbox name="investmentRisk" label="Medium - Balanced" value="Medium" />
                <CustomCheckbox name="investmentRisk" label="Low - Safe" value="Low" />
              </FormGroup>
              <Box marginBottom={3} />

              <FormGroup>
                <Field name="commentAboutInvestmentRisk" as={TextField} multiline rows={3} rowsMax={10} label="Comment" />
              </FormGroup>
              <Box marginBottom={3} />

              <FormGroup>
                <Field name="dependents" label="Dependents" as={TextField} select>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Field>
              </FormGroup>
              <Box marginBottom={3} />

              <FormGroup>
                <CustomCheckbox name="acceptedTermsAndConditions" label="Accept terms and conditions" />
              </FormGroup>
              <Box marginBottom={3} />

              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}


