import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
  useRegisterAndLoginMutation,
  RegisterAndLoginMutationVariables,
  useDoSaveTokenMutation,
  UserRoleDocument,
} from '../../generated/graphql';
import { PageContainer } from '../../components/PageContainer';
import { AvatarHeader } from '../../components/AvatarHeader';
import { SignUpForm } from './components/SignUpForm';
import { errorToMessage } from '../../util/graphql';

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

export const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [doRegistration, { error: registrationError, loading: registrationLoading }] = useRegisterAndLoginMutation();
  const [doSaveToken, { loading: saveTokenLoading }] = useDoSaveTokenMutation();
  const loading = registrationLoading || saveTokenLoading;

  const doRegistrationAndSaveToken = async (variables: RegisterAndLoginMutationVariables) => {
    const { data } = await doRegistration({ variables });
    if (!data) return;

    const { token } = data;
    await doSaveToken({
      variables: { token },
      refetchQueries: [{ query: UserRoleDocument }],
    });
  };

  return (
    <PageContainer maxWidth="xs">
      <div className={classes.container}>
        <AvatarHeader title={t('page.signUp.header')} icon={AccountCircleIcon} />

        <SignUpForm
          loading={loading}
          errorMessage={errorToMessage(registrationError)}
          onSubmit={doRegistrationAndSaveToken}
        />

        <Typography>
          {t('page.signUp.login-link.0')}{' '}
          <Link component={RouterLink} to={'/login'}>
            {t('page.signUp.login-link.1')}
          </Link>
        </Typography>
      </div>
    </PageContainer>
  );
};
