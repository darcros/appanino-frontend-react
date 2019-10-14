import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { LoadingButton } from '../../../components/LoadingButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

interface SignUpFormState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  schoolId: string;
}

interface SignUpFormProps {
  loading: boolean;
  errorMessage?: string;
  onSubmit: (formState: SignUpFormState) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ loading, errorMessage, onSubmit }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <form className={classes.form}>
      {/* WIP: Fake form just to test the graphql mutation */}
      <LoadingButton
        loading={loading}
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() =>
          onSubmit({
            /* eslint-disable i18next/no-literal-string */
            firstname: 'John',
            lastname: 'Doe',
            email: 'test@example.com',
            password: 'password',
            schoolId: '1',
            /* eslint-enable i18next/no-literal-string */
          })
        }
      >
        {t('action.signUp')}
      </LoadingButton>

      {errorMessage && (
        <Typography color="error" align="center" component="h3" variant="subtitle2">
          {errorMessage}
        </Typography>
      )}
    </form>
  );
};
