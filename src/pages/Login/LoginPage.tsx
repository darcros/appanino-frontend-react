import React from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {
  useDoLoginMutation,
  DoLoginMutationVariables,
  useDoSaveTokenMutation,
  UserRoleDocument,
} from '../../generated/graphql';
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
  const { t } = useTranslation();
  const classes = useStyles();
  const [doLogin, { loading, error }] = useDoLoginMutation();
  const [doSaveToken, { data, called }] = useDoSaveTokenMutation();

  async function loginAndSaveToken(variables: DoLoginMutationVariables) {
    const { data } = await doLogin({ variables });
    if (!data) return;

    return doSaveToken({
      variables: { token: data.login },
      refetchQueries: [{ query: UserRoleDocument }],
    });
  }

  return (
    <PageContainer maxWidth="xs">
      <div className={classes.container}>
        <AvatarHeader title={t('page.login.header')} icon={LockOutlinedIcon} />

        <LoginForm
          loading={loading}
          errorMessage={error && error.graphQLErrors[0].message}
          onSubmit={({ email, password }) => {
            loginAndSaveToken({ email, password });
          }}
        />

        <Typography>
          {t('page.login.signUp-link.0')}{' '}
          <Link component={RouterLink} to={'/sign-up'}>
            {t('page.login.signUp-link.1')}
          </Link>
        </Typography>

        {/* Redirect to home page after login */}
        {called && data && <Redirect to="/shop" />}
      </div>
    </PageContainer>
  );
};
