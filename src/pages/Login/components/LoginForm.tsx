import React from 'react';
import useForm from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { LoadingButton } from '../../../components/LoadingButton';
import { emailRegex, getErrorMessage } from '../../../util/form';

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
  remember: boolean;
}

interface LoginFormProps {
  loading: boolean;
  errorMessage?: string;
  onSubmit: (formState: LoginFormState) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ loading, errorMessage, onSubmit }) => {
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
      {errorMessage && (
        <Typography color="error" align="center" component="h3" variant="subtitle2">
          {errorMessage}
        </Typography>
      )}
    </form>
  );
};
