import React from 'react';
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
import { mapErrorToMessage } from '../../../util/graphql';
import { useDoPasswordUpdateMutation } from '../../../generated/graphql';
import { LoadingButton } from '../../../components/LoadingButton';

interface UpdatePasswordFormState {
  oldPassword: string;
  newPassword: string;
}

export const UpdatePasswordButton: React.FC = () => {
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);
  const { register, handleSubmit, errors, getValues, reset } = useForm<UpdatePasswordFormState>();
  const [doPasswordUpdate, { loading, error }] = useDoPasswordUpdateMutation();

  const handleClose = (forceClose: boolean = false) => {
    if (!forceClose && loading) return;

    reset();
    setPasswordModalOpen(false);
  };

  const onSubmit = (formData: UpdatePasswordFormState) => {
    doPasswordUpdate({ variables: formData }).then(() => handleClose(true));
  };

  const errorMessage = error ? mapErrorToMessage(error.graphQLErrors[0], { WRONG_PASSWORD: 'Wrong password' }) : null;

  return (
    <React.Fragment>
      <Button onClick={() => setPasswordModalOpen(true)} color="primary">
        Change password
      </Button>

      <Dialog open={passwordModalOpen} onClose={() => handleClose()} aria-labelledby="password-update-dialog-title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="password-update-dialog-title">Change password</DialogTitle>
          <DialogContent>
            <DialogContentText>Type your current password and the new password that you wish to use.</DialogContentText>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="oldPassword"
              label="Current Password"
              type="password"
              autoComplete="current-password"
              inputRef={register({ required: 'Current password required' })}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword ? getErrorMessage(errors.oldPassword) : null}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              autoComplete="new-password"
              inputRef={register({
                required: 'New password required',
                validate: (value: string) => {
                  const { oldPassword } = getValues();
                  if (value === oldPassword) {
                    return 'The new password must be different from the old one';
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
              Cancel
            </Button>
            <LoadingButton loading={loading} type="submit" color="primary">
              Change password
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
