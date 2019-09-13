import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
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
    <div className={classes.container}>
      <Avatar className={classes.avatar}>
        <Icon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </div>
  );
};
