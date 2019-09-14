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

import { emailRegex, getErrorMessage } from '../../../util/form';
import { mapErrorToMessage } from '../../../util/graphql';
import { useDoEmailUpdateMutation, DoEmailUpdateMutationVariables } from '../../../generated/graphql';
import { LoadingButton } from '../../../components/LoadingButton';

export const UpdateEmailButton: React.FC = () => {
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);
  const { register, handleSubmit, reset, errors } = useForm<DoEmailUpdateMutationVariables>();
  const [doEmailUpdate, { loading, error }] = useDoEmailUpdateMutation();

  const handleClose = (forceClose: boolean = false) => {
    if (!forceClose && loading) return;

    reset();
    setEmailModalOpen(false);
  };

  const onSubmit = (formData: DoEmailUpdateMutationVariables) => {
    doEmailUpdate({ variables: formData }).then(() => handleClose(true));
  };

  const errorMessage = mapErrorToMessage(error, { NONEXISTENT_EMAIL: "That email addres doesn't exist" });

  return (
    <React.Fragment>
      <Button onClick={() => setEmailModalOpen(true)} color="primary">
        Change email
      </Button>

      <Dialog open={emailModalOpen} onClose={() => handleClose()} aria-labelledby="email-update-dialog-title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="email-update-dialog-title">Change email</DialogTitle>
          <DialogContent>
            <DialogContentText>Type in your new email</DialogContentText>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="newEmail"
              label="New Email"
              autoComplete="email"
              inputRef={register({
                required: 'New email required',
                pattern: { value: emailRegex, message: 'Invalid email' },
              })}
              error={!!errors.newEmail}
              helperText={errors.newEmail ? getErrorMessage(errors.newEmail) : null}
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
              Change email
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
