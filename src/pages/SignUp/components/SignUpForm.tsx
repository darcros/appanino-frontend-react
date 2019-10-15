import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from 'react-hook-form';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useSchoolsQuery } from '../../../generated/graphql';
import { errorToMessage } from '../../../util/graphql';
import { getErrorMessage } from '../../../util/form';
import { LoadingButton } from '../../../components/LoadingButton';
import { OutlinedSelect } from '../../../components/OutlinedSelect';

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

export const SignUpForm: React.FC<SignUpFormProps> = ({ loading, errorMessage: externalErrorMessage, onSubmit }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<SignUpFormState>();
  const { data, loading: schoolsLoading, error: schoolsError } = useSchoolsQuery();
  const errorMessage = externalErrorMessage || errorToMessage(schoolsError);

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstname"
            variant="outlined"
            fullWidth
            id="firstname-textField"
            label={t('form.first-name.label')}
            helperText={errors.firstname ? getErrorMessage(errors.firstname) : null}
            inputRef={register({
              required: t('form.first-name.required'),
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="lname"
            name="lastname"
            variant="outlined"
            fullWidth
            id="lastname-textField"
            label={t('form.last-name.label')}
            helperText={errors.lastname ? getErrorMessage(errors.lastname) : null}
            inputRef={register({
              required: t('form.last-name.required'),
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="email"
            name="email"
            variant="outlined"
            fullWidth
            id="email-textField"
            label={t('form.email.label')}
            helperText={errors.email ? getErrorMessage(errors.email) : null}
            inputRef={register({
              required: t('form.email.required'),
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="new-password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            id="password-textField"
            label={t('form.password.label')}
            helperText={errors.password ? getErrorMessage(errors.password) : null}
            inputRef={register({
              required: t('form.password.required'),
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <OutlinedSelect
            inputName="schoolId"
            id="schoolId-select"
            label={t('form.school.label')}
            inputRef={register}
            defaultValue={data ? '' : 'LOADING'}
            disabled={!data}
          >
            {data ? (
              data.schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))
            ) : (
              <option value="LOADING">{t('form.school.loading')}</option>
            )}
          </OutlinedSelect>
        </Grid>
      </Grid>

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        loading={loading}
        disabled={schoolsLoading}
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
