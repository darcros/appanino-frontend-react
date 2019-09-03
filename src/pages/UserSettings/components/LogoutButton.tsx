import React from 'react';

import { useDoLogoutMutation } from '../../../generated/graphql';
import { LoadingButton } from '../../../components/LoadingButton';

export const LogoutButton: React.FC = () => {
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
      Logout
    </LoadingButton>
  );
};
