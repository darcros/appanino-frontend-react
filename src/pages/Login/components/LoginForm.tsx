import React from 'react';
import useForm from 'react-hook-form';
import { TextField, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';

import { LoadingButton } from '../../../components/LoadingButton';
import { getErrorMessage } from '../../../util/form';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface LoginFormState {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  loading: boolean;
  onSubmit: (formState: LoginFormState) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ loading, onSubmit }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<LoginFormState>();

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        inputRef={register({
          required: 'Email required',
          pattern: { value: emailRegex, message: 'Invalid email' },
        })}
        error={!!errors.email}
        helperText={errors.email ? getErrorMessage(errors.email) : null}
        disabled={loading}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        inputRef={register({ required: 'Password required' })}
        error={!!errors.password}
        helperText={errors.password ? getErrorMessage(errors.password) : null}
        disabled={loading}
      />
      <FormControlLabel
        control={<Checkbox name="remember" inputRef={register} color="primary" defaultChecked disabled={loading} />}
        label="Remember me"
      />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        loading={loading}
      >
        Sign In
      </LoadingButton>
    </form>
  );
};
