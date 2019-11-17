import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';

import { errorToMessage } from '../../../util/graphql';
import { useDoPasswordUpdateMutation } from '../../../generated/graphql';
import { LoadingButton } from '../../../components/LoadingButton';

export const UpdatePasswordButton: React.FC = () => {
  const { t } = useTranslation();
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);
  const [doPasswordUpdate, { error }] = useDoPasswordUpdateMutation();
  const errorMessage = errorToMessage(error);

  const newPasswordValidationSchema = yup.object({
    oldPassword: yup
      .string()
      .min(8, t('form.password.too-short'))
      .required(t('dialog.update-password.old-password.required')),
    newPassword: yup
      .string()
      .required(t('dialog.update-password.new-password.required'))
      .min(8, t('form.password.too-short'))
      // eslint-disable-next-line i18next/no-literal-string
      .notOneOf([yup.ref('oldPassword')], t('error.same-password')),
  });

  return (
    <React.Fragment>
      <Button onClick={() => setPasswordModalOpen(true)} color="primary">
        {t('dialog.update-password.button')}
      </Button>

      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
        }}
        validationSchema={newPasswordValidationSchema}
        onSubmit={async values => {
          await doPasswordUpdate({ variables: values });
          setPasswordModalOpen(false);
        }}
      >
        {({ isValidating, isSubmitting, resetForm }) => {
          const close = () => {
            if (isValidating || isSubmitting) return;
            resetForm();
            setPasswordModalOpen(false);
          };

          return (
            <Dialog open={passwordModalOpen} onClose={() => close()} aria-labelledby="password-update-dialog-title">
              <Form>
                <DialogTitle id="password-update-dialog-title">{t('dialog.update-password.title')}</DialogTitle>
                <DialogContent>
                  <DialogContentText>{t('dialog.update-password.instructions')}</DialogContentText>
                  <Field
                    name="oldPassword"
                    component={TextField}
                    disabled={isValidating || isSubmitting}
                    label={t('dialog.update-password.old-password.label')}
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Field
                    name="newPassword"
                    component={TextField}
                    disabled={isValidating || isSubmitting}
                    label={t('dialog.update-password.new-password.label')}
                    type="password"
                    autoComplete="new-password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  {errorMessage && (
                    <Typography color="error" align="center" component="h3" variant="subtitle2">
                      {errorMessage}
                    </Typography>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => close()} disabled={isValidating || isSubmitting} color="secondary">
                    {t('action.cancel')}
                  </Button>
                  <LoadingButton loading={isValidating || isSubmitting} type="submit" color="primary">
                    {t('action.confirm')}
                  </LoadingButton>
                </DialogActions>
              </Form>
            </Dialog>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
