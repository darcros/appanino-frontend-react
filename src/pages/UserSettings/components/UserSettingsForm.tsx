import React from 'react';
import { useTranslation } from 'react-i18next';
import isEquals from 'lodash.isequal';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from 'formik-material-ui';

import { useDoUserInfoUpdateMutation } from '../../../generated/graphql';
import { FormLoadingButton } from '../../../components/FormLoadingButton';

interface UserSettingsFormProps {
  currentSettings: {
    firstname: string;
    lastname: string;
    schoolId: string;
  };
  schools: {
    id: string;
    name: string;
  }[];
}

export const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ currentSettings, schools }) => {
  const { t } = useTranslation();
  const [doUserInfoUpdate, { hasError }] = useDoUserInfoUpdateMutation();

  const userSettingsValidationSchema = yup.object({
    firstname: yup
      .string()
      .required(t('form.first-name.required'))
      .min(2, t('form.first-name.too-short', { count: 2 })),
    lastname: yup
      .string()
      .required(t('form.last-name.required'))
      .min(2, t('form.last-name.too-short', { count: 2 })),
  });

  return (
    <Formik
      initialValues={currentSettings}
      validationSchema={userSettingsValidationSchema}
      onSubmit={values =>
        doUserInfoUpdate({
          variables: values,
        })
      }
    >
      {({ values }) => (
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
                name="schoolId"
                component={TextField}
                label={t('form.school.label')}
                select
                variant="outlined"
                fullWidth
              >
                {schools.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <FormLoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isEquals(values, currentSettings)}
              >
                {t('action.save')}
              </FormLoadingButton>
              {hasError && (
                <Typography color="error" align="center" component="h3" variant="subtitle2">
                  {t('error.generic')}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
