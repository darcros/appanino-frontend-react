import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {
  UserSettingsQuery,
  useDoUserInfoUpdateMutation,
  DoUserInfoUpdateMutationVariables,
} from '../../../generated/graphql';
import { getErrorMessage } from '../../../util/form';
import { LoadingButton } from '../../../components/LoadingButton';
import { OutlinedSelect } from '../../../components/OutlinedSelect';

interface UserSettingsFormProps {
  userQuery: UserSettingsQuery;
}

export const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ userQuery }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm<DoUserInfoUpdateMutationVariables>();
  const [doUserInfoUpdate, { loading, hasError }] = useDoUserInfoUpdateMutation();

  const onSubmit = (formData: DoUserInfoUpdateMutationVariables) => {
    doUserInfoUpdate({
      variables: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstname"
            variant="outlined"
            fullWidth
            id="firstname-textField"
            label={t('form.first-name.label')}
            defaultValue={userQuery.self.firstname}
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
            defaultValue={userQuery.self.lastname}
            helperText={errors.lastname ? getErrorMessage(errors.lastname) : null}
            inputRef={register({
              required: t('form.first-name.required'),
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <OutlinedSelect
            defaultValue={userQuery.self.school.id}
            inputRef={register}
            label={t('form.school.label')}
            inputName="schoolId"
          >
            {userQuery.schools.map(school => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </OutlinedSelect>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton type="submit" fullWidth variant="contained" color="primary" loading={loading}>
            {t('action.save')}
          </LoadingButton>
          {hasError && (
            <Typography color="error" align="center" component="h3" variant="subtitle2">
              {t('error.generic')}
            </Typography>
          )}
        </Grid>
      </Grid>
    </form>
  );
};
