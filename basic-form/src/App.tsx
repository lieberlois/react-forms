import { Container } from '@material-ui/core';
import React from 'react';
import { FormDemoHookForm } from './hook-form/FormDemoHookForm';
import { FormDemoFormik } from './formik/FormDemoFormik';

enum FORM_TYPES {
  Formik = 1,
  HookForm = 2,
}

const FORM: FORM_TYPES = FORM_TYPES.HookForm;

const App: React.FC = () => {
  return (
    <Container>
      { FORM === 1 && <FormDemoFormik />}
      { FORM === 2 && <FormDemoHookForm />}

    </Container>
  );
};

export default App;
