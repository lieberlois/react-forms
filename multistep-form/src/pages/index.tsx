import { Box, Button, Card, CardContent, Step, StepLabel, Stepper, Grid, CircularProgress } from '@material-ui/core';
import { Field, Formik, Form, FormikConfig, FormikValues } from "formik"
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { mixed, number, object } from 'yup';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: "",
            lastName: "",
            millionaire: false,
            money: 0,
            description: "",
          }}
          onSubmit={(values) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                console.log(values)
                resolve()
              }, 3000)
            })
          }}
        >
          <FormikStep label="Personal Data">
            <Box paddingBottom={2}>
              <Field fullWidth name="firstName" component={TextField} label="First Name" />
            </Box>
            <Box paddingBottom={2}>
              <Field fullWidth name="lastName" component={TextField} label="Last Name" />
            </Box>
            <Box paddingBottom={2}>
              <Field name="millionaire" type="checkbox" component={CheckboxWithLabel} Label={{ label: "I am a millionaire" }} />
            </Box>
          </FormikStep>
          <FormikStep
            label="Bank Account"
            validationSchema={object({
              money: mixed().when("millionaire", {
                is: true,
                then: number().required().min(1_000_000, "Millionaires need to have at least 1 million € in their account"),
                otherwise: number().required()
              })
            })}
          >
            <Box paddingBottom={2}>
              <Field fullWidth name="money" type="number" component={TextField} label="Net worth" />
            </Box>
          </FormikStep>
          <FormikStep label="More Information">
            <Box paddingBottom={2}>
              <Field fullWidth name="description" component={TextField} label="Description" />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent >
    </Card >
  );
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return (
    <>{children}</>
  )
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const stepArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = stepArray[step];
  const [completed, setCompleted] = useState(false);

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (step === stepArray.length - 1) {
          // Submit if last step
          await props.onSubmit(values, helpers);
          setCompleted(true);
          // helpers.resetForm();
          // setStep(0);
        } else {
          // Next step
          setStep(s => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {stepArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}

          <Grid container spacing={2}>
            {step > 0 && (
              <Grid item>
                <Button disabled={isSubmitting} variant="contained" color="primary" onClick={() => setStep(s => s - 1)}>Back</Button>
              </Grid>)
            }
            <Grid item>
              <Button
                startIcon={isSubmitting && <CircularProgress size="1rem" />}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {step === stepArray.length - 1 ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}