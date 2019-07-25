import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { makeStyles, Avatar, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { PageContainer } from '../../components/PageContainer';

import { LoginForm } from './components/LoginForm';
import { Redirect } from 'react-router';

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

const DO_LOGIN = gql`
  mutation doLogin($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

interface Data {
  login: string;
}

interface Variables {
  email: string;
  password: string;
}

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
        <Mutation<Data, Variables> mutation={DO_LOGIN}>
          {(login, { data, called, loading, error }) => {
            console.log(data);

            // Redirect to home page after login
            if (called && data) {
              return <Redirect to="/" />;
            }

            return (
              <LoginForm
                loading={loading}
                errorMessage={error && 'Login Failed'}
                onSubmit={({ email, password }) => {
                  login({ variables: { email, password } });
                }}
              />
            );
          }}
        </Mutation>
      </div>
    </PageContainer>
  );
};
