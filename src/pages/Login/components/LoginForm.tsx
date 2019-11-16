import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';

import { LoadingButton } from '../../../components/LoadingButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormProps {
  loading: boolean;
  errorMessage?: string;
  onSubmit: (formState: LoginFormState) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ loading: mutationLoading, errorMessage, onSubmit }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .required(t('form.email.required'))
      .email(t('form.email.invalid')),
    password: yup.string().required(t('form.password.required')),
  });

  return (
    <Formik<LoginFormState>
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isValidating, isSubmitting }) => (
        <div className={classes.form}>
          <Form>
            <Field
              name="email"
              component={TextField}
              label={t('form.email.label')}
              type="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Field
              name="password"
              component={TextField}
              label={t('form.password.label')}
              type="password"
              autoComplete="password"
              autoFocus
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <LoadingButton
              type="submit"
              loading={isValidating || isSubmitting || mutationLoading}
              className={classes.submit}
              fullWidth
              variant="contained"
              color="primary"
            >
              {t('action.login')}
            </LoadingButton>
            {errorMessage && (
              <Typography color="error" align="center" component="h3" variant="subtitle2">
                {errorMessage}
              </Typography>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
};
