import React from 'react';
import useForm from 'react-hook-form';
import { TextField, FormControlLabel, Button, Checkbox, makeStyles, Avatar, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { PageContainer } from '../../components/PageContainer';
import { getErrorMessage } from '../../util/form';

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

export const LoginPage: React.FC = () => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm<LoginFormState>();
  const onSubmit = (data: LoginFormState) => {
    console.log(data);
  };

  return (
    <PageContainer maxWidth="xs">
      <div className={classes.container}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to Appanino
        </Typography>
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
              required: 'email required',
              pattern: { value: emailRegex, message: 'Invalid email' },
            })}
            error={!!errors.email}
            helperText={errors.email ? getErrorMessage(errors.email) : null}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            inputRef={register({ required: 'password required' })}
            error={!!errors.password}
            helperText={errors.password ? getErrorMessage(errors.password) : null}
          />
          <FormControlLabel
            control={<Checkbox name="remember" inputRef={register} color="primary" defaultChecked />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
        </form>
      </div>
    </PageContainer>
  );
};
