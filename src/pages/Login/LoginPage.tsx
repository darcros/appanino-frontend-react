import React from 'react';
import { Redirect } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useDoLoginMutation } from '../../generated/graphql';
import { PageContainer } from '../../components/PageContainer';
import { LoginForm } from './components/LoginForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

export const LoginPage: React.FC = () => {
  const classes = useStyles();
  const [doLogin, { data, called, loading, error }] = useDoLoginMutation({
    update: (cache, { data, errors }) => {
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
    },
  });

  return (
    <PageContainer maxWidth="xs">
      <div className={classes.container}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to Appanino
        </Typography>

        <LoginForm
          loading={loading}
          errorMessage={error && error.graphQLErrors[0].message}
          onSubmit={({ email, password }) => {
            doLogin({ variables: { email, password } });
          }}
        />

        {/* Redirect to home page after login */}
        {called && data && <Redirect to="/" />}
      </div>
    </PageContainer>
  );
};
