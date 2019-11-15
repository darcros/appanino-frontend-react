import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useDoLoginMutation, DoLoginMutationVariables, UserRoleDocument } from '../../generated/graphql';
import { saveToken } from '../../graphql/client/token';
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

  const login = async (variables: DoLoginMutationVariables) =>
    doLogin({
      variables,
      awaitRefetchQueries: true,
      refetchQueries: ({ data }) => {
        if (!data) return [];

        saveToken(data.login);
        return [{ query: UserRoleDocument }];
      },
    });

  return (
    <PageContainer maxWidth="xs">
      <div className={classes.container}>
        <AvatarHeader title={t('page.login.header')} icon={LockOutlinedIcon} />

        <LoginForm
          loading={loading}
          errorMessage={error && error.graphQLErrors[0].message}
          onSubmit={({ email, password }) => login({ email, password })}
        />

        <Typography>
          {t('page.login.signUp-link.0')}{' '}
          <Link component={RouterLink} to={'/sign-up'}>
            {t('page.login.signUp-link.1')}
          </Link>
        </Typography>
      </div>
    </PageContainer>
  );
};
