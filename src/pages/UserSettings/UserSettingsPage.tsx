import React from 'react';

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

export const UserSettingsPage: React.FC = () => {
  return (
    <PageContainer breadcrumbs>
      <AvatarHeader title="User Settings" icon={AccountCircleIcon} />
      <UserSettingsComponent>
        {({ data, error, loading, refetch }) => {
          if (error) {
            return (
              <Center>
                <Typography variant="h6" color="error">
                  Cannot load user settings. Please retry later.
                </Typography>
                <Button onClick={() => refetch()} color="primary">
                  Retry
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

          return <UserSettingsForm userQuery={data} />;
        }}
      </UserSettingsComponent>
      <UpdatePasswordButton />
      <LogoutButton />
    </PageContainer>
  );
};
