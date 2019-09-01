import React from 'react';
import Typography from '@material-ui/core/Typography';

interface UserInfoProps {
  userData: {
    firstname: string;
    lastname: string;
    email: string;
    school: {
      name: string;
    };
  };
}

export const UserInfo: React.FC<UserInfoProps> = ({ userData: { firstname, lastname, email, school } }) => (
  <React.Fragment>
    <Typography variant="h6" component="h3">
      First name
    </Typography>
    <Typography>{firstname}</Typography>

    <Typography variant="h6" component="h3">
      Last name
    </Typography>
    <Typography>{lastname}</Typography>

    <Typography variant="h6" component="h3">
      Email
    </Typography>
    <Typography>{email}</Typography>

    <Typography variant="h6" component="h3">
      School
    </Typography>
    <Typography>{school.name}</Typography>
  </React.Fragment>
);
