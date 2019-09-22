import React from 'react';
import useForm from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { LoadingButton } from '../../../components/LoadingButton';
import { emailRegex, getErrorMessage } from '../../../util/form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<LoginFormState>();

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label={t('form.email.label')}
        name="email"
        autoComplete="email"
        autoFocus
        inputRef={register({
          required: t('form.email.required'),
          pattern: { value: emailRegex, message: t('form.email.invalid') },
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
        label={t('form.password.label')}
        type="password"
        autoComplete="current-password"
        inputRef={register({ required: t('form.password.required') })}
        error={!!errors.password}
        helperText={errors.password ? getErrorMessage(errors.password) : null}
        disabled={loading}
      />
      <FormControlLabel
        control={<Checkbox name="remember" inputRef={register} color="primary" defaultChecked disabled={loading} />}
        label={t('form.remember.label')}
      />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        loading={loading}
      >
        {t('action.login')}
      </LoadingButton>
      {errorMessage && (
        <Typography color="error" align="center" component="h3" variant="subtitle2">
          {errorMessage}
        </Typography>
      )}
    </form>
  );
};
