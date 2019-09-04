import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

interface AvaterHeaderProps {
  title: string;
  icon: React.ComponentType<SvgIconProps>;
}

export const AvatarHeader: React.FC<AvaterHeaderProps> = ({ title, icon: Icon }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Avatar className={classes.avatar}>
        <Icon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </React.Fragment>
  );
};
