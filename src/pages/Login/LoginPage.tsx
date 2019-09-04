import React from 'react';
import { Redirect } from 'react-router';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDoLoginMutation, DoLoginMutationVariables, useDoSaveTokenMutation } from '../../generated/graphql';
import { PageContainer } from '../../components/PageContainer';
import { AvatarHeader } from '../../components/AvatarHeader';
import { LoginForm } from './components/LoginForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
        <AvatarHeader title="Login to Appanino" icon={LockOutlinedIcon} />

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
