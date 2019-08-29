import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface BreadcrumbsItemProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  href?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  }),
);

export const BreadcrumbsItem: React.FC<BreadcrumbsItemProps> = ({ href, icon: Icon, title }) => {
  const classes = useStyles();

  return href ? (
    <Link component={RouterLink} to={href} color="inherit" className={classes.link}>
      <Icon className={classes.icon} />
      {title}
    </Link>
  ) : (
    <Typography color="textPrimary" className={classes.link}>
      <Icon className={classes.icon} />
      {title}
    </Typography>
  );
};
