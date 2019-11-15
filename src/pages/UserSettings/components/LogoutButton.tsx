import React from 'react';
import { useTranslation } from 'react-i18next';

import { client } from '../../../graphql/client';
import { removeToken } from '../../../graphql/client/token';

import { LoadingButton } from '../../../components/LoadingButton';

export const LogoutButton: React.FC = () => {
  const { t } = useTranslation();
  const logout = async () => {
    removeToken();
    await client.resetStore();
  };

  return (
    <LoadingButton
      variant="outlined"
      color="secondary"
      loading={false} // TODO: use state
      onClick={() => {
        logout();
      }}
    >
      {t('action.logout')}
    </LoadingButton>
  );
};
