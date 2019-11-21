import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';

import { useDoLoginMutation, UserRoleDocument } from '../../../generated/graphql';
import { saveToken } from '../../../graphql/client/token';
import { FormLoadingButton } from '../../../components/FormLoadingButton';
import { ApolloErrorMessage } from '../../../components/graphql/ApolloErrorMessage';

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

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [doLogin, { error }] = useDoLoginMutation();

  const login = async (values: LoginFormValues) => {
    await doLogin({
      variables: values,
      awaitRefetchQueries: true,
      refetchQueries: ({ data }) => {
        if (!data) return [];

        saveToken(data.login);
        return [{ query: UserRoleDocument }];
      },
    });
  };

  const loginValidationSchema = yup.object<LoginFormValues>({
    email: yup
      .string()
      .required(t('form.email.required'))
      .email(t('form.email.invalid')),
    password: yup.string().required(t('form.password.required')),
  });

  return (
    <Formik<LoginFormValues>
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={login}
    >
      {() => (
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
            <FormLoadingButton type="submit" className={classes.submit} fullWidth variant="contained" color="primary">
              {t('action.login')}
            </FormLoadingButton>
            <ApolloErrorMessage error={error} />
          </Form>
        </div>
      )}
    </Formik>
  );
};
