import { Card, CardContent, TextField, Typography, MenuItem, FormGroup, Box, Button, LinearProgress } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { array, boolean, mixed, number, object, string } from 'yup';
import { CustomCheckbox } from './CostumCheckbox';
import { InvestmentDetails } from './InvestmentDetails';



export function FormDemo() {
  const initialValues: InvestmentDetails = {
    fullName: '',
    initialInvestment: 0,
    investmentRisk: [],
    commentAboutInvestmentRisk: '',
    dependents: -1,
    acceptedTermsAndConditions: false
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>

        <Formik
          enableReinitialize
          validationSchema={
            object({
              fullName: string().required().min(2).max(100),
              initialInvestment: number().required().min(100),
              investmentRisk: array(string().oneOf(["High", "Medium", "Low"])).min(1),
              dependents: number().required().min(0).max(5),
              acceptedTermsAndConditions: boolean().required().oneOf([true]),
              commentAboutInvestmentRisk: mixed().when("investmentRisk", {
                is: (risks: string[]) => risks.find(risk => risk === "High"),
                then: string().required().min(20).max(100),
                otherwise: string().min(20).max(100)
              })
            })
          }
          initialValues={initialValues}
          onSubmit={(values: InvestmentDetails, formikHelpers: FormikHelpers<InvestmentDetails>) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(values)
                resolve()
              }, 5000)
            })
          }}
        >
          {({ values, errors, touched, isSubmitting, isValid }) => (
            <Form>
              <Box marginBottom={2} />
              { isSubmitting && <LinearProgress />}
              <Box marginBottom={1} />

              <FormGroup>
                <Field name="fullName" as={TextField} label="Full Name" />
              </FormGroup>
              <ErrorMessage name="fullName">{msg => <Typography color="error">{msg}</Typography>}</ErrorMessage>
              <Box marginBottom={3} />

              <FormGroup>
                <Field name="initialInvestment" as={TextField} type="number" label="Initial Investment" />
              </FormGroup>
              <ErrorMessage name="initialInvestment">{msg => <Typography color="error">{msg}</Typography>}</ErrorMessage>
              <Box marginBottom={3} />

              <FormGroup>
                <Typography variant="h5">Select the risks you want to take</Typography>
                <CustomCheckbox name="investmentRisk" label="High - Risky" value="High" />
                <CustomCheckbox name="investmentRisk" label="Medium - Balanced" value="Medium" />
                <CustomCheckbox name="investmentRisk" label="Low - Safe" value="Low" />
              </FormGroup>
              <ErrorMessage name="investmentRisk">{msg => <Typography color="error">{msg}</Typography>}</ErrorMessage>

              <Box marginBottom={3} />

              <FormGroup>
                <Field name="commentAboutInvestmentRisk" as={TextField} multiline rows={3} rowsMax={10} label="Comment" />
              </FormGroup>
              <ErrorMessage name="commentAboutInvestmentRisk">{msg => <Typography color="error">{msg}</Typography>}</ErrorMessage>

              <Box marginBottom={3} />

              <FormGroup>
                <Field name="dependents" label="Dependents" as={TextField} select>
                  <MenuItem value={-1} disabled={true}>Select ...</MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Field>
              </FormGroup>
              <ErrorMessage name="dependents">{msg => <Typography color="error">{msg}</Typography>}</ErrorMessage>

              <Box marginBottom={3} />

              <FormGroup>
                <CustomCheckbox name="acceptedTermsAndConditions" label="Accept terms and conditions" />
              </FormGroup>
              <ErrorMessage name="acceptedTermsAndConditions">{msg => <Typography color="error">{msg}</Typography>}</ErrorMessage>

              <Box marginBottom={3} />

              <Button type="submit" color="primary" variant="contained" disabled={isSubmitting || !isValid || Object.keys(touched).length === 0}>
                Submit
              </Button>


              {/* <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}


