import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { AvatarHeader } from '../../components/AvatarHeader';
import { Center } from '../../components/Center';
import { PageContainer } from '../../components/PageContainer';
import { UserSettingsComponent } from '../../generated/graphql';
import { LogoutButton } from './components/LogoutButton';
import { UpdatePasswordButton } from './components/UpdatePasswordButton';
import { UserSettingsForm } from './components/UserSettingsForm';
import { UpdateEmailButton } from './components/UpdateEmailButton';
import { LanguageSelect } from './components/LanguageSelect';

export const UserSettingsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <AvatarHeader title={t('page.user-settings.header')} icon={AccountCircleIcon} />
      <UserSettingsComponent>
        {({ data, error, loading, refetch }) => {
          if (error) {
            return (
              <Center>
                <Typography variant="h6" color="error">
                  {t('error.user-settings')}
                </Typography>
                <Button onClick={() => refetch()} color="primary">
                  {t('action.retry')}
                </Button>
              </Center>
            );
          }

          if (loading || !data) {
            return (
              <Center>
                <CircularProgress />
              </Center>
            );
          }

          return (
            <UserSettingsForm
              initialValues={{
                firstname: data.self!.firstname,
                lastname: data.self!.lastname,
                schoolId: data.self!.school.id,
              }}
              schools={data.schools}
            />
          );
        }}
      </UserSettingsComponent>
      <UpdateEmailButton />
      <UpdatePasswordButton />
      <br />
      <LanguageSelect />
      <LogoutButton />
    </PageContainer>
  );
};
