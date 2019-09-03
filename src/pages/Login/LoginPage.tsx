import React from 'react';
import { Redirect } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useDoLoginMutation, DoLoginMutationVariables, useDoSaveTokenMutation } from '../../generated/graphql';
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
  const [doLogin, { loading, error }] = useDoLoginMutation();
  const [doSaveToken, { data, called }] = useDoSaveTokenMutation();

  async function loginAndSaveToken(variables: DoLoginMutationVariables) {
    const { data } = await doLogin({ variables });
    if (!data) return;

    return doSaveToken({
      variables: { token: data.login },
    });
  }

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
            loginAndSaveToken({ email, password });
          }}
        />

        {/* Redirect to home page after login */}
        {called && data && <Redirect to="/" />}
      </div>
    </PageContainer>
  );
};
