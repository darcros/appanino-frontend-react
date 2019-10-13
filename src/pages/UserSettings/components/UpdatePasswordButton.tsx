import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { getErrorMessage } from '../../../util/form';
import { errorToMessage } from '../../../util/graphql';
import { useDoPasswordUpdateMutation } from '../../../generated/graphql';
import { LoadingButton } from '../../../components/LoadingButton';

interface UpdatePasswordFormState {
  oldPassword: string;
  newPassword: string;
}

export const UpdatePasswordButton: React.FC = () => {
  const { t } = useTranslation();
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);
  const { register, handleSubmit, errors, getValues, reset } = useForm<UpdatePasswordFormState>();
  const [doPasswordUpdate, { loading, error }] = useDoPasswordUpdateMutation();
  const errorMessage = errorToMessage(error);

  const handleClose = (forceClose: boolean = false) => {
    if (!forceClose && loading) return;

    reset();
    setPasswordModalOpen(false);
  };

  const onSubmit = (formData: UpdatePasswordFormState) => {
    doPasswordUpdate({ variables: formData }).then(() => handleClose(true));
  };

  return (
    <React.Fragment>
      <Button onClick={() => setPasswordModalOpen(true)} color="primary">
        {t('dialog.update-password.button')}
      </Button>

      <Dialog open={passwordModalOpen} onClose={() => handleClose()} aria-labelledby="password-update-dialog-title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="password-update-dialog-title">{t('dialog.update-password.title')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t('dialog.update-password.instructions')}</DialogContentText>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="oldPassword"
              label={t('dialog.update-password.old-password.label')}
              type="password"
              autoComplete="current-password"
              inputRef={register({ required: t('dialog.update-password.old-password.required') })}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword ? getErrorMessage(errors.oldPassword) : null}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="newPassword"
              label={t('dialog.update-password.new-password.label')}
              type="password"
              autoComplete="new-password"
              inputRef={register({
                required: t('dialog.update-password.new-password.required'),
                validate: (value: string) => {
                  const { oldPassword } = getValues();
                  if (value === oldPassword) {
                    return t('error.same-password');
                  }
                },
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword ? getErrorMessage(errors.newPassword) : null}
              disabled={loading}
            />
            {errorMessage && (
              <Typography color="error" align="center" component="h3" variant="subtitle2">
                {errorMessage}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} disabled={loading} color="secondary">
              {t('action.cancel')}
            </Button>
            <LoadingButton loading={loading} type="submit" color="primary">
              {t('action.confirm')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
