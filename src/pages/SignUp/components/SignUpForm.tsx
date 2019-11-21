import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from 'formik-material-ui';

import { useSchoolsQuery, useRegisterAndLoginMutation, UserRoleDocument } from '../../../generated/graphql';
import { saveToken } from '../../../graphql/client/token';
import { errorToMessage } from '../../../util/graphql';
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

interface SignUpFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  schoolId: string;
}

export const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [doRegistration, { error: registrationError }] = useRegisterAndLoginMutation();
  const { data: schools, loading: schoolsLoading, error: schoolsError } = useSchoolsQuery();
  const errorMessage = errorToMessage(registrationError || schoolsError);

  const registerAndSaveToken = async (values: SignUpFormValues) => {
    await doRegistration({
      variables: values,
      refetchQueries: ({ data }) => {
        if (!data) return [];

        saveToken(data.token);
        return [{ query: UserRoleDocument }];
      },
    });
  };

  const signUpSchema = yup.object<SignUpFormValues>({
    firstname: yup
      .string()
      .required(t('form.first-name.required'))
      .min(2, t('form.first-name.too-short', { count: 2 })),
    lastname: yup
      .string()
      .required(t('form.last-name.required'))
      .min(2, t('form.last-name.too-short', { count: 2 })),
    email: yup
      .string()
      .required(t('form.email.required'))
      .email(t('form.email.invalid')),
    password: yup
      .string()
      .min(8, t('form.password.too-short'))
      .required(t('dialog.update-password.old-password.required')),
    schoolId: yup
      .string()
      .required(t('form.school.required'))
      .notOneOf(['LOADING'], t('form.school.loading')),
  });

  return (
    <Formik<SignUpFormValues>
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        schoolId: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={registerAndSaveToken}
    >
      {({ isSubmitting }) => (
        <div className={classes.form}>
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="firstname"
                  component={TextField}
                  label={t('form.first-name.label')}
                  autoComplete="fname"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="lastname"
                  component={TextField}
                  label={t('form.last-name.label')}
                  autoComplete="lname"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  component={TextField}
                  label={t('form.email.label')}
                  type="email"
                  autoComplete="email"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  component={TextField}
                  label={t('form.password.label')}
                  type="password"
                  autoComplete="new-password"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="schoolId"
                  component={TextField}
                  label={t('form.school.label')}
                  disabled={!schools}
                  select
                  variant="outlined"
                  fullWidth
                >
                  {schools ? (
                    schools.schools.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={'LOADING'}>{t('form.school.loading')}</MenuItem>
                  )}
                </Field>
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              loading={isSubmitting}
              disabled={schoolsLoading}
              className={classes.submit}
              variant="contained"
              color="primary"
              fullWidth
            >
              {t('action.signUp')}
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
