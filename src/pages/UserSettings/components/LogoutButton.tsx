import React from 'react';

import { useDoLogoutMutation } from '../../../generated/graphql';
import { LoadingButton } from '../../../components/LoadingButton';
import { useTranslation } from 'react-i18next';

export const LogoutButton: React.FC = () => {
  const { t } = useTranslation();
  const [doLogout, { loading }] = useDoLogoutMutation();

  return (
    <LoadingButton
      variant="outlined"
      color="secondary"
      loading={loading}
      onClick={() => {
        doLogout();
      }}
    >
      {t('action.logout')}
    </LoadingButton>
  );
};
