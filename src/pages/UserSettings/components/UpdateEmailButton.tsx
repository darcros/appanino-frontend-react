import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';

import { errorToMessage } from '../../../util/graphql';
import { useDoEmailUpdateMutation } from '../../../generated/graphql';
import { LoadingButton } from '../../../components/LoadingButton';

export const UpdateEmailButton: React.FC = () => {
  const { t } = useTranslation();
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);
  const [doEmailUpdate, { error }] = useDoEmailUpdateMutation();
  const errorMessage = errorToMessage(error);

  const newEmailValidationSchema = yup.object({
    newEmail: yup
      .string()
      .required(t('form.email.required'))
      .email(t('form.email.invalid')),
  });

  return (
    <React.Fragment>
      <Button onClick={() => setEmailModalOpen(true)} color="primary">
        {t('dialog.update-email.button')}
      </Button>

      <Formik
        initialValues={{
          newEmail: '',
        }}
        validationSchema={newEmailValidationSchema}
        onSubmit={async values => {
          await doEmailUpdate({ variables: values });
          setEmailModalOpen(false);
        }}
      >
        {({ isValidating, isSubmitting, resetForm }) => {
          const close = () => {
            if (isValidating || isSubmitting) return;
            resetForm();
            setEmailModalOpen(false);
          };

          return (
            <Dialog open={emailModalOpen} onClose={() => close()} aria-labelledby="email-update-dialog-title">
              <Form>
                <DialogTitle id="email-update-dialog-title">{t('dialog.update-email.title')}</DialogTitle>
                <DialogContent>
                  <DialogContentText>{t('dialog.update-email.instructions')}</DialogContentText>
                  <Field
                    name="newEmail"
                    component={TextField}
                    disabled={isValidating || isSubmitting}
                    label={t('dialog.update-email.new-email.label')}
                    type="email"
                    autoComplete="email"
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
