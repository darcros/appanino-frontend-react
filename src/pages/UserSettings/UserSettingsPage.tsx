import React from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';

import { PageContainer } from '../../components/PageContainer';
import { Center } from '../../components/Center';
import { UserSettingsPageQueryComponent } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(2),
    },
  }),
);

export const UserSettingsPage: React.FC = () => {
  const classes = useStyles();

  return (
    <PageContainer breadcrumbs>
      <Typography className={classes.title} component="h1" variant="h5">
        User settings
      </Typography>
      <UserSettingsPageQueryComponent>
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

          // TODO: add form with mutation to update settings
          // TODO: add form to change password
          return (
            <React.Fragment>
              <Typography variant="h6" component="h3">
                First name
              </Typography>
              <Typography>{data.self.firstname}</Typography>

              <Typography variant="h6" component="h3">
                Last name
              </Typography>
              <Typography>{data.self.lastname}</Typography>

              <Typography variant="h6" component="h3">
                Email
              </Typography>
              <Typography>{data.self.email}</Typography>

              <Typography variant="h6" component="h3">
                School
              </Typography>
              <Typography>{data.self.school.name}</Typography>
            </React.Fragment>
          );
        }}
      </UserSettingsPageQueryComponent>
    </PageContainer>
  );
};
