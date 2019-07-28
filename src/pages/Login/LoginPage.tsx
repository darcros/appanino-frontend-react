import React from 'react';
import { Redirect } from 'react-router';
import { makeStyles, Avatar, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { DoLoginComponent } from '../../generated/graphql';
import { PageContainer } from '../../components/PageContainer';
import { LoginForm } from './components/LoginForm';

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
}));

export const LoginPage: React.FC = () => {
  const classes = useStyles();

  return (
    <PageContainer maxWidth="xs">
      <div className={classes.container}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to Appanino
        </Typography>
        <DoLoginComponent
          update={(cache, { data, errors }) => {
            if (data && !errors) {
              // Save token
              localStorage.setItem('token', data.login);
              cache.writeData({
                data: { isLoggedIn: true },
              });

              return;
            }

            console.log(errors);
            cache.writeData({
              data: { isLoggedIn: false },
            });
          }}
        >
          {(login, { data, called, loading, error }) => {
            console.log(data);

            // Redirect to home page after login
            if (called && data) {
              return <Redirect to="/" />;
            }

            return (
              <LoginForm
                loading={loading}
                errorMessage={error && error.graphQLErrors[0].message}
                onSubmit={({ email, password }) => {
                  login({ variables: { email, password } });
                }}
              />
            );
          }}
        </DoLoginComponent>
      </div>
    </PageContainer>
  );
};
