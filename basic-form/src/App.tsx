import { Container } from '@material-ui/core';
import React from 'react';
import { FormDemoHookForm } from './hook-form/FormDemoHookForm';
import { FormikComponent } from './formik-component/FormDemoFormik';
import { FormikHook } from './formik-hook/FormDemoFormik';

enum FORM_TYPES {
  FormikComponent = 1,
  FormikHook = 2,
  HookForm = 3,
}

const FORM: FORM_TYPES = FORM_TYPES.FormikHook;

const App: React.FC = () => {
  return (
    <Container>
      { FORM === 1 && <FormikComponent />}
      { FORM === 2 && <FormikHook />}
      { FORM === 3 && <FormDemoHookForm />}

    </Container>
  );
};

export default App;
